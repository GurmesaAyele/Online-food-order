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

class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    category = Column(String(100))
    available = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
