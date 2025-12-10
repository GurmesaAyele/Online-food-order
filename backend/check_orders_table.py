import mysql.connector
from mysql.connector import Error

def check_orders_table():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='fooddelivery',
            user='root',
            password='14162121'
        )
        
        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)
            
            # Check if orders table exists
            cursor.execute("SHOW TABLES LIKE 'orders'")
            table_exists = cursor.fetchone()
            
            if table_exists:
                print("✅ orders table exists")
                
                # Get table structure
                cursor.execute("DESCRIBE orders")
                columns = cursor.fetchall()
                
                print("\n=== Table Structure ===")
                for col in columns:
                    print(f"{col['Field']}: {col['Type']}")
                
                # Get count
                cursor.execute("SELECT COUNT(*) as count FROM orders")
                count = cursor.fetchone()
                print(f"\nTotal orders: {count['count']}")
                
                # Get sample orders
                cursor.execute("SELECT * FROM orders LIMIT 5")
                orders = cursor.fetchall()
                
                if orders:
                    print("\n=== Sample Orders ===")
                    for order in orders:
                        print(f"\nOrder ID: {order['id']}")
                        print(f"Restaurant ID: {order.get('restaurant_id', 'N/A')}")
                        print(f"Customer ID: {order.get('customer_id', 'N/A')}")
                        print(f"Status: {order.get('status', 'N/A')}")
                        print(f"Total: {order.get('total_amount', 'N/A')}")
                else:
                    print("\nNo orders found")
            else:
                print("❌ orders table does NOT exist!")
            
            cursor.close()
            connection.close()
            
    except Error as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_orders_table()
