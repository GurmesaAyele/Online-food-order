from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Enum as SQLEnum, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PREPARING = "preparing"
    READY = "ready"
    PICKED_UP = "picked_up"
    DELIVERING = "delivering"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class PaymentMethod(str, enum.Enum):
    STRIPE = "stripe"
    CHAPA = "chapa"
    MOBILE_MONEY = "mobile_money"
    CASH_ON_DELIVERY = "cod"

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("users.id"))
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    rider_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    status = Column(SQLEnum(OrderStatus), default=OrderStatus.PENDING)
    items = Column(JSON)  # Store order items as JSON
    subtotal = Column(Float, nullable=False)
    delivery_fee = Column(Float, default=0.0)
    discount = Column(Float, default=0.0)
    total = Column(Float, nullable=False)
    
    payment_method = Column(SQLEnum(PaymentMethod))
    payment_status = Column(String(50), default="pending")
    payment_id = Column(String(255))
    
    delivery_address = Column(Text)
    delivery_latitude = Column(Float)
    delivery_longitude = Column(Float)
    delivery_instructions = Column(Text)
    
    estimated_delivery_time = Column(DateTime(timezone=True))
    delivered_at = Column(DateTime(timezone=True))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    customer = relationship("User", foreign_keys=[customer_id])
    restaurant = relationship("Restaurant")
    rider = relationship("User", foreign_keys=[rider_id])

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    customer_id = Column(Integer, ForeignKey("users.id"))
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    rider_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    restaurant_rating = Column(Integer)  # 1-5
    rider_rating = Column(Integer, nullable=True)  # 1-5
    comment = Column(Text)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
