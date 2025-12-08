from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth, users, requests

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

@app.get("/")
def read_root():
    return {"message": "Food Delivery API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
