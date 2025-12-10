from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, MenuItem, Order, Restaurant, RestaurantStatus
from app.auth import get_current_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class MenuItemCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    meal_type: Optional[str] = None
    dietary_type: Optional[str] = None
    image: Optional[str] = None
    available: int = 1

class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    meal_type: Optional[str] = None
    dietary_type: Optional[str] = None
    image: Optional[str] = None
    available: Optional[int] = None

class OrderStatusUpdate(BaseModel):
    status: str

class RestaurantUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    cuisine_type: Optional[str] = None
    description: Optional[str] = None
    images: Optional[str] = None

@router.get("/all")
def get_all_restaurants(db: Session = Depends(get_db)):
    """Get all open restaurants for customers"""
    restaurants = db.query(Restaurant).filter(
        Restaurant.status == RestaurantStatus.open
    ).all()
    
    result = []
    for restaurant in restaurants:
        user = db.query(User).filter(User.id == restaurant.user_id).first()
        result.append({
            "id": restaurant.id,
            "user_id": restaurant.user_id,
            "name": restaurant.name,
            "address": restaurant.address,
            "phone": restaurant.phone,
            "cuisine_type": restaurant.cuisine_type,
            "rating": restaurant.rating,
            "status": restaurant.status,
            "images": restaurant.images,  # Add restaurant images
            "operating_hours": restaurant.operating_hours,
            "delivery_hours": restaurant.delivery_hours,
            "payment_methods": restaurant.payment_methods
        })
    
    return result

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
    
    # Get restaurant record for this user
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    # Get menu items for this restaurant
    items = db.query(MenuItem).filter(MenuItem.restaurant_id == restaurant.id).all()
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
    
    # Get restaurant record for this user
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    db_item = MenuItem(
        restaurant_id=restaurant.id,
        name=item.name,
        description=item.description,
        price=item.price,
        category=item.category,
        meal_type=item.meal_type,
        dietary_type=item.dietary_type,
        image=item.image,
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
    
    # Get restaurant record for this user
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    db_item = db.query(MenuItem).filter(
        MenuItem.id == item_id,
        MenuItem.restaurant_id == restaurant.id
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
    if item.meal_type is not None:
        db_item.meal_type = item.meal_type
    if item.dietary_type is not None:
        db_item.dietary_type = item.dietary_type
    if item.image is not None:
        db_item.image = item.image
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
    
    # Get restaurant record for this user
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    db_item = db.query(MenuItem).filter(
        MenuItem.id == item_id,
        MenuItem.restaurant_id == restaurant.id
    ).first()
    
    if not db_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Menu item not found"
        )
    
    db.delete(db_item)
    db.commit()
    return {"message": "Menu item deleted successfully"}

@router.get("/orders")
def get_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    # Get restaurant record for this user
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    # Get orders for this restaurant
    orders = db.query(Order).filter(Order.restaurant_id == restaurant.id).all()
    
    # Format orders for frontend
    formatted_orders = []
    for order in orders:
        formatted_orders.append({
            "id": order.id,
            "customer_name": f"Customer #{order.customer_id}",
            "items": "Order items",
            "total": float(order.total_amount),
            "status": order.status.value if hasattr(order.status, 'value') else order.status,
            "created_at": order.created_at.isoformat() if order.created_at else None
        })
    
    return formatted_orders

@router.put("/orders/{order_id}/status")
def update_order_status(
    order_id: int,
    status_update: OrderStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    # Get restaurant record for this user
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    order = db.query(Order).filter(
        Order.id == order_id,
        Order.restaurant_id == restaurant.id
    ).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Update order status
    order.status = status_update.status
    db.commit()
    db.refresh(order)
    
    return {"message": "Order status updated successfully", "order": order}

@router.get("/profile")
def get_restaurant_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    # Get restaurant record for this user
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    return {
        "id": restaurant.id,
        "name": restaurant.name,
        "address": restaurant.address,
        "phone": restaurant.phone,
        "cuisine_type": restaurant.cuisine_type,
        "rating": restaurant.rating,
        "status": restaurant.status,
        "images": restaurant.images,
        "operating_hours": restaurant.operating_hours,
        "delivery_hours": restaurant.delivery_hours,
        "payment_methods": restaurant.payment_methods
    }

@router.put("/profile")
def update_restaurant_profile(
    restaurant_update: RestaurantUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "restaurant":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    # Get restaurant record for this user
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == current_user.id).first()
    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )
    
    print(f"Updating restaurant profile for user {current_user.id}")
    print(f"Update data: {restaurant_update}")
    
    # Update fields
    if restaurant_update.name is not None:
        restaurant.name = restaurant_update.name
        print(f"Updated name to: {restaurant.name}")
    if restaurant_update.address is not None:
        restaurant.address = restaurant_update.address
        print(f"Updated address to: {restaurant.address}")
    if restaurant_update.phone is not None:
        restaurant.phone = restaurant_update.phone
        print(f"Updated phone to: {restaurant.phone}")
    if restaurant_update.cuisine_type is not None:
        restaurant.cuisine_type = restaurant_update.cuisine_type
        print(f"Updated cuisine_type to: {restaurant.cuisine_type}")
    if restaurant_update.images is not None:
        restaurant.images = restaurant_update.images
        print(f"Updated images: {'Yes' if restaurant.images else 'No'} ({len(restaurant.images) if restaurant.images else 0} chars)")
    
    db.commit()
    db.refresh(restaurant)
    
    print(f"Restaurant profile updated successfully")
    return {"message": "Restaurant profile updated successfully", "restaurant": restaurant}
