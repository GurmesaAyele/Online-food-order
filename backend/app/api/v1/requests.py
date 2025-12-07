from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_password_hash
from app.models.request import AccessRequest, RequestStatus, RequestType
from app.models.user import User, UserRole
from app.schemas.request import (
    RestaurantRequestCreate, 
    RiderRequestCreate, 
    AccessRequestResponse,
    ApproveRequestData
)
from app.api.dependencies import get_current_user

router = APIRouter()

@router.post("/restaurant", response_model=AccessRequestResponse)
def submit_restaurant_request(
    request_data: RestaurantRequestCreate,
    db: Session = Depends(get_db)
):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == request_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check for pending request
    existing_request = db.query(AccessRequest).filter(
        AccessRequest.email == request_data.email,
        AccessRequest.status == RequestStatus.PENDING
    ).first()
    if existing_request:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have a pending request"
        )
    
    # Create request
    access_request = AccessRequest(
        request_type=RequestType.RESTAURANT,
        full_name=request_data.full_name,
        email=request_data.email,
        phone=request_data.phone,
        restaurant_name=request_data.restaurant_name,
        business_license=request_data.business_license,
        restaurant_address=request_data.restaurant_address,
        cuisine_type=request_data.cuisine_type
    )
    
    db.add(access_request)
    db.commit()
    db.refresh(access_request)
    
    return access_request

@router.post("/rider", response_model=AccessRequestResponse)
def submit_rider_request(
    request_data: RiderRequestCreate,
    db: Session = Depends(get_db)
):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == request_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check for pending request
    existing_request = db.query(AccessRequest).filter(
        AccessRequest.email == request_data.email,
        AccessRequest.status == RequestStatus.PENDING
    ).first()
    if existing_request:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have a pending request"
        )
    
    # Create request
    access_request = AccessRequest(
        request_type=RequestType.RIDER,
        full_name=request_data.full_name,
        email=request_data.email,
        phone=request_data.phone,
        vehicle_type=request_data.vehicle_type,
        license_number=request_data.license_number,
        government_id=request_data.government_id
    )
    
    db.add(access_request)
    db.commit()
    db.refresh(access_request)
    
    return access_request

@router.get("/pending", response_model=List[AccessRequestResponse])
def get_pending_requests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can view requests"
        )
    
    requests = db.query(AccessRequest).filter(
        AccessRequest.status == RequestStatus.PENDING
    ).order_by(AccessRequest.created_at.desc()).all()
    
    return requests

@router.post("/{request_id}/approve")
def approve_request(
    request_id: int,
    approval_data: ApproveRequestData,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can approve requests"
        )
    
    access_request = db.query(AccessRequest).filter(
        AccessRequest.id == request_id
    ).first()
    
    if not access_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Request not found"
        )
    
    if access_request.status != RequestStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request already processed"
        )
    
    # Determine role based on request type
    role = UserRole.RESTAURANT if access_request.request_type == RequestType.RESTAURANT else UserRole.RIDER
    
    # Create user account
    new_user = User(
        email=access_request.email,
        hashed_password=get_password_hash(approval_data.password),
        full_name=access_request.full_name,
        phone=access_request.phone,
        role=role,
        is_active=True,
        is_verified=True
    )
    
    db.add(new_user)
    
    # Update request status
    access_request.status = RequestStatus.APPROVED
    access_request.admin_notes = approval_data.admin_notes
    access_request.reviewed_by = current_user.id
    
    db.commit()
    
    return {"message": "Request approved and account created", "user_id": new_user.id}

@router.post("/{request_id}/reject")
def reject_request(
    request_id: int,
    admin_notes: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can reject requests"
        )
    
    access_request = db.query(AccessRequest).filter(
        AccessRequest.id == request_id
    ).first()
    
    if not access_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Request not found"
        )
    
    if access_request.status != RequestStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Request already processed"
        )
    
    access_request.status = RequestStatus.REJECTED
    access_request.admin_notes = admin_notes
    access_request.reviewed_by = current_user.id
    
    db.commit()
    
    return {"message": "Request rejected"}
