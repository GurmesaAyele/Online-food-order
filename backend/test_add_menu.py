import requests
import json

# First login to get token
login_data = {
    "username": "tedit3833@gmail.com",
    "password": "14162121"  # Replace with actual password
}

print("Logging in...")
response = requests.post("http://localhost:8000/api/auth/login", data=login_data)
print(f"Login status: {response.status_code}")

if response.status_code == 200:
    token = response.json()["access_token"]
    print(f"Token: {token[:50]}...")
    
    # Try to add menu item
    menu_item = {
        "name": "Test Pizza",
        "description": "Delicious test pizza",
        "price": 15.99,
        "category": "Main Course",
        "meal_type": "Lunch",
        "dietary_type": "Non-Fasting",
        "available": 1,
        "image": ""
    }
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    print("\nAdding menu item...")
    response = requests.post(
        "http://localhost:8000/api/restaurant/menu",
        headers=headers,
        json=menu_item
    )
    
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code != 200:
        print("\n❌ Error occurred!")
        try:
            error_detail = response.json()
            print(f"Error detail: {json.dumps(error_detail, indent=2)}")
        except:
            print(f"Raw error: {response.text}")
else:
    print(f"Login failed: {response.text}")
