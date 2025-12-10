from app.database import SessionLocal
from app.models import Restaurant, User

db = SessionLocal()

print("=== Checking Restaurant Data ===")

# Get all restaurants
restaurants = db.query(Restaurant).all()
print(f"Total restaurants in database: {len(restaurants)}")

for restaurant in restaurants:
    print(f"\n--- Restaurant ID: {restaurant.id} ---")
    print(f"User ID: {restaurant.user_id}")
    print(f"Name: {restaurant.name}")
    print(f"Address: {restaurant.address}")
    print(f"Phone: {restaurant.phone}")
    print(f"Cuisine Type: {restaurant.cuisine_type}")
    print(f"Rating: {restaurant.rating}")
    print(f"Status: {restaurant.status}")
    print(f"Images: {'Yes' if restaurant.images else 'No'}")
    if restaurant.images:
        print(f"Image length: {len(restaurant.images)} chars")
    
    # Get associated user
    user = db.query(User).filter(User.id == restaurant.user_id).first()
    if user:
        print(f"User Name: {user.full_name}")
        print(f"User Email: {user.email}")
    else:
        print("❌ No user found for this restaurant!")

db.close()