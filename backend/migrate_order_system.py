import pymysql
import sys

def migrate_order_system():
    """Add new columns for complete order system"""
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='14162121',
            database='fooddelivery'
        )
        
        cursor = connection.cursor()
        
        print("Starting order system migration...")
        
        # ===== RESTAURANTS TABLE =====
        print("\n📋 Updating restaurants table...")
        cursor.execute("DESCRIBE restaurants")
        restaurant_columns = [column[0] for column in cursor.fetchall()]
        
        if 'images' not in restaurant_columns:
            cursor.execute("ALTER TABLE restaurants ADD COLUMN images TEXT")
            print("✅ Added images column")
        
        if 'operating_hours' not in restaurant_columns:
            cursor.execute("ALTER TABLE restaurants ADD COLUMN operating_hours TEXT")
            print("✅ Added operating_hours column")
        
        if 'delivery_hours' not in restaurant_columns:
            cursor.execute("ALTER TABLE restaurants ADD COLUMN delivery_hours TEXT")
            print("✅ Added delivery_hours column")
        
        if 'payment_methods' not in restaurant_columns:
            cursor.execute("ALTER TABLE restaurants ADD COLUMN payment_methods TEXT")
            print("✅ Added payment_methods column")
        
        # ===== MENU_ITEMS TABLE =====
        print("\n📋 Updating menu_items table...")
        cursor.execute("DESCRIBE menu_items")
        menu_columns = [column[0] for column in cursor.fetchall()]
        
        if 'meal_types' not in menu_columns:
            cursor.execute("ALTER TABLE menu_items ADD COLUMN meal_types TEXT")
            print("✅ Added meal_types column")
        
        if 'delivery_schedule' not in menu_columns:
            cursor.execute("ALTER TABLE menu_items ADD COLUMN delivery_schedule TEXT")
            print("✅ Added delivery_schedule column")
        
        # Update dietary_type if it exists with wrong type
        if 'dietary_type' in menu_columns:
            cursor.execute("ALTER TABLE menu_items MODIFY COLUMN dietary_type VARCHAR(50) DEFAULT 'non_fasting'")
            print("✅ Updated dietary_type column")
        
        # ===== ORDERS TABLE =====
        print("\n📋 Updating orders table...")
        cursor.execute("DESCRIBE orders")
        order_columns = [column[0] for column in cursor.fetchall()]
        
        if 'delivery_latitude' not in order_columns:
            cursor.execute("ALTER TABLE orders ADD COLUMN delivery_latitude FLOAT")
            print("✅ Added delivery_latitude column")
        
        if 'delivery_longitude' not in order_columns:
            cursor.execute("ALTER TABLE orders ADD COLUMN delivery_longitude FLOAT")
            print("✅ Added delivery_longitude column")
        
        if 'customer_phone' not in order_columns:
            cursor.execute("ALTER TABLE orders ADD COLUMN customer_phone VARCHAR(20)")
            print("✅ Added customer_phone column")
        
        if 'payment_method' not in order_columns:
            cursor.execute("ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50)")
            print("✅ Added payment_method column")
        
        if 'payment_screenshot' not in order_columns:
            cursor.execute("ALTER TABLE orders ADD COLUMN payment_screenshot LONGTEXT")
            print("✅ Added payment_screenshot column")
        
        if 'payment_account_number' not in order_columns:
            cursor.execute("ALTER TABLE orders ADD COLUMN payment_account_number VARCHAR(100)")
            print("✅ Added payment_account_number column")
        
        if 'payment_account_name' not in order_columns:
            cursor.execute("ALTER TABLE orders ADD COLUMN payment_account_name VARCHAR(255)")
            print("✅ Added payment_account_name column")
        
        if 'rejection_reason' not in order_columns:
            cursor.execute("ALTER TABLE orders ADD COLUMN rejection_reason TEXT")
            print("✅ Added rejection_reason column")
        
        if 'customer_rating' not in order_columns:
            cursor.execute("ALTER TABLE orders ADD COLUMN customer_rating FLOAT")
            print("✅ Added customer_rating column")
        
        if 'customer_review' not in order_columns:
            cursor.execute("ALTER TABLE orders ADD COLUMN customer_review TEXT")
            print("✅ Added customer_review column")
        
        # Update status enum to include new statuses
        print("\n📋 Updating order status enum...")
        cursor.execute("ALTER TABLE orders MODIFY COLUMN status VARCHAR(50) DEFAULT 'pending'")
        print("✅ Updated status column to support new statuses")
        
        connection.commit()
        print("\n✅ Order system migration completed successfully!")
        print("\nNew features enabled:")
        print("  - Restaurant images and payment methods")
        print("  - Menu items with multiple meal types")
        print("  - Order location tracking (lat/lng)")
        print("  - Payment screenshot upload")
        print("  - Customer ratings and reviews")
        print("  - Enhanced order status tracking")
        
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
    migrate_order_system()
