import mysql.connector
from mysql.connector import Error

def check_menu_table():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='fooddelivery',
            user='root',
            password='14162121'
        )
        
        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)
            
            # Check if menu_items table exists
            cursor.execute("SHOW TABLES LIKE 'menu_items'")
            table_exists = cursor.fetchone()
            
            if table_exists:
                print("✅ menu_items table exists")
                
                # Get table structure
                cursor.execute("DESCRIBE menu_items")
                columns = cursor.fetchall()
                
                print("\n=== Table Structure ===")
                for col in columns:
                    print(f"{col['Field']}: {col['Type']} (Null: {col['Null']}, Key: {col['Key']})")
                
                # Get count
                cursor.execute("SELECT COUNT(*) as count FROM menu_items")
                count = cursor.fetchone()
                print(f"\nTotal menu items: {count['count']}")
                
                # Get all menu items
                cursor.execute("SELECT * FROM menu_items")
                items = cursor.fetchall()
                
                if items:
                    print("\n=== Menu Items ===")
                    for item in items:
                        print(f"\nID: {item['id']}")
                        print(f"Restaurant ID: {item.get('restaurant_id', 'N/A')}")
                        print(f"Name: {item['name']}")
                        print(f"Price: {item['price']}")
                else:
                    print("\nNo menu items found")
            else:
                print("❌ menu_items table does NOT exist!")
                print("You need to create the table first")
            
            cursor.close()
            connection.close()
            
    except Error as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_menu_table()
