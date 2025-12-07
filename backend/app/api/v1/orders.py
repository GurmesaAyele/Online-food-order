from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.models.order import Order, OrderStatus
from app.models.restaurant import Restaurant
from app.schemas.order import OrderCreate, OrderResponse, OrderStatusUpdate

router = APIRouter()

@router.post("/", response_model=OrderResponse)
def create_order(
    order_data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    restaurant = db.query(Restaurant).filter(Restaurant.id == order_data.restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    # Calculate totals
    subtotal = sum(item.price * item.quantity for item in order_data.items)
    delivery_fee = restaurant.delivery_fee
    discount = 0.0
    
    # Apply promo code if provided
    if order_data.promo_code:
        # Promo code logic here
        pass
    
    total = subtotal + delivery_fee - discount
    
    # Create order
    order = Order(
        customer_id=current_user.id,
        restaurant_id=order_data.restaurant_id,
        items=[item.dict() for item in order_data.items],
        subtotal=subtotal,
        delivery_fee=delivery_fee,
        discount=discount,
        total=total,
        payment_method=order_data.payment_method,
        delivery_address=order_data.delivery_address,
        delivery_latitude=order_data.delivery_latitude,
        delivery_longitude=order_data.delivery_longitude,
        delivery_instructions=order_data.delivery_instructions,
        estimated_delivery_time=datetime.utcnow() + timedelta(minutes=restaurant.delivery_time)
    )
    
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

@router.get("/", response_model=List[OrderResponse])
def get_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    orders = db.query(Order).filter(Order.customer_id == current_user.id).all()
    return orders

@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: int,
    status_update: OrderStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.status = status_update.status
    if status_update.status == OrderStatus.DELIVERED:
        order.delivered_at = datetime.utcnow()
    
    db.commit()
    db.refresh(order)
    return order
