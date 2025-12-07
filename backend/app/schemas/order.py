from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.order import OrderStatus, PaymentMethod

class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int
    price: float
    name: str

class OrderCreate(BaseModel):
    restaurant_id: int
    items: List[OrderItemCreate]
    delivery_address: str
    delivery_latitude: float
    delivery_longitude: float
    delivery_instructions: Optional[str] = None
    payment_method: PaymentMethod
    promo_code: Optional[str] = None

class OrderResponse(BaseModel):
    id: int
    customer_id: int
    restaurant_id: int
    rider_id: Optional[int] = None
    status: OrderStatus
    items: List[Dict[str, Any]]
    subtotal: float
    delivery_fee: float
    discount: float
    total: float
    payment_method: PaymentMethod
    payment_status: str
    delivery_address: str
    estimated_delivery_time: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class OrderStatusUpdate(BaseModel):
    status: OrderStatus
