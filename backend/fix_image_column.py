import mysql.connector
from mysql.connector import Error

def fix_image_column():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='fooddelivery',
            user='root',
            password='14162121'
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            
            print("Fixing image column size...")
            
            # Change image column from TEXT to LONGTEXT (can hold up to 4GB)
            try:
                cursor.execute("ALTER TABLE menu_items MODIFY COLUMN image LONGTEXT")
                print("✅ Changed menu_items.image to LONGTEXT")
            except Error as e:
                print(f"❌ Error modifying menu_items.image: {e}")
            
            # Also fix restaurants.images column
            try:
                cursor.execute("ALTER TABLE restaurants MODIFY COLUMN images LONGTEXT")
                print("✅ Changed restaurants.images to LONGTEXT")
            except Error as e:
                print(f"❌ Error modifying restaurants.images: {e}")
            
            connection.commit()
            
            # Show current column types
            cursor.execute("DESCRIBE menu_items")
            columns = cursor.fetchall()
            
            print("\n=== Updated menu_items Table ===")
            for col in columns:
                if col[0] in ['image', 'image_url']:
                    print(f"{col[0]}: {col[1]}")
            
            cursor.execute("DESCRIBE restaurants")
            columns = cursor.fetchall()
            
            print("\n=== Updated restaurants Table ===")
            for col in columns:
                if col[0] == 'images':
                    print(f"{col[0]}: {col[1]}")
            
            cursor.close()
            connection.close()
            
            print("\n✅ Image columns updated successfully!")
            print("Now you can upload larger images (up to 4GB)")
            
    except Error as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_image_column()