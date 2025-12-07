import requests

# Admin account details
admin_data = {
    "email": "admin@foodhub.com",
    "password": "admin123",
    "full_name": "Admin User",
    "phone": "1234567890",
    "role": "admin"
}

# Create admin account
try:
    response = requests.post(
        "http://localhost:8000/api/v1/auth/register",
        json=admin_data
    )
    
    if response.status_code == 200:
        print("✅ Admin account created successfully!")
        print(f"Email: {admin_data['email']}")
        print(f"Password: {admin_data['password']}")
        print("\nYou can now login to the admin dashboard!")
    else:
        print(f"❌ Error: {response.json()}")
except Exception as e:
    print(f"❌ Failed to create admin: {e}")
    print("Make sure the backend is running at http://localhost:8000")
