from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: str = "customer"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class RestaurantRequest(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    restaurant_name: str
    restaurant_address: str
    business_license: str
    additional_info: Optional[str] = None

class RiderRequest(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    vehicle_type: str
    license_number: str
    address: str
    additional_info: Optional[str] = None

class AccessRequestResponse(BaseModel):
    id: int
    request_type: str
    full_name: str
    email: str
    phone: str
    restaurant_name: Optional[str] = None
    restaurant_address: Optional[str] = None
    vehicle_type: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
