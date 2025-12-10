import mysql.connector
from mysql.connector import Error

def fix_menu_items_table():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='fooddelivery',
            user='root',
            password='14162121'
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            
            print("Fixing menu_items table...")
            
            # 1. Rename user_id to restaurant_id
            try:
                cursor.execute("ALTER TABLE menu_items CHANGE COLUMN user_id restaurant_id INT NOT NULL")
                print("✅ Renamed user_id to restaurant_id")
            except Error as e:
                if "Duplicate column name" in str(e) or "Unknown column" in str(e):
                    print("⚠️  Column already renamed or doesn't exist")
                else:
                    print(f"❌ Error renaming column: {e}")
            
            # 2. Add image column if it doesn't exist (for base64 images)
            try:
                cursor.execute("ALTER TABLE menu_items ADD COLUMN image TEXT AFTER price")
                print("✅ Added image column")
            except Error as e:
                if "Duplicate column name" in str(e):
                    print("⚠️  image column already exists")
                else:
                    print(f"❌ Error adding image column: {e}")
            
            # 3. Add dietary_type column
            try:
                cursor.execute("ALTER TABLE menu_items ADD COLUMN dietary_type VARCHAR(50) DEFAULT 'non_fasting' AFTER meal_types")
                print("✅ Added dietary_type column")
            except Error as e:
                if "Duplicate column name" in str(e):
                    print("⚠️  dietary_type column already exists")
                else:
                    print(f"❌ Error adding dietary_type column: {e}")
            
            # 4. Modify available column to be INT with default 1
            try:
                cursor.execute("ALTER TABLE menu_items MODIFY COLUMN available INT DEFAULT 1")
                print("✅ Modified available column")
            except Error as e:
                print(f"❌ Error modifying available column: {e}")
            
            connection.commit()
            
            # Show final structure
            cursor.execute("DESCRIBE menu_items")
            columns = cursor.fetchall()
            
            print("\n=== Final Table Structure ===")
            for col in columns:
                print(f"{col[0]}: {col[1]}")
            
            cursor.close()
            connection.close()
            
            print("\n✅ Migration completed!")
            
    except Error as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_menu_items_table()
