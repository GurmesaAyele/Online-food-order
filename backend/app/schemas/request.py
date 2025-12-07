from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class RestaurantRequestCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    restaurant_name: str
    business_license: Optional[str] = None
    restaurant_address: str
    cuisine_type: str

class RiderRequestCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    vehicle_type: str
    license_number: str
    government_id: Optional[str] = None

class AccessRequestResponse(BaseModel):
    id: int
    request_type: str
    status: str
    full_name: str
    email: str
    phone: str
    restaurant_name: Optional[str] = None
    restaurant_address: Optional[str] = None
    cuisine_type: Optional[str] = None
    vehicle_type: Optional[str] = None
    license_number: Optional[str] = None
    admin_notes: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class ApproveRequestData(BaseModel):
    admin_notes: Optional[str] = None
    password: str  # Temporary password for new account
