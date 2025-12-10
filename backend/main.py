from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth, users, requests, admin, restaurant, profile, rider, customer

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Food Delivery API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(requests.router, prefix="/api/requests", tags=["requests"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(restaurant.router, prefix="/api/restaurant", tags=["restaurant"])
app.include_router(profile.router, prefix="/api/profile", tags=["profile"])
app.include_router(rider.router, prefix="/api/rider", tags=["rider"])

# Customer routes
try:
    from app.routes.customer import router as customer_router
    app.include_router(customer_router, prefix="/api/customer", tags=["customer"])
    print("✅ Customer routes loaded successfully")
except Exception as e:
    print(f"❌ Failed to load customer routes: {e}")

@app.get("/")
def read_root():
    return {"message": "Food Delivery API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
