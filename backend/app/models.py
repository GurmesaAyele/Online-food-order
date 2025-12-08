from sqlalchemy import Column, Integer, String, DateTime, Enum, Text, Float
from sqlalchemy.sql import func
from app.database import Base
import enum

class UserRole(str, enum.Enum):
    customer = "customer"
    restaurant = "restaurant"
    rider = "rider"
    admin = "admin"

class RequestStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(20))
    role = Column(Enum(UserRole), default=UserRole.customer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class AccessRequest(Base):
    __tablename__ = "access_requests"

    id = Column(Integer, primary_key=True, index=True)
    request_type = Column(String(50), nullable=False)  # 'restaurant' or 'rider'
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    
    # Restaurant specific fields
    restaurant_name = Column(String(255))
    restaurant_address = Column(Text)
    business_license = Column(String(255))
    
    # Rider specific fields
    vehicle_type = Column(String(50))
    license_number = Column(String(100))
    address = Column(Text)
    
    # Common fields
    additional_info = Column(Text)
    
    status = Column(Enum(RequestStatus), default=RequestStatus.pending, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    address = Column(Text)
    phone = Column(String(20))
    cuisine_type = Column(String(100))
    rating = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class MealType(str, enum.Enum):
    breakfast = "breakfast"
    lunch = "lunch"
    dinner = "dinner"
    snack = "snack"
    all_day = "all_day"

class FoodType(str, enum.Enum):
    fasting = "fasting"
    non_fasting = "non_fasting"
    both = "both"

class OrderStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    preparing = "preparing"
    ready = "ready"
    picked_up = "picked_up"
    delivered = "delivered"
    cancelled = "cancelled"

class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)  # Restaurant owner user_id
    name = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    image_url = Column(String(500))
    category = Column(String(100))  # e.g., "Main Course", "Appetizer", "Dessert"
    meal_type = Column(Enum(MealType), default=MealType.all_day)
    food_type = Column(Enum(FoodType), default=FoodType.both)
    available = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, nullable=False)
    restaurant_id = Column(Integer, nullable=False)
    rider_id = Column(Integer)
    total_amount = Column(Float, nullable=False)
    status = Column(Enum(OrderStatus), default=OrderStatus.pending)
    delivery_address = Column(Text)
    customer_notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, nullable=False)
    menu_item_id = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
