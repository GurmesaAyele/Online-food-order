from app.database import SessionLocal
from app.models import User
from app.auth import get_password_hash

db = SessionLocal()

try:
    # Get all test users
    users = db.query(User).filter(User.email.in_([
        'admin@foodhub.com',
        'customer@test.com',
        'restaurant@test.com',
        'rider@test.com'
    ])).all()
    
    if not users:
        print("❌ No test users found!")
    else:
        # Update passwords
        for user in users:
            user.password = get_password_hash("admin123")
            print(f"✅ Updated password for: {user.email}")
        
        db.commit()
        print("\n🎉 All passwords updated successfully!")
        print("\nYou can now login with:")
        print("Email: admin@foodhub.com")
        print("Password: admin123")
        
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
    db.rollback()
finally:
    db.close()
