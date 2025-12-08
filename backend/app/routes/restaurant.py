from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, MenuItem
from app.auth import get_current_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class MenuItemCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    available: int = 1

class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    available: Optional[int] = None

@router.get("/menu")
def get_menu_items(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    # Get menu items for this restaurant
    items = db.query(MenuItem).filter(MenuItem.restaurant_id == current_user.id).all()
    return items

@router.post("/menu")
def create_menu_item(
    item: MenuItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    db_item = MenuItem(
        restaurant_id=current_user.id,
        name=item.name,
        description=item.description,
        price=item.price,
        category=item.category,
        available=item.available
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/menu/{item_id}")
def update_menu_item(
    item_id: int,
    item: MenuItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    db_item = db.query(MenuItem).filter(
        MenuItem.id == item_id,
        MenuItem.restaurant_id == current_user.id
    ).first()
    
    if not db_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menu item not found"
        )
    
    # Update fields
    if item.name is not None:
        db_item.name = item.name
    if item.description is not None:
        db_item.description = item.description
    if item.price is not None:
        db_item.price = item.price
    if item.category is not None:
        db_item.category = item.category
    if item.available is not None:
        db_item.available = item.available
    
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/menu/{item_id}")
def delete_menu_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    db_item = db.query(MenuItem).filter(
        MenuItem.id == item_id,
        MenuItem.restaurant_id == current_user.id
    ).first()
    
    if not db_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menu item not found"
        )
    
    db.delete(db_item)
    db.commit()
    return {"message": "Menu item deleted successfully"}
