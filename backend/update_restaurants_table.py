import pymysql
import sys

def update_restaurants_table():
    """Add new columns to restaurants table for MySQL"""
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='14162121',
            database='fooddelivery'
        )
        
        cursor = connection.cursor()
        
        print("Starting restaurants table update...")
        
        # Check if restaurants table exists
        cursor.execute("SHOW TABLES LIKE 'restaurants'")
        if not cursor.fetchone():
            print("❌ Restaurants table does not exist. Creating all tables first...")
            cursor.close()
            connection.close()
            # Import and create tables
            from app.database import engine
            from app.models import Base
            Base.metadata.create_all(bind=engine)
            print("✅ All tables created. Please run this script again to add columns.")
            sys.exit(0)
        
        # Get existing columns
        cursor.execute("SHOW COLUMNS FROM restaurants")
        existing_columns = [column[0] for column in cursor.fetchall()]
        print(f"Existing columns: {existing_columns}")
        
        # Add business_license column if it doesn't exist
        if 'business_license' not in existing_columns:
            print("Adding business_license column...")
            cursor.execute("ALTER TABLE restaurants ADD COLUMN business_license VARCHAR(255)")
            print("✅ business_license column added")
        else:
            print("ℹ️  business_license column already exists")
        
        # Add status column if it doesn't exist
        if 'status' not in existing_columns:
            print("Adding status column...")
            cursor.execute("ALTER TABLE restaurants ADD COLUMN status VARCHAR(20) DEFAULT 'open' NOT NULL")
            print("✅ status column added")
        else:
            print("ℹ️  status column already exists")
        
        # Add rejection_reason column if it doesn't exist
        if 'rejection_reason' not in existing_columns:
            print("Adding rejection_reason column...")
            cursor.execute("ALTER TABLE restaurants ADD COLUMN rejection_reason TEXT")
            print("✅ rejection_reason column added")
        else:
            print("ℹ️  rejection_reason column already exists")
        
        # Add updated_at column if it doesn't exist
        if 'updated_at' not in existing_columns:
            print("Adding updated_at column...")
            cursor.execute("ALTER TABLE restaurants ADD COLUMN updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP")
            print("✅ updated_at column added")
        else:
            print("ℹ️  updated_at column already exists")
        
        connection.commit()
        print("\n✅ Restaurants table updated successfully!")
        
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
    update_restaurants_table()
