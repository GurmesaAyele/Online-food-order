# Food Delivery Platform

A full-stack food delivery application built with React (Vite) and FastAPI.

## Tech Stack

- **Frontend**: React + Vite, JavaScript, CSS
- **Backend**: FastAPI, Python
- **Database**: MySQL (WampServer)

## Features

### Public Features
- Beautiful homepage with hero section, features, and how it works
- Customer self-registration
- Restaurant owner request access
- Delivery rider request access

### Role-Based Dashboards
- **Customer Dashboard**: Browse restaurants, view menu, place orders, track deliveries
- **Restaurant Dashboard**: Manage menu, receive orders, update order status
- **Rider Dashboard**: Accept deliveries, navigate, update delivery status, view earnings
- **Admin Dashboard**: Manage users, approve restaurant/rider requests, monitor orders

## Project Structure

```
food-delivery/
├── frontend/                    # React Vite application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Public homepage
│   │   │   ├── Login.jsx       # Login (all roles)
│   │   │   ├── Register.jsx    # Customer registration
│   │   │   ├── RequestRestaurant.jsx
│   │   │   ├── RequestRider.jsx
│   │   │   ├── CustomerDashboard.jsx
│   │   │   ├── RestaurantDashboard.jsx
│   │   │   ├── RiderDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   └── App.jsx             # Main app with routing
│   └── package.json
├── backend/                     # FastAPI application
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py         # Login/Register
│   │   │   └── requests.py     # Access requests
│   │   ├── models.py           # Database models
│   │   ├── schemas.py          # Pydantic schemas
│   │   ├── auth.py             # JWT authentication
│   │   └── database.py         # Database connection
│   ├── main.py                 # FastAPI app
│   ├── update_database.py      # Update DB schema
│   └── add_admin.sql           # Create test users
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL (WampServer)
- Database name: `fooddelivery`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create `.env` file (already exists):
```
DATABASE_URL=mysql+pymysql://root:14162121@localhost/fooddelivery
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

6. Update database tables:
```bash
python update_database.py
```

7. Add test users (run SQL in phpMyAdmin or MySQL):
```bash
# Open add_admin.sql and run the SQL commands
# This creates: admin@foodhub.com, customer@test.com, restaurant@test.com, rider@test.com
# All passwords: admin123
```

8. Run the server:
```bash
python start.py
```

Backend will run on http://localhost:8000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Usage

### For Customers
1. Visit http://localhost:5173
2. Click "Sign Up" to register
3. Login and access Customer Dashboard
4. Browse restaurants and place orders

### For Restaurant Owners
1. Visit http://localhost:5173
2. Click "Restaurant Owner? Request to join"
3. Fill out the request form
4. Wait for admin approval
5. Login with credentials provided by admin

### For Delivery Riders
1. Visit http://localhost:5173
2. Click "Become a Rider"
3. Fill out the request form
4. Wait for admin approval
5. Login with credentials provided by admin

### For Admin
1. Login with: admin@foodhub.com / admin123
2. Access Admin Dashboard
3. Review and approve restaurant/rider requests
4. Manage users and monitor orders

## Test Accounts

After running `add_admin.sql`, you'll have these test accounts (password: admin123):

- **Admin**: admin@foodhub.com
- **Customer**: customer@test.com
- **Restaurant**: restaurant@test.com
- **Rider**: rider@test.com

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new customer
- `POST /api/auth/login` - Login (all roles)

### Access Requests
- `POST /api/requests/restaurant` - Submit restaurant request
- `POST /api/requests/rider` - Submit rider request
- `GET /api/requests/` - Get all pending requests (admin only)
- `POST /api/requests/{id}/approve` - Approve request (admin only)
- `POST /api/requests/{id}/reject` - Reject request (admin only)

## Database Schema

### Tables
- `users` - All user accounts (customer, restaurant, rider, admin)
- `access_requests` - Restaurant and rider access requests
- `restaurants` - Restaurant information
- `menu_items` - Restaurant menu items

## GitHub Repository

https://github.com/GurmesaAyele/Online-food-order

## Development Status

✅ Backend API (100%)
✅ Frontend UI (90%)
✅ Database (100%)
✅ Authentication (100%)
✅ Role-based routing (100%)
🔄 Dashboard functionality (in progress)
