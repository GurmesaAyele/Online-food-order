from app.database import engine
from app.models import Base
import sys

def migrate_database():
    """Create all tables including new restaurant and rider tables"""
    try:
        print("Starting database migration...")
        print("Creating all tables from models...")
        
        # This will create all tables defined in models.py
        Base.metadata.create_all(bind=engine)
        
        print("\n✅ Database migration completed successfully!")
        print("All tables have been created or updated.")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    migrate_database()
