from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum, Text
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class RequestStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class RequestType(str, enum.Enum):
    RESTAURANT = "restaurant"
    RIDER = "rider"

class AccessRequest(Base):
    __tablename__ = "access_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    request_type = Column(SQLEnum(RequestType), nullable=False)
    status = Column(SQLEnum(RequestStatus), default=RequestStatus.PENDING)
    
    # Common fields
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(20), nullable=False)
    
    # Restaurant specific
    restaurant_name = Column(String(255))
    business_license = Column(String(255))
    restaurant_address = Column(Text)
    cuisine_type = Column(String(100))
    
    # Rider specific
    vehicle_type = Column(String(50))
    license_number = Column(String(100))
    government_id = Column(String(100))
    
    # Admin notes
    admin_notes = Column(Text)
    reviewed_by = Column(Integer)
    reviewed_at = Column(DateTime(timezone=True))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
