from app.core.database import SessionLocal
from app.core.security import get_password_hash
from app.models.user import User, UserRole

db = SessionLocal()

print("=" * 60)
print("Creating Admin Account...")
print("=" * 60)
print()

# Check if admin already exists
existing = db.query(User).filter(User.email == "admin@foodhub.com").first()

if existing:
    print("ℹ️  Admin account already exists!")
    print(f"   Email: {existing.email}")
    print(f"   Role: {existing.role}")
    print()
    print("You can login with:")
    print("   Email: admin@foodhub.com")
    print("   Password: admin123")
else:
    # Create admin user
    admin = User(
        email="admin@foodhub.com",
        hashed_password=get_password_hash("admin123"),
        full_name="Admin User",
        phone="1234567890",
        role=UserRole.ADMIN,
        is_active=True,
        is_verified=True
    )
    
    db.add(admin)
    db.commit()
    db.refresh(admin)
    
    print("✅ Admin account created successfully!")
    print()
    print("Login Credentials:")
    print("   Email: admin@foodhub.com")
    print("   Password: admin123")
    print()
    print("Dashboard: http://localhost:5177")

print()
print("=" * 60)

db.close()
