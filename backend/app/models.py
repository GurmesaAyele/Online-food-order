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
    rejection_reason = Column(Text)
    
    status = Column(Enum(RequestStatus), default=RequestStatus.pending, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class RestaurantStatus(str, enum.Enum):
    open = "open"
    closed = "closed"
    rejected = "rejected"

class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    address = Column(Text)
    phone = Column(String(20))
    cuisine_type = Column(String(100))
    business_license = Column(String(255))
    rating = Column(Float, default=0.0)
    status = Column(Enum(RestaurantStatus), default=RestaurantStatus.open, nullable=False)
    rejection_reason = Column(Text)
    
    # Restaurant images (JSON array of base64 images)
    images = Column(Text)
    
    # Operating hours
    operating_hours = Column(Text)  # JSON: {"monday": "9:00-22:00", ...}
    delivery_hours = Column(Text)   # JSON: {"monday": "10:00-21:00", ...}
    
    # Payment methods (JSON array)
    payment_methods = Column(Text)  # JSON: [{"method": "CBE", "account_number": "...", "account_name": "..."}]
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

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

class RiderStatus(str, enum.Enum):
    available = "available"
    unavailable = "unavailable"
    rejected = "rejected"

class Rider(Base):
    __tablename__ = "riders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(20))
    vehicle_type = Column(String(50))
    license_number = Column(String(100))
    address = Column(Text)
    status = Column(Enum(RiderStatus), default=RiderStatus.available, nullable=False)
    rejection_reason = Column(Text)
    rating = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class OrderStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    preparing = "preparing"
    ready = "ready"
    out_for_delivery = "out_for_delivery"
    delivered = "delivered"
    rejected = "rejected"
    cancelled = "cancelled"

class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    image = Column(Text)  # Base64 image data
    image_url = Column(String(500))  # Image URL (legacy)
    category = Column(String(100))  # e.g., "Main Course", "Appetizer", "Dessert"
    
    # Single meal type (enum)
    meal_type = Column(String(50))  # breakfast, lunch, dinner, snack, all_day
    
    # Legacy food type
    food_type = Column(String(50))  # fasting, non_fasting, both
    
    # Availability
    available = Column(Integer, default=1)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Multiple meal types support (JSON array: ["breakfast", "lunch"])
    meal_types = Column(Text)  # JSON array
    
    # Dietary type (fasting or non_fasting)
    dietary_type = Column(String(50), default="non_fasting")  # fasting, non_fasting
    
    # Delivery availability (JSON: {"days": ["monday", "tuesday"], "hours": "10:00-20:00"})
    delivery_schedule = Column(Text)

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, nullable=False)
    restaurant_id = Column(Integer, nullable=False)
    rider_id = Column(Integer)
    total_amount = Column(Float, nullable=False)
    status = Column(Enum(OrderStatus), default=OrderStatus.pending)
    
    # Delivery information
    delivery_address = Column(Text)  # Text address
    delivery_latitude = Column(Float)  # Map coordinates
    delivery_longitude = Column(Float)
    customer_phone = Column(String(20))  # Customer contact
    customer_notes = Column(Text)
    
    # Payment information
    payment_method = Column(String(50))  # CBE, Telebirr, Amole, Mobile Banking
    payment_screenshot = Column(Text)  # Base64 image
    payment_account_number = Column(String(100))  # Restaurant's account number used
    payment_account_name = Column(String(255))  # Restaurant's account name
    
    # Order management
    rejection_reason = Column(Text)
    
    # Rating and review
    customer_rating = Column(Float)
    customer_review = Column(Text)
    
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
