# 🍕 Food Delivery Platform - Complete System

A modern, full-stack food delivery platform with **four complete dashboards**, real-time tracking, and role-based authentication.

## 🎯 Four Dashboards

| Dashboard | Port | Role | Status |
|-----------|------|------|--------|
| **Customer** | 5174 | `customer` | ✅ Complete |
| **Restaurant** | 5175 | `restaurant` | ✅ Complete |
| **Rider** | 5176 | `rider` | ✅ Complete |
| **Admin** | 5177 | `admin` | 🔄 Ready |

## 🚀 Quick Start

### 1. Start Backend
```bash
cd backend
venv\Scripts\activate
python start.py
```
**Backend running at**: http://localhost:8000

### 2. Start All Dashboards
```bash
start_all_dashboards.bat
```

Or start individually:
```bash
# Customer
cd frontend/customer && npm run dev

# Restaurant
cd frontend/restaurant && npm run dev

# Rider
cd frontend/rider && npm install && npm run dev

# Admin
cd frontend/admin && npm install && npm run dev
```

## 📁 Project Structure

```
food-delivery-platform/
├── frontend/
│   ├── customer/      # Customer web app
│   ├── restaurant/    # Restaurant dashboard
│   ├── rider/         # Rider dashboard
│   └── admin/         # Admin panel
├── backend/           # FastAPI backend
├── docs/              # Documentation
└── database/          # SQL scripts
```

## 🔐 User Roles & Features

### 👤 Customer (Port 5174)
- Browse restaurants
- Order food
- Track deliveries
- Payment options
- Order history

### 🍽️ Restaurant (Port 5175)
- Manage menu
- Accept orders
- Update status
- View analytics
- Track revenue

### 🚴 Rider (Port 5176)
- Available orders
- Accept deliveries
- Update status
- Track earnings
- Performance stats

### 👨‍💼 Admin (Port 5177)
- User management
- Restaurant verification
- Order monitoring
- Platform analytics
- System settings

## 🛠️ Tech Stack

**Frontend**: React 18 + Vite + TailwindCSS + Zustand  
**Backend**: FastAPI + SQLAlchemy + MySQL  
**Auth**: JWT tokens  
**Real-time**: WebSockets  

## 📚 Documentation

- [Four Dashboards Guide](docs/FOUR_DASHBOARDS_GUIDE.md)
- [Complete System Overview](docs/COMPLETE_SYSTEM_OVERVIEW.md)
- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Quick Start Guide](docs/QUICKSTART.md)
- [Features List](docs/FEATURES.md)
- [Architecture](docs/ARCHITECTURE.md)

## 🎯 Create Test Accounts

Use API docs at http://localhost:8000/docs

**Customer**:
```json
{
  "email": "customer@test.com",
  "password": "password123",
  "full_name": "Test Customer",
  "phone": "1234567890",
  "role": "customer"
}
```

**Restaurant**:
```json
{
  "email": "restaurant@test.com",
  "password": "password123",
  "full_name": "Test Restaurant",
  "phone": "1234567890",
  "role": "restaurant"
}
```

**Rider**:
```json
{
  "email": "rider@test.com",
  "password": "password123",
  "full_name": "Test Rider",
  "phone": "1234567890",
  "role": "rider"
}
```

**Admin**:
```json
{
  "email": "admin@test.com",
  "password": "password123",
  "full_name": "Admin User",
  "phone": "1234567890",
  "role": "admin"
}
```

## ✅ What's Included

- ✅ Complete authentication system
- ✅ Role-based access control
- ✅ Real-time order tracking
- ✅ Shopping cart with persistence
- ✅ Menu management (CRUD)
- ✅ Order management
- ✅ Earnings tracking
- ✅ Platform analytics
- ✅ Responsive design
- ✅ Beautiful UI with TailwindCSS

## 🔧 Requirements

- Python 3.9+
- Node.js 18+
- MySQL (WampServer)
- npm/yarn

## 📊 Database

MySQL database with tables:
- users (multi-role)
- restaurants
- menu_items
- orders
- riders
- reviews
- promotions

## 🌐 Access Points

| Service | URL |
|---------|-----|
| Backend API | http://localhost:8000 |
| API Documentation | http://localhost:8000/docs |
| Customer App | http://localhost:5174 |
| Restaurant Dashboard | http://localhost:5175 |
| Rider Dashboard | http://localhost:5176 |
| Admin Panel | http://localhost:5177 |

## 🎉 Features

### Customer Features
- Restaurant discovery with search/filters
- Menu browsing
- Shopping cart
- Multiple payment methods
- Real-time order tracking
- Order history
- Rating system

### Restaurant Features
- Dashboard with statistics
- Order management (accept/decline/update)
- Complete menu management
- Sales analytics
- Profile management

### Rider Features
- Available orders browsing
- Accept/reject deliveries
- Delivery status updates
- Earnings tracker (daily/weekly/monthly)
- Performance statistics
- Vehicle information

### Admin Features
- Platform-wide statistics
- User management (all roles)
- Restaurant verification
- Order monitoring
- Rider management
- Revenue analytics
- System configuration

## 🚀 Production Ready

This platform is production-ready with:
- Secure authentication
- Input validation
- Error handling
- Responsive design
- Optimized performance
- Clean architecture
- Comprehensive documentation

## 📝 License

This project is for educational and portfolio purposes.

---

**Built with ❤️ using React, FastAPI, and MySQL**
