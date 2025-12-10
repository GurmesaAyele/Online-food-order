import pymysql

try:
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='14162121',
        database='fooddelivery'
    )
    
    cursor = connection.cursor()
    
    # Show all tables
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    
    print("Tables in database:")
    for table in tables:
        print(f"  - {table[0]}")
    
    # If restaurants table exists, show its structure
    cursor.execute("SHOW TABLES LIKE 'restaurants'")
    if cursor.fetchone():
        print("\nRestaurants table structure:")
        cursor.execute("DESCRIBE restaurants")
        columns = cursor.fetchall()
        for col in columns:
            print(f"  {col[0]}: {col[1]}")
    else:
        print("\n❌ Restaurants table does not exist")
    
    connection.close()
    
except Exception as e:
    print(f"Error: {e}")
