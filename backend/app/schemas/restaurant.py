from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class MenuItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_available: bool = True
    is_vegetarian: bool = False
    preparation_time: int = 15

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemResponse(MenuItemBase):
    id: int
    restaurant_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class RestaurantBase(BaseModel):
    name: str
    description: Optional[str] = None
    cuisine_type: Optional[str] = None
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    phone: Optional[str] = None
    image_url: Optional[str] = None

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantResponse(RestaurantBase):
    id: int
    rating: float
    total_reviews: int
    is_verified: bool
    is_open: bool
    delivery_time: int
    minimum_order: float
    delivery_fee: float
    created_at: datetime
    menu_items: List[MenuItemResponse] = []
    
    class Config:
        from_attributes = True
