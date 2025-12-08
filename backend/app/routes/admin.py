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
    
    return {
        "totalUsers": total_users,
        "restaurants": restaurants,
        "riders": riders,
        "pendingRequests": pending_requests
    }
