import requests
import json

def test_restaurant_api():
    print("Testing restaurant API...")
    
    try:
        # Test the /api/restaurant/all endpoint
        response = requests.get("http://localhost:8000/api/restaurant/all")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of restaurants: {len(data)}")
            
            for restaurant in data:
                print(f"\n=== Restaurant ID: {restaurant['id']} ===")
                print(f"Name: {restaurant.get('name', 'N/A')}")
                print(f"Address: {restaurant.get('address', 'N/A')}")
                print(f"Phone: {restaurant.get('phone', 'N/A')}")
                print(f"Cuisine: {restaurant.get('cuisine_type', 'N/A')}")
                print(f"Rating: {restaurant.get('rating', 'N/A')}")
                print(f"Status: {restaurant.get('status', 'N/A')}")
                print(f"Images: {'Yes' if restaurant.get('images') else 'No'}")
                if restaurant.get('images'):
                    print(f"Image length: {len(restaurant['images'])} chars")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_restaurant_api()