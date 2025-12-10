from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import User, AccessRequest, RequestStatus, Restaurant, Rider, RestaurantStatus, RiderStatus
from app.auth import get_current_user
from typing import Optional
from pydantic import BaseModel

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


# Pydantic models for request bodies
class UpdateRestaurantStatus(BaseModel):
    status: str
    rejection_reason: Optional[str] = None

class UpdateRiderStatus(BaseModel):
    status: str
    rejection_reason: Optional[str] = None

# Restaurant management endpoints
@router.get("/restaurants")
def get_all_restaurants(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    restaurants = db.query(Restaurant).join(User, Restaurant.user_id == User.id).all()
    
    result = []
    for restaurant in restaurants:
        user = db.query(User).filter(User.id == restaurant.user_id).first()
        result.append({
            "id": restaurant.id,
            "user_id": restaurant.user_id,
            "name": restaurant.name,
            "email": user.email if user else None,
            "phone": restaurant.phone,
            "address": restaurant.address,
            "business_license": restaurant.business_license,
            "cuisine_type": restaurant.cuisine_type,
            "rating": restaurant.rating,
            "status": restaurant.status,
            "rejection_reason": restaurant.rejection_reason,
            "created_at": restaurant.created_at,
            "updated_at": restaurant.updated_at
        })
    
    return result

@router.put("/restaurants/{restaurant_id}/status")
def update_restaurant_status(
    restaurant_id: int,
    data: UpdateRestaurantStatus,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    # Validate status
    if data.status not in ["open", "closed", "rejected"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status. Must be 'open', 'closed', or 'rejected'"
        )
    
    restaurant.status = data.status
    if data.status == "rejected" and data.rejection_reason:
        restaurant.rejection_reason = data.rejection_reason
    
    db.commit()
    db.refresh(restaurant)
    
    return {"message": f"Restaurant status updated to {data.status}", "restaurant": restaurant}

@router.delete("/restaurants/{restaurant_id}")
def delete_restaurant(
    restaurant_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    # Also delete the associated user account
    user = db.query(User).filter(User.id == restaurant.user_id).first()
    
    db.delete(restaurant)
    if user:
        db.delete(user)
    
    db.commit()
    
    return {"message": "Restaurant and associated account deleted successfully"}

# Rider management endpoints
@router.get("/riders")
def get_all_riders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    riders = db.query(Rider).join(User, Rider.user_id == User.id).all()
    
    result = []
    for rider in riders:
        user = db.query(User).filter(User.id == rider.user_id).first()
        result.append({
            "id": rider.id,
            "user_id": rider.user_id,
            "full_name": rider.full_name,
            "email": user.email if user else None,
            "phone": rider.phone,
            "vehicle_type": rider.vehicle_type,
            "license_number": rider.license_number,
            "address": rider.address,
            "rating": rider.rating,
            "status": rider.status,
            "rejection_reason": rider.rejection_reason,
            "created_at": rider.created_at,
            "updated_at": rider.updated_at
        })
    
    return result

@router.put("/riders/{rider_id}/status")
def update_rider_status(
    rider_id: int,
    data: UpdateRiderStatus,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    rider = db.query(Rider).filter(Rider.id == rider_id).first()
    if not rider:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rider not found"
        )
    
    # Validate status
    if data.status not in ["available", "unavailable", "rejected"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status. Must be 'available', 'unavailable', or 'rejected'"
        )
    
    rider.status = data.status
    if data.status == "rejected" and data.rejection_reason:
        rider.rejection_reason = data.rejection_reason
    
    db.commit()
    db.refresh(rider)
    
    return {"message": f"Rider status updated to {data.status}", "rider": rider}

@router.delete("/riders/{rider_id}")
def delete_rider(
    rider_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    rider = db.query(Rider).filter(Rider.id == rider_id).first()
    if not rider:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rider not found"
        )
    
    # Also delete the associated user account
    user = db.query(User).filter(User.id == rider.user_id).first()
    
    db.delete(rider)
    if user:
        db.delete(user)
    
    db.commit()
    
    return {"message": "Rider and associated account deleted successfully"}
