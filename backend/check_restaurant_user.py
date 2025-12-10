import mysql.connector
from mysql.connector import Error

def check_restaurant_users():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='fooddelivery',
            user='root',
            password='14162121'
        )
        
        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)
            
            # Get all restaurant users
            cursor.execute("SELECT id, email, full_name, role FROM users WHERE role = 'restaurant'")
            restaurant_users = cursor.fetchall()
            
            print("\n=== Restaurant Users ===")
            for user in restaurant_users:
                print(f"\nUser ID: {user['id']}")
                print(f"Email: {user['email']}")
                print(f"Name: {user['full_name']}")
                
                # Check if they have a restaurant record
                cursor.execute("SELECT * FROM restaurants WHERE user_id = %s", (user['id'],))
                restaurant = cursor.fetchone()
                
                if restaurant:
                    print(f"✅ Has restaurant record (ID: {restaurant['id']})")
                    print(f"   Restaurant Name: {restaurant['name']}")
                    print(f"   Status: {restaurant['status']}")
                else:
                    print("❌ NO restaurant record found!")
                    print("   This user cannot add menu items or view orders!")
            
            # Get all restaurants
            print("\n\n=== All Restaurants ===")
            cursor.execute("SELECT * FROM restaurants")
            restaurants = cursor.fetchall()
            
            for restaurant in restaurants:
                print(f"\nRestaurant ID: {restaurant['id']}")
                print(f"User ID: {restaurant['user_id']}")
                print(f"Name: {restaurant['name']}")
                print(f"Status: {restaurant['status']}")
                
                # Check menu items count
                cursor.execute("SELECT COUNT(*) as count FROM menu_items WHERE restaurant_id = %s", (restaurant['id'],))
                menu_count = cursor.fetchone()
                print(f"Menu Items: {menu_count['count']}")
                
                # Check orders count
                cursor.execute("SELECT COUNT(*) as count FROM orders WHERE restaurant_id = %s", (restaurant['id'],))
                orders_count = cursor.fetchone()
                print(f"Orders: {orders_count['count']}")
            
            cursor.close()
            connection.close()
            
    except Error as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_restaurant_users()
