from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Restaurant(Base):
    __tablename__ = "restaurants"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    cuisine_type = Column(String(100))
    address = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    phone = Column(String(20))
    image_url = Column(String(500))
    rating = Column(Float, default=0.0)
    total_reviews = Column(Integer, default=0)
    is_verified = Column(Boolean, default=False)
    is_open = Column(Boolean, default=True)
    delivery_time = Column(Integer, default=30)  # minutes
    minimum_order = Column(Float, default=0.0)
    delivery_fee = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", backref="restaurant")
    menu_items = relationship("MenuItem", back_populates="restaurant")

class MenuItem(Base):
    __tablename__ = "menu_items"
    
    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    name = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    category = Column(String(100))
    image_url = Column(String(500))
    is_available = Column(Boolean, default=True)
    is_vegetarian = Column(Boolean, default=False)
    preparation_time = Column(Integer, default=15)  # minutes
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    restaurant = relationship("Restaurant", back_populates="menu_items")
