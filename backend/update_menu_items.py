import mysql.connector
from mysql.connector import Error

def update_menu_items_table():
    try:
        # Connect to MySQL
        connection = mysql.connector.connect(
            host='localhost',
            database='fooddelivery',
            user='root',
            password='14162121'
        )

        if connection.is_connected():
            cursor = connection.cursor()
            
            print("Updating menu_items table...")
            
            # Check if columns exist before adding
            cursor.execute("""
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_SCHEMA = 'fooddelivery' 
                AND TABLE_NAME = 'menu_items'
            """)
            existing_columns = [row[0] for row in cursor.fetchall()]
            
            # Add meal_type column if it doesn't exist
            if 'meal_type' not in existing_columns:
                cursor.execute("""
                    ALTER TABLE menu_items 
                    ADD COLUMN meal_type VARCHAR(50) NULL
                """)
                print("✓ Added meal_type column")
            else:
                print("✓ meal_type column already exists")
            
            # Add dietary_type column if it doesn't exist
            if 'dietary_type' not in existing_columns:
                cursor.execute("""
                    ALTER TABLE menu_items 
                    ADD COLUMN dietary_type VARCHAR(50) NULL
                """)
                print("✓ Added dietary_type column")
            else:
                print("✓ dietary_type column already exists")
            
            # Add image column if it doesn't exist
            if 'image' not in existing_columns:
                cursor.execute("""
                    ALTER TABLE menu_items 
                    ADD COLUMN image LONGTEXT NULL
                """)
                print("✓ Added image column")
            else:
                print("✓ image column already exists")
            
            # Rename user_id to restaurant_id if needed
            if 'user_id' in existing_columns and 'restaurant_id' not in existing_columns:
                cursor.execute("""
                    ALTER TABLE menu_items 
                    CHANGE COLUMN user_id restaurant_id INT NOT NULL
                """)
                print("✓ Renamed user_id to restaurant_id")
            elif 'restaurant_id' in existing_columns:
                print("✓ restaurant_id column already exists")
            
            # Remove old columns if they exist
            if 'image_url' in existing_columns:
                cursor.execute("ALTER TABLE menu_items DROP COLUMN image_url")
                print("✓ Removed old image_url column")
            
            if 'meal_type' in existing_columns:
                # Change meal_type from ENUM to VARCHAR if it's ENUM
                cursor.execute("""
                    ALTER TABLE menu_items 
                    MODIFY COLUMN meal_type VARCHAR(50) NULL
                """)
                print("✓ Updated meal_type to VARCHAR")
            
            if 'food_type' in existing_columns:
                cursor.execute("ALTER TABLE menu_items DROP COLUMN food_type")
                print("✓ Removed old food_type column")
            
            connection.commit()
            print("\n✅ Menu items table updated successfully!")
            
    except Error as e:
        print(f"❌ Error: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("Database connection closed.")

if __name__ == "__main__":
    update_menu_items_table()
