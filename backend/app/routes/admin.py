from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import User, AccessRequest, RequestStatus
from app.auth import get_current_user

router = APIRouter()

@router.get("/stats")
def get_admin_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    # Count total users
    total_users = db.query(func.count(User.id)).scalar()
    
    # Count restaurants
    restaurants = db.query(func.count(User.id)).filter(User.role == "restaurant").scalar()
    
    # Count riders
    riders = db.query(func.count(User.id)).filter(User.role == "rider").scalar()
    
    # Count pending requests
    pending_requests = db.query(func.count(AccessRequest.id)).filter(
        AccessRequest.status == RequestStatus.pending
    ).scalar()
    
    # Count approved requests
    approved_requests = db.query(func.count(AccessRequest.id)).filter(
        AccessRequest.status == RequestStatus.approved
    ).scalar()
    
    # Count rejected requests
    rejected_requests = db.query(func.count(AccessRequest.id)).filter(
        AccessRequest.status == RequestStatus.rejected
    ).scalar()
    
    # Get approved/rejected breakdown by type
    restaurant_approved = db.query(func.count(AccessRequest.id)).filter(
        AccessRequest.request_type == "restaurant",
        AccessRequest.status == RequestStatus.approved
    ).scalar()
    
    restaurant_rejected = db.query(func.count(AccessRequest.id)).filter(
        AccessRequest.request_type == "restaurant",
        AccessRequest.status == RequestStatus.rejected
    ).scalar()
    
    rider_approved = db.query(func.count(AccessRequest.id)).filter(
        AccessRequest.request_type == "rider",
        AccessRequest.status == RequestStatus.approved
    ).scalar()
    
    rider_rejected = db.query(func.count(AccessRequest.id)).filter(
        AccessRequest.request_type == "rider",
        AccessRequest.status == RequestStatus.rejected
    ).scalar()
    
    return {
        "totalUsers": total_users,
        "restaurants": restaurants,
        "riders": riders,
        "pendingRequests": pending_requests,
        "approvedRequests": approved_requests,
        "rejectedRequests": rejected_requests,
        "requestBreakdown": {
            "restaurant": {
                "approved": restaurant_approved,
                "rejected": restaurant_rejected
            },
            "rider": {
                "approved": rider_approved,
                "rejected": rider_rejected
            }
        }
    }

@router.get("/requests/all")
def get_all_requests_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    # Get all requests (approved and rejected)
    requests = db.query(AccessRequest).filter(
        AccessRequest.status.in_([RequestStatus.approved, RequestStatus.rejected])
    ).order_by(AccessRequest.updated_at.desc()).all()
    
    return requests
