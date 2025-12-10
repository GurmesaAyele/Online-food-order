import pymysql

try:
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='14162121',
        database='fooddelivery'
    )
    
    cursor = connection.cursor()
    
    # Check riders table
    cursor.execute("SHOW TABLES LIKE 'riders'")
    if cursor.fetchone():
        print("Riders table structure:")
        cursor.execute("DESCRIBE riders")
        columns = cursor.fetchall()
        for col in columns:
            print(f"  {col[0]}: {col[1]}")
    else:
        print("❌ Riders table does not exist")
    
    connection.close()
    
except Exception as e:
    print(f"Error: {e}")
