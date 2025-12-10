from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Order, OrderItem, MenuItem, Restaurant, User
from app.auth import get_current_user
from pydantic import BaseModel

router = APIRouter()

class UpdateStatus(BaseModel):
    status: str

@router.get("/orders")
def get_rider_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "rider":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    # Get orders assigned to this rider
    orders = db.query(Order).filter(Order.rider_id == current_user.id).all()
    
    result = []
    for order in orders:
        restaurant = db.query(Restaurant).filter(Restaurant.user_id == order.restaurant_id).first()
        customer = db.query(User).filter(User.id == order.customer_id).first()
        order_items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        
        items_list = []
        for item in order_items:
            menu_item = db.query(MenuItem).filter(MenuItem.id == item.menu_item_id).first()
            if menu_item:
                items_list.append({
                    "name": menu_item.name,
                    "quantity": item.quantity,
                    "price": float(item.price)
                })
        
        result.append({
            "id": order.id,
            "restaurant_name": restaurant.name if restaurant else "Unknown",
            "restaurant_address": restaurant.address if restaurant else None,
            "restaurant_phone": restaurant.phone if restaurant else None,
            "delivery_address": order.delivery_address,
            "delivery_latitude": float(order.delivery_latitude) if order.delivery_latitude else None,
            "delivery_longitude": float(order.delivery_longitude) if order.delivery_longitude else None,
            "customer_phone": order.customer_phone,
            "customer_notes": order.customer_notes,
            "items": items_list,
            "total_amount": float(order.total_amount),
            "status": order.status,
            "created_at": order.created_at.isoformat() if order.created_at else None
        })
    
    return result

@router.put("/orders/{order_id}/status")
def update_delivery_status(
    order_id: int,
    status_update: UpdateStatus,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "rider":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    order = db.query(Order).filter(
        Order.id == order_id,
        Order.rider_id == current_user.id
    ).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Validate status transition
    valid_statuses = ["out_for_delivery", "delivered"]
    if status_update.status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status"
        )
    
    order.status = status_update.status
    db.commit()
    
    return {"message": "Status updated successfully"}

@router.get("/stats")
def get_rider_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "rider":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    # Get real stats from orders
    all_orders = db.query(Order).filter(Order.rider_id == current_user.id).all()
    completed = [o for o in all_orders if o.status == "delivered"]
    active = [o for o in all_orders if o.status in ["ready", "out_for_delivery"]]
    
    total_earnings = sum(float(o.total_amount) * 0.1 for o in completed)  # 10% commission
    
    return {
        "totalEarnings": round(total_earnings, 2),
        "completedDeliveries": len(completed),
        "activeDeliveries": len(active)
    }
