# 📁 Food Delivery Platform - Complete Project Structure

```
food-delivery-platform/
│
├── 📂 frontend/                    # All frontend applications
│   │
│   ├── 📂 customer/                # Customer Web App (Port 5174)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Home.jsx        # Landing page
│   │   │   │   ├── Login.jsx       # Customer login
│   │   │   │   ├── Register.jsx    # Customer registration
│   │   │   │   ├── Restaurants.jsx # Browse restaurants
│   │   │   │   ├── RestaurantDetail.jsx # Menu view
│   │   │   │   ├── Cart.jsx        # Shopping cart
│   │   │   │   ├── Checkout.jsx    # Order checkout
│   │   │   │   ├── Orders.jsx      # Order history
│   │   │   │   ├── OrderTracking.jsx # Live tracking
│   │   │   │   └── Profile.jsx     # User profile
│   │   │   ├── components/
│   │   │   │   └── Navbar.jsx      # Navigation bar
│   │   │   ├── store/
│   │   │   │   ├── authStore.js    # Auth state
│   │   │   │   └── cartStore.js    # Cart state
│   │   │   ├── api/
│   │   │   │   └── axios.js        # API client
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   └── index.css
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   └── postcss.config.js
│   │
│   ├── 📂 restaurant/              # Restaurant Dashboard (Port 5175)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx       # Restaurant login
│   │   │   │   ├── Dashboard.jsx   # Overview stats
│   │   │   │   ├── Orders.jsx      # Manage orders
│   │   │   │   ├── Menu.jsx        # Menu management
│   │   │   │   ├── Analytics.jsx   # Sales analytics
│   │   │   │   └── Profile.jsx     # Restaurant profile
│   │   │   ├── components/
│   │   │   │   └── Sidebar.jsx     # Navigation sidebar
│   │   │   ├── store/
│   │   │   │   └── authStore.js
│   │   │   ├── api/
│   │   │   │   └── axios.js
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   └── index.css
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   └── postcss.config.js
│   │
│   ├── 📂 rider/                   # Rider/Driver Dashboard (Port 5176)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx       # Rider login
│   │   │   │   ├── Dashboard.jsx   # Overview
│   │   │   │   ├── AvailableOrders.jsx # Available deliveries
│   │   │   │   ├── MyDeliveries.jsx # Active deliveries
│   │   │   │   ├── Earnings.jsx    # Earnings tracker
│   │   │   │   └── Profile.jsx     # Rider profile
│   │   │   ├── components/
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── store/
│   │   │   │   └── authStore.js
│   │   │   ├── api/
│   │   │   │   └── axios.js
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   └── index.css
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── tailwind.config.js
│   │   └── postcss.config.js
│   │
│   └── 📂 admin/                   # Admin Panel (Port 5177)
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Login.jsx       # Admin login
│       │   │   ├── Dashboard.jsx   # Platform overview
│       │   │   ├── Users.jsx       # User management
│       │   │   ├── Restaurants.jsx # Restaurant management
│       │   │   ├── Orders.jsx      # Order monitoring
│       │   │   ├── Riders.jsx      # Rider management
│       │   │   ├── Analytics.jsx   # Platform analytics
│       │   │   └── Settings.jsx    # System settings
│       │   ├── components/
│       │   │   └── Sidebar.jsx
│       │   ├── store/
│       │   │   └── authStore.js
│       │   ├── api/
│       │   │   └── axios.js
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       ├── index.html
│       ├── package.json
│       ├── vite.config.js
│       ├── tailwind.config.js
│       └── postcss.config.js
│
├── 📂 backend/                     # FastAPI Backend (Port 8000)
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── auth.py         # Authentication endpoints
│   │   │   │   ├── restaurants.py  # Restaurant endpoints
│   │   │   │   ├── orders.py       # Order endpoints
│   │   │   │   ├── riders.py       # Rider endpoints
│   │   │   │   ├── admin.py        # Admin endpoints
│   │   │   │   └── websocket.py    # WebSocket connections
│   │   │   └── dependencies.py     # Auth dependencies
│   │   ├── models/
│   │   │   ├── user.py             # User model
│   │   │   ├── restaurant.py       # Restaurant & MenuItem models
│   │   │   ├── order.py            # Order & Review models
│   │   │   ├── rider.py            # Rider model
│   │   │   └── promotion.py        # Promotion model
│   │   ├── schemas/
│   │   │   ├── user.py             # User schemas
│   │   │   ├── restaurant.py       # Restaurant schemas
│   │   │   └── order.py            # Order schemas
│   │   ├── core/
│   │   │   ├── config.py           # Configuration
│   │   │   ├── security.py         # JWT & password hashing
│   │   │   └── database.py         # Database connection
│   │   └── main.py                 # FastAPI application
│   ├── venv/                       # Virtual environment
│   ├── requirements.txt            # Python dependencies
│   ├── requirements-minimal.txt
│   ├── start.py                    # Server startup script
│   ├── test_db.py                  # Database test script
│   ├── .env                        # Environment variables
│   └── .env.example                # Environment template
│
├── 📂 docs/                        # Documentation
│   ├── README.md                   # Main documentation
│   ├── QUICKSTART.md               # 5-minute setup guide
│   ├── SETUP.md                    # Detailed setup
│   ├── ARCHITECTURE.md             # System architecture
│   ├── FEATURES.md                 # Feature list
│   ├── PROJECT_SUMMARY.md          # Project overview
│   ├── RUNNING_NOW.md              # Current status guide
│   ├── START_HERE.md               # Getting started
│   ├── PROJECT_STRUCTURE.md        # This file
│   └── API_DOCUMENTATION.md        # API reference
│
├── 📂 database/                    # Database scripts
│   ├── init.sql                    # Database initialization
│   └── create_db.sql               # Database creation
│
├── 📄 start_backend.bat            # Backend startup script
├── 📄 start_customer_app.bat       # Customer app startup
├── 📄 start_restaurant_app.bat     # Restaurant app startup
├── 📄 start_rider_app.bat          # Rider app startup
├── 📄 start_admin_app.bat          # Admin app startup
├── 📄 check_setup.bat              # Setup verification
├── 📄 create_database.sql          # DB creation script
└── 📄 setup_wamp.md                # WampServer setup

```

## 🎯 Four Complete Dashboards

### 1. Customer Dashboard (Port 5174)
**Role**: `customer`
**Features**:
- Browse and search restaurants
- View menus and add to cart
- Place orders with multiple payment options
- Track orders in real-time
- View order history
- Rate restaurants and riders
- Manage profile and addresses

### 2. Restaurant Dashboard (Port 5175)
**Role**: `restaurant`
**Features**:
- View dashboard with daily stats
- Manage incoming orders (accept/decline)
- Update order status (preparing, ready)
- Full menu management (CRUD)
- View sales analytics
- Manage restaurant profile
- Set operating hours
- Create promotions

### 3. Rider/Driver Dashboard (Port 5176)
**Role**: `rider`
**Features**:
- View available delivery orders
- Accept/reject delivery assignments
- Update delivery status
- Navigate to pickup/delivery locations
- Track earnings (daily/weekly/monthly)
- View delivery history
- Update availability status
- Manage vehicle information

### 4. Admin Dashboard (Port 5177)
**Role**: `admin`
**Features**:
- Platform-wide statistics
- User management (all roles)
- Restaurant verification and approval
- Order monitoring and dispute resolution
- Rider management and verification
- Platform analytics and reports
- System settings and configuration
- Promotion management
- Revenue tracking

## 🔐 Authentication & Authorization

Each dashboard has:
- **Separate login page**
- **Role-based access control**
- **JWT token authentication**
- **Protected routes**
- **Persistent sessions**

## 🚀 Running All Dashboards

```bash
# Backend (Required for all)
cd backend
venv\Scripts\activate
python start.py

# Customer App
cd frontend/customer
npm run dev

# Restaurant Dashboard
cd frontend/restaurant
npm run dev

# Rider Dashboard
cd frontend/rider
npm run dev

# Admin Panel
cd frontend/admin
npm run dev
```

## 📊 Database Tables

- **users** - All user accounts (multi-role)
- **restaurants** - Restaurant profiles
- **menu_items** - Menu items
- **orders** - Order records
- **riders** - Rider profiles
- **reviews** - Ratings and reviews
- **promotions** - Discount codes

## 🎨 Tech Stack

**Frontend**: React 18 + Vite + TailwindCSS + Zustand
**Backend**: FastAPI + SQLAlchemy + MySQL
**Real-time**: WebSockets
**Auth**: JWT tokens
**State**: Zustand (persistent)
