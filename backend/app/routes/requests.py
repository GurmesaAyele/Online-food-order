from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import AccessRequest, User, RequestStatus
from app.schemas import RestaurantRequest, RiderRequest, AccessRequestResponse
from app.auth import get_password_hash, get_current_user
from app.email_service import send_approval_email, send_rejection_email
from typing import List
import random
import string

router = APIRouter()

@router.post("/restaurant", response_model=AccessRequestResponse)
def submit_restaurant_request(request: RestaurantRequest, db: Session = Depends(get_db)):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if request already exists
    existing_request = db.query(AccessRequest).filter(
        AccessRequest.email == request.email,
        AccessRequest.request_type == "restaurant"
    ).first()
    if existing_request:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request already submitted"
        )
    
    db_request = AccessRequest(
        request_type="restaurant",
        full_name=request.full_name,
        email=request.email,
        phone=request.phone,
        restaurant_name=request.restaurant_name,
        restaurant_address=request.restaurant_address,
        business_license=request.business_license,
        additional_info=request.additional_info
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

@router.post("/rider", response_model=AccessRequestResponse)
def submit_rider_request(request: RiderRequest, db: Session = Depends(get_db)):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if request already exists
    existing_request = db.query(AccessRequest).filter(
        AccessRequest.email == request.email,
        AccessRequest.request_type == "rider"
    ).first()
    if existing_request:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request already submitted"
        )
    
    db_request = AccessRequest(
        request_type="rider",
        full_name=request.full_name,
        email=request.email,
        phone=request.phone,
        vehicle_type=request.vehicle_type,
        license_number=request.license_number,
        address=request.address,
        additional_info=request.additional_info
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

@router.get("/", response_model=List[AccessRequestResponse])
def get_all_requests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    requests = db.query(AccessRequest).filter(
        AccessRequest.status == RequestStatus.pending
    ).all()
    return requests

@router.post("/{request_id}/approve")
def approve_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    access_request = db.query(AccessRequest).filter(AccessRequest.id == request_id).first()
    if not access_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Request not found"
        )
    
    # Generate random password (10 characters: letters + digits)
    random_password = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
    
    # Create user account
    role = "restaurant" if access_request.request_type == "restaurant" else "rider"
    hashed_password = get_password_hash(random_password)
    
    new_user = User(
        email=access_request.email,
        password=hashed_password,
        full_name=access_request.full_name,
        phone=access_request.phone,
        role=role
    )
    db.add(new_user)
    
    # Update request status
    access_request.status = RequestStatus.approved
    
    db.commit()
    
    # Send email with credentials
    print(f"\n🔔 Sending approval email to: {access_request.email}")
    email_sent = send_approval_email(
        recipient_email=access_request.email,
        full_name=access_request.full_name,
        temp_password=random_password,
        role=role
    )
    
    if email_sent:
        print(f"✅ Email successfully sent to {access_request.email}")
    else:
        print(f"❌ Email failed to send to {access_request.email}")
    
    return {
        "message": "Request approved! Account created and credentials sent to email",
        "email": new_user.email,
        "temp_password": random_password  # For testing only, remove in production
    }



@router.post("/{request_id}/reject")
def reject_request(
    request_id: int,
    reason: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    access_request = db.query(AccessRequest).filter(AccessRequest.id == request_id).first()
    if not access_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Request not found"
        )
    
    # Update status and reason
    access_request.status = RequestStatus.rejected
    access_request.rejection_reason = reason
    db.commit()
    
    # Send rejection email with reason
    send_rejection_email(
        recipient_email=access_request.email,
        full_name=access_request.full_name,
        role=access_request.request_type,
        reason=reason
    )
    
    return {"message": "Request rejected and notification sent"}
