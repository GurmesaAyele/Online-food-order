import pymysql
from datetime import datetime

# Connect to database
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='14162121',
    database='fooddelivery'
)

try:
    with connection.cursor() as cursor:
        # Check if admin already exists
        cursor.execute("SELECT * FROM users WHERE email = 'admin@foodhub.com'")
        if cursor.fetchone():
            print("❌ Test users already exist!")
        else:
            # Pre-hashed password for "admin123" using bcrypt
            # This hash was generated with: bcrypt.hashpw(b"admin123", bcrypt.gensalt())
            hashed_password = "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYfQPz.B4qa"
            
            # Insert test users
            test_users = [
                ('admin@foodhub.com', hashed_password, 'Admin User', '1234567890', 'admin'),
                ('customer@test.com', hashed_password, 'Test Customer', '1111111111', 'customer'),
                ('restaurant@test.com', hashed_password, 'Test Restaurant', '2222222222', 'restaurant'),
                ('rider@test.com', hashed_password, 'Test Rider', '3333333333', 'rider')
            ]
            
            for email, password, full_name, phone, role in test_users:
                cursor.execute(
                    """INSERT INTO users (email, password, full_name, phone, role, created_at) 
                       VALUES (%s, %s, %s, %s, %s, NOW())""",
                    (email, password, full_name, phone, role)
                )
                print(f"✅ Created: {email} (Role: {role})")
            
            connection.commit()
            print("\n🎉 All test users created successfully!")
            print("\nTest Accounts (Password: admin123):")
            print("- admin@foodhub.com (Admin)")
            print("- customer@test.com (Customer)")
            print("- restaurant@test.com (Restaurant)")
            print("- rider@test.com (Rider)")
            
except Exception as e:
    print(f"❌ Error: {e}")
    connection.rollback()
finally:
    connection.close()
