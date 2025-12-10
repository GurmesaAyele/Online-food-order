import pymysql
import sys

def update_riders_table():
    """Update riders table to match our model"""
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='14162121',
            database='fooddelivery'
        )
        
        cursor = connection.cursor()
        
        print("Starting riders table update...")
        
        # Get existing columns
        cursor.execute("DESCRIBE riders")
        existing_columns = [column[0] for column in cursor.fetchall()]
        print(f"Existing columns: {existing_columns}")
        
        # Add full_name column if it doesn't exist
        if 'full_name' not in existing_columns:
            print("Adding full_name column...")
            cursor.execute("ALTER TABLE riders ADD COLUMN full_name VARCHAR(255) NOT NULL DEFAULT ''")
            print("✅ full_name column added")
        else:
            print("ℹ️  full_name column already exists")
        
        # Add phone column if it doesn't exist
        if 'phone' not in existing_columns:
            print("Adding phone column...")
            cursor.execute("ALTER TABLE riders ADD COLUMN phone VARCHAR(20)")
            print("✅ phone column added")
        else:
            print("ℹ️  phone column already exists")
        
        # Add address column if it doesn't exist
        if 'address' not in existing_columns:
            print("Adding address column...")
            cursor.execute("ALTER TABLE riders ADD COLUMN address TEXT")
            print("✅ address column added")
        else:
            print("ℹ️  address column already exists")
        
        # Add rejection_reason column if it doesn't exist
        if 'rejection_reason' not in existing_columns:
            print("Adding rejection_reason column...")
            cursor.execute("ALTER TABLE riders ADD COLUMN rejection_reason TEXT")
            print("✅ rejection_reason column added")
        else:
            print("ℹ️  rejection_reason column already exists")
        
        # Modify status column to match our enum
        print("Updating status column to match our enum...")
        cursor.execute("ALTER TABLE riders MODIFY COLUMN status VARCHAR(20) DEFAULT 'available' NOT NULL")
        print("✅ status column updated")
        
        connection.commit()
        print("\n✅ Riders table updated successfully!")
        
    except pymysql.Error as e:
        print(f"❌ Database error: {e}")
        if connection:
            connection.close()
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        if connection:
            connection.close()
        sys.exit(1)
    finally:
        try:
            if connection and connection.open:
                connection.close()
        except:
            pass

if __name__ == "__main__":
    update_riders_table()
