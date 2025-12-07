from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class RiderStatus(str, enum.Enum):
    OFFLINE = "offline"
    AVAILABLE = "available"
    BUSY = "busy"

class Rider(Base):
    __tablename__ = "riders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    vehicle_type = Column(String(50))  # bike, motorcycle, car
    vehicle_number = Column(String(50))
    license_number = Column(String(100))
    is_verified = Column(Boolean, default=False)
    status = Column(SQLEnum(RiderStatus), default=RiderStatus.OFFLINE)
    current_latitude = Column(Float)
    current_longitude = Column(Float)
    rating = Column(Float, default=0.0)
    total_deliveries = Column(Integer, default=0)
    earnings = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", backref="rider_profile")
