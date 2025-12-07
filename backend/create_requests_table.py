from app.core.database import engine, Base
from app.models.request import AccessRequest
from app.models.user import User
from app.models.restaurant import Restaurant
from app.models.rider import Rider
from app.models.order import Order
from app.models.promotion import Promotion

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ Access requests table created successfully!")
print("✅ All database tables are up to date!")
