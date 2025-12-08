from app.database import SessionLocal
from app.models import User
from app.auth import get_password_hash

db = SessionLocal()

# Check if admin already exists
admin = db.query(User).filter(User.email == "admin@foodhub.com").first()

if admin:
    print("❌ Admin user already exists!")
else:
    # Create admin user
    admin = User(
        email="admin@foodhub.com",
        password=get_password_hash("admin123"),
        full_name="Admin User",
        phone="1234567890",
        role="admin"
    )
    db.add(admin)
    db.commit()
    print("✅ Admin user created successfully!")
    print("Email: admin@foodhub.com")
    print("Password: admin123")

db.close()
