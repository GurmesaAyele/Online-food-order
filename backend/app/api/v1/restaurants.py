from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.api.dependencies import get_current_user, require_role
from app.models.user import User, UserRole
from app.models.restaurant import Restaurant, MenuItem
from app.schemas.restaurant import RestaurantCreate, RestaurantResponse, MenuItemCreate, MenuItemResponse

router = APIRouter()

@router.get("/", response_model=List[RestaurantResponse])
def get_restaurants(
    skip: int = 0,
    limit: int = 20,
    cuisine: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Restaurant).filter(Restaurant.is_verified == True)
    
    if cuisine:
        query = query.filter(Restaurant.cuisine_type == cuisine)
    if search:
        query = query.filter(Restaurant.name.contains(search))
    
    restaurants = query.offset(skip).limit(limit).all()
    return restaurants

@router.get("/{restaurant_id}", response_model=RestaurantResponse)
def get_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

@router.post("/", response_model=RestaurantResponse)
def create_restaurant(
    restaurant_data: RestaurantCreate,
    current_user: User = Depends(require_role(UserRole.RESTAURANT)),
    db: Session = Depends(get_db)
):
    existing = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Restaurant already exists for this user")
    
    restaurant = Restaurant(**restaurant_data.dict(), user_id=current_user.id)
    db.add(restaurant)
    db.commit()
    db.refresh(restaurant)
    return restaurant

@router.post("/{restaurant_id}/menu", response_model=MenuItemResponse)
def add_menu_item(
    restaurant_id: int,
    item_data: MenuItemCreate,
    current_user: User = Depends(require_role(UserRole.RESTAURANT)),
    db: Session = Depends(get_db)
):
    restaurant = db.query(Restaurant).filter(
        Restaurant.id == restaurant_id,
        Restaurant.user_id == current_user.id
    ).first()
    
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    menu_item = MenuItem(**item_data.dict(), restaurant_id=restaurant_id)
    db.add(menu_item)
    db.commit()
    db.refresh(menu_item)
    return menu_item

@router.get("/{restaurant_id}/menu", response_model=List[MenuItemResponse])
def get_menu(restaurant_id: int, db: Session = Depends(get_db)):
    items = db.query(MenuItem).filter(MenuItem.restaurant_id == restaurant_id).all()
    return items
