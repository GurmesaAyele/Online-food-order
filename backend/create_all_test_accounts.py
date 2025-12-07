import requests
import time

# Test accounts for all roles
accounts = [
    {
        "email": "admin@foodhub.com",
        "password": "admin123",
        "full_name": "Admin User",
        "phone": "1234567890",
        "role": "admin"
    },
    {
        "email": "customer@test.com",
        "password": "password123",
        "full_name": "Test Customer",
        "phone": "1234567891",
        "role": "customer"
    },
    {
        "email": "restaurant@test.com",
        "password": "password123",
        "full_name": "Test Restaurant",
        "phone": "1234567892",
        "role": "restaurant"
    },
    {
        "email": "rider@test.com",
        "password": "password123",
        "full_name": "Test Rider",
        "phone": "1234567893",
        "role": "rider"
    }
]

print("=" * 60)
print("Creating Test Accounts for All Roles")
print("=" * 60)
print()

for account in accounts:
    try:
        response = requests.post(
            "http://localhost:8000/api/v1/auth/register",
            json=account
        )
        
        if response.status_code == 200:
            print(f"✅ {account['role'].upper()} account created!")
            print(f"   Email: {account['email']}")
            print(f"   Password: {account['password']}")
            print()
        else:
            error = response.json()
            if "already registered" in str(error):
                print(f"ℹ️  {account['role'].upper()} account already exists")
                print(f"   Email: {account['email']}")
                print(f"   Password: {account['password']}")
                print()
            else:
                print(f"❌ Failed to create {account['role']}: {error}")
                print()
        
        time.sleep(0.5)  # Small delay between requests
        
    except Exception as e:
        print(f"❌ Error creating {account['role']}: {e}")
        print()

print("=" * 60)
print("Summary - Login Credentials")
print("=" * 60)
print()
print("ADMIN DASHBOARD (http://localhost:5177)")
print("  Email: admin@foodhub.com")
print("  Password: admin123")
print()
print("CUSTOMER APP (http://localhost:5174)")
print("  Email: customer@test.com")
print("  Password: password123")
print()
print("RESTAURANT DASHBOARD (http://localhost:5175)")
print("  Email: restaurant@test.com")
print("  Password: password123")
print()
print("RIDER DASHBOARD (http://localhost:5176)")
print("  Email: rider@test.com")
print("  Password: password123")
print()
print("=" * 60)
print("All accounts are ready to use!")
print("=" * 60)
