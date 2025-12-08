import pymysql
from app.database import engine, Base
from app.models import User, AccessRequest, Restaurant, MenuItem

# Connect directly to MySQL to disable foreign key checks
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='14162121',
    database='fooddelivery'
)

try:
    with connection.cursor() as cursor:
        # Disable foreign key checks
        cursor.execute("SET FOREIGN_KEY_CHECKS = 0")
        
        # Drop all tables
        cursor.execute("DROP TABLE IF EXISTS orders")
        cursor.execute("DROP TABLE IF EXISTS menu_items")
        cursor.execute("DROP TABLE IF EXISTS restaurants")
        cursor.execute("DROP TABLE IF EXISTS access_requests")
        cursor.execute("DROP TABLE IF EXISTS users")
        
        # Re-enable foreign key checks
        cursor.execute("SET FOREIGN_KEY_CHECKS = 1")
        
        connection.commit()
        print("✅ Old tables dropped successfully!")
finally:
    connection.close()

# Create new tables with updated schema
print("Creating new tables...")
Base.metadata.create_all(bind=engine)
print("✅ Database tables updated successfully!")
