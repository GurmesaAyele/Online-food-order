from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1 import auth, restaurants, orders, riders, admin, websocket, requests
import os

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(restaurants.router, prefix=f"{settings.API_V1_STR}/restaurants", tags=["restaurants"])
app.include_router(orders.router, prefix=f"{settings.API_V1_STR}/orders", tags=["orders"])
app.include_router(riders.router, prefix=f"{settings.API_V1_STR}/riders", tags=["riders"])
app.include_router(admin.router, prefix=f"{settings.API_V1_STR}/admin", tags=["admin"])
app.include_router(requests.router, prefix=f"{settings.API_V1_STR}/requests", tags=["requests"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])

@app.get("/")
def root():
    return {"message": "Food Delivery Platform API", "version": settings.VERSION}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
