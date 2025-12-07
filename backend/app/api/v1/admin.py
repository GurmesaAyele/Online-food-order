from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.api.dependencies import require_role
from app.models.user import User, UserRole
from app.models.order import Order
from app.models.restaurant import Restaurant

router = APIRouter()

@router.get("/stats")
def get_stats(
    current_user: User = Depends(require_role(UserRole.ADMIN)),
    db: Session = Depends(get_db)
):
    total_users = db.query(func.count(User.id)).scalar()
    total_restaurants = db.query(func.count(Restaurant.id)).scalar()
    total_orders = db.query(func.count(Order.id)).scalar()
    total_revenue = db.query(func.sum(Order.total)).scalar() or 0
    
    return {
        "total_users": total_users,
        "total_restaurants": total_restaurants,
        "total_orders": total_orders,
        "total_revenue": total_revenue
    }

@router.get("/users")
def get_all_users(
    current_user: User = Depends(require_role(UserRole.ADMIN)),
    db: Session = Depends(get_db)
):
    users = db.query(User).all()
    return users

@router.patch("/restaurants/{restaurant_id}/verify")
def verify_restaurant(
    restaurant_id: int,
    current_user: User = Depends(require_role(UserRole.ADMIN)),
    db: Session = Depends(get_db)
):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if restaurant:
        restaurant.is_verified = True
        db.commit()
        return {"message": "Restaurant verified"}
    return {"error": "Restaurant not found"}
