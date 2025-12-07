from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.dependencies import get_current_user, require_role
from app.models.user import User, UserRole
from app.models.rider import Rider, RiderStatus
from app.models.order import Order, OrderStatus

router = APIRouter()

@router.get("/available-orders", response_model=List)
def get_available_orders(
    current_user: User = Depends(require_role(UserRole.RIDER)),
    db: Session = Depends(get_db)
):
    orders = db.query(Order).filter(
        Order.status == OrderStatus.READY,
        Order.rider_id == None
    ).all()
    return orders

@router.post("/accept-order/{order_id}")
def accept_order(
    order_id: int,
    current_user: User = Depends(require_role(UserRole.RIDER)),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.rider_id:
        raise HTTPException(status_code=400, detail="Order already assigned")
    
    order.rider_id = current_user.id
    order.status = OrderStatus.PICKED_UP
    db.commit()
    
    return {"message": "Order accepted successfully"}

@router.post("/update-location")
def update_location(
    latitude: float,
    longitude: float,
    current_user: User = Depends(require_role(UserRole.RIDER)),
    db: Session = Depends(get_db)
):
    rider = db.query(Rider).filter(Rider.user_id == current_user.id).first()
    if rider:
        rider.current_latitude = latitude
        rider.current_longitude = longitude
        db.commit()
    
    return {"message": "Location updated"}
