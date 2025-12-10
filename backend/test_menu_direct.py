from app.database import SessionLocal
from app.models import Restaurant, MenuItem, User
from sqlalchemy import text

db = SessionLocal()

# Check restaurant
print("=== Checking Restaurant ===")
user = db.query(User).filter(User.email == "tedit3833@gmail.com").first()
if user:
    print(f"User ID: {user.id}")
    print(f"User Role: {user.role}")
    
    restaurant = db.query(Restaurant).filter(Restaurant.user_id == user.id).first()
    if restaurant:
        print(f"Restaurant ID: {restaurant.id}")
        print(f"Restaurant Name: {restaurant.name}")
        
        # Try to create a menu item
        print("\n=== Creating Menu Item ===")
        try:
            menu_item = MenuItem(
                restaurant_id=restaurant.id,
                name="Test Pizza",
                description="Delicious test pizza",
                price=15.99,
                category="Main Course",
                meal_type="lunch",
                dietary_type="non_fasting",
                available=1,
                image=""
            )
            db.add(menu_item)
            db.commit()
            print("✅ Menu item created successfully!")
            print(f"Menu item ID: {menu_item.id}")
            
            # Check if it was saved
            saved_item = db.query(MenuItem).filter(MenuItem.id == menu_item.id).first()
            if saved_item:
                print(f"✅ Verified: {saved_item.name} - ${saved_item.price}")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            db.rollback()
    else:
        print("❌ No restaurant found for this user")
else:
    print("❌ User not found")

db.close()
