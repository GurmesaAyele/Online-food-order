from app.core.database import SessionLocal
from app.models.user import User

db = SessionLocal()

print("=" * 60)
print("Checking existing users in database...")
print("=" * 60)
print()

users = db.query(User).all()

if not users:
    print("❌ No users found in database!")
    print()
    print("You need to create accounts first.")
    print("Go to: http://localhost:8000/docs")
    print("Use: POST /api/v1/auth/register")
else:
    print(f"✅ Found {len(users)} user(s):")
    print()
    for user in users:
        print(f"  Email: {user.email}")
        print(f"  Role: {user.role}")
        print(f"  Active: {user.is_active}")
        print(f"  Verified: {user.is_verified}")
        print()

db.close()
