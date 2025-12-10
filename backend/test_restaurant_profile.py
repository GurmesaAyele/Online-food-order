from app.database import SessionLocal
from app.models import Restaurant, User

db = SessionLocal()

print("=== Testing Restaurant Profile API ===")

# Get restaurant
restaurant = db.query(Restaurant).filter(Restaurant.id == 1).first()
if restaurant:
    print(f"Restaurant ID: {restaurant.id}")
    print(f"Name: {restaurant.name}")
    print(f"Address: {restaurant.address}")
    print(f"Phone: {restaurant.phone}")
    print(f"Cuisine: {restaurant.cuisine_type}")
    print(f"Images: {'Yes' if restaurant.images else 'No'}")
    if restaurant.images:
        print(f"Image length: {len(restaurant.images)} chars")
        print(f"Image starts with: {restaurant.images[:50]}...")
    
    # Test updating image
    print("\n=== Testing Image Update ===")
    test_image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/test"
    restaurant.images = test_image
    db.commit()
    
    # Verify update
    db.refresh(restaurant)
    print(f"After update - Images: {'Yes' if restaurant.images else 'No'}")
    if restaurant.images:
        print(f"Updated image: {restaurant.images[:50]}...")
else:
    print("❌ No restaurant found!")

db.close()