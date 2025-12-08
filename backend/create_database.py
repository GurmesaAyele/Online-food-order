import pymysql

# Connect to MySQL server (without specifying database)
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='14162121'
)

try:
    with connection.cursor() as cursor:
        # Create database
        cursor.execute("CREATE DATABASE IF NOT EXISTS food_delivery")
        print("✅ Database 'food_delivery' created successfully!")
finally:
    connection.close()
