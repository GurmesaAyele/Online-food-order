# Food Delivery Platform

A simple food delivery platform built with React (Vite) + FastAPI + MySQL.

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- Pure CSS (no frameworks)

### Backend
- FastAPI
- MySQL
- SQLAlchemy
- JWT Authentication
- Bcrypt

## Project Structure

```
├── frontend/              # React frontend
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   └── package.json
│
└── backend/              # FastAPI backend
    ├── app/
    │   ├── routes/       # API routes
    │   ├── models.py     # Database models
    │   ├── schemas.py    # Pydantic schemas
    │   ├── auth.py       # Authentication
    │   └── database.py   # Database connection
    ├── main.py           # FastAPI app
    └── requirements.txt
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MySQL (via WampServer)
- MySQL password: `14162121`

### 1. Database Setup

Create database in MySQL:
```sql
CREATE DATABASE food_delivery;
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Start server
python start.py
```

Backend will run on: http://localhost:8000

### 3. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user info (protected)

## Environment Variables

Backend `.env` file:
```
DATABASE_URL=mysql+pymysql://root:14162121@localhost/food_delivery
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Features

- ✅ User authentication (register/login)
- ✅ JWT token-based auth
- ✅ Role-based access (customer, restaurant, rider, admin)
- ✅ MySQL database
- ✅ Clean React + CSS frontend
- ✅ FastAPI backend with auto-docs

## API Documentation

Once backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Default User Roles

- `customer` - Regular users who order food
- `restaurant` - Restaurant owners
- `rider` - Delivery riders
- `admin` - Platform administrators
