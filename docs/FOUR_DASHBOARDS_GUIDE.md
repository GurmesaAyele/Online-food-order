# 🎯 Complete Guide: Four Dashboards System

## Overview

This food delivery platform features **FOUR complete dashboards**, each with role-based authentication and specific features:

1. **Customer Dashboard** - Order food and track deliveries
2. **Restaurant Dashboard** - Manage menu and orders
3. **Rider Dashboard** - Accept and deliver orders
4. **Admin Dashboard** - Manage entire platform

---

## 🚀 Quick Start - All Dashboards

### Option 1: Start All at Once
```bash
start_all_dashboards.bat
```

### Option 2: Start Individually

**Backend (Required for all)**
```bash
cd backend
venv\Scripts\activate
python start.py
```

**Customer Dashboard**
```bash
cd frontend/customer
npm run dev
# Opens at: http://localhost:5174
```

**Restaurant Dashboard**
```bash
cd frontend/restaurant
npm run dev
# Opens at: http://localhost:5175
```

**Rider Dashboard**
```bash
cd frontend/rider
npm install  # First time only
npm run dev
# Opens at: http://localhost:5176
```

**Admin Dashboard**
```bash
cd frontend/admin
npm install  # First time only
npm run dev
# Opens at: http://localhost:5177
```

---

## 1️⃣ Customer Dashboard

### 🌐 URL: http://localhost:5174
### 👤 Role: `customer`

### Features:
✅ **Authentication**
- Email/password registration
- Secure login with JWT
- Profile management

✅ **Restaurant Discovery**
- Browse all restaurants
- Search by name
- Filter by cuisine type
- View ratings and reviews
- See delivery time and fees

✅ **Menu & Ordering**
- View restaurant menus
- Add items to cart
- Adjust quantities
- Apply promo codes
- Multiple payment methods (Stripe, COD, Mobile Money)

✅ **Order Management**
- Place orders
- View order history
- Track order status in real-time
- Estimated delivery time
- Order details

✅ **Delivery Tracking**
- Real-time order status updates
- Visual progress indicator
- Delivery address management

### How to Use:
1. Go to http://localhost:5174
2. Click "Sign Up"
3. Create account with role: `customer`
4. Browse restaurants
5. Add items to cart
6. Checkout and place order
7. Track your order!

---

## 2️⃣ Restaurant Dashboard

### 🌐 URL: http://localhost:5175
### 🍽️ Role: `restaurant`

### Features:
✅ **Dashboard Overview**
- Today's orders count
- Today's revenue
- Pending orders
- Average preparation time

✅ **Order Management**
- View incoming orders
- Accept/decline orders
- Update order status:
  - Confirmed
  - Preparing
  - Ready for pickup
- Order details view
- Customer information

✅ **Menu Management**
- Add new menu items
- Edit existing items
- Delete items
- Set availability status
- Categorize items
- Set prices
- Add descriptions

✅ **Analytics**
- Sales reports
- Popular items
- Revenue trends
- Performance metrics

✅ **Profile Management**
- Restaurant information
- Contact details
- Operating hours
- Delivery settings

### How to Use:
1. Register via API (http://localhost:8000/docs)
   ```json
   {
     "email": "restaurant@test.com",
     "password": "password123",
     "full_name": "My Restaurant",
     "phone": "1234567890",
     "role": "restaurant"
   }
   ```
2. Go to http://localhost:5175
3. Login with credentials
4. Add menu items
5. Accept and manage orders!

---

## 3️⃣ Rider/Driver Dashboard

### 🌐 URL: http://localhost:5176
### 🚴 Role: `rider`

### Features:
✅ **Dashboard Overview**
- Today's deliveries count
- Today's earnings
- Active deliveries
- Average delivery time

✅ **Available Orders**
- View ready-for-pickup orders
- See delivery addresses
- Estimated delivery time
- Delivery fee information
- Accept/reject orders

✅ **My Deliveries**
- Active delivery list
- Pickup location
- Delivery address
- Navigation integration
- Update delivery status:
  - Picked up
  - Delivering
  - Delivered

✅ **Earnings Tracker**
- Daily earnings
- Weekly earnings
- Monthly earnings
- Total deliveries
- Average per delivery
- Transaction history

✅ **Profile & Performance**
- Personal information
- Vehicle details
- License information
- Performance stats:
  - Total deliveries
  - Rating
  - On-time rate
  - Total earnings
- Availability toggle

### How to Use:
1. Register via API (http://localhost:8000/docs)
   ```json
   {
     "email": "rider@test.com",
     "password": "password123",
     "full_name": "John Rider",
     "phone": "1234567890",
     "role": "rider"
   }
   ```
2. Go to http://localhost:5176
3. Login with credentials
4. Browse available orders
5. Accept deliveries
6. Update status
7. Track earnings!

---

## 4️⃣ Admin Dashboard

### 🌐 URL: http://localhost:5177
### 👨‍💼 Role: `admin`

### Features:
✅ **Platform Overview**
- Total users (all roles)
- Total restaurants
- Total orders
- Total revenue
- Real-time metrics

✅ **User Management**
- View all users
- Filter by role (customer, restaurant, rider)
- User details
- Activate/deactivate accounts
- User activity logs

✅ **Restaurant Management**
- View all restaurants
- Verify new restaurants
- Approve/reject applications
- Manage restaurant status
- Commission settings
- Performance monitoring

✅ **Order Monitoring**
- View all platform orders
- Order status tracking
- Dispute resolution
- Refund management
- Order analytics

✅ **Rider Management**
- View all riders
- Verify rider documents
- Approve/reject applications
- Monitor performance
- Delivery efficiency metrics

✅ **Platform Analytics**
- Revenue reports
- User growth metrics
- Restaurant performance
- Rider efficiency
- Order trends
- Popular cuisines
- Peak hours analysis

✅ **System Settings**
- Platform configuration
- Payment gateway settings
- Notification settings
- Promotion management
- Banner management
- Commission rates
- Delivery fees

### How to Use:
1. Register via API (http://localhost:8000/docs)
   ```json
   {
     "email": "admin@foodhub.com",
     "password": "admin123",
     "full_name": "Admin User",
     "phone": "1234567890",
     "role": "admin"
   }
   ```
2. Go to http://localhost:5177
3. Login with credentials
4. Access all platform features!

---

## 🔐 Authentication & Security

### Role-Based Access Control (RBAC)
Each dashboard enforces strict role checking:
- **Customer** → Can only access customer features
- **Restaurant** → Can only access restaurant features
- **Rider** → Can only access rider features
- **Admin** → Can access all platform features

### JWT Authentication
- Secure token-based authentication
- Tokens stored in localStorage
- Auto-logout on token expiration
- Protected routes

### Password Security
- Bcrypt hashing
- Minimum password requirements
- Secure password reset (ready to implement)

---

## 📊 Complete User Flow Example

### Scenario: Complete Order Lifecycle

1. **Customer** (Port 5174)
   - Registers and logs in
   - Browses restaurants
   - Adds pizza to cart
   - Places order
   - Pays via COD

2. **Restaurant** (Port 5175)
   - Receives order notification
   - Accepts order
   - Updates status to "Preparing"
   - Updates status to "Ready"

3. **Rider** (Port 5176)
   - Sees order in "Available Orders"
   - Accepts delivery
   - Picks up from restaurant
   - Updates status to "Delivering"
   - Delivers to customer
   - Updates status to "Delivered"

4. **Admin** (Port 5177)
   - Monitors entire process
   - Views order in dashboard
   - Tracks revenue
   - Reviews performance metrics

5. **Customer** (Port 5174)
   - Receives delivery
   - Rates restaurant and rider
   - Views order in history

---

## 🎨 Dashboard Color Schemes

- **Customer**: Orange/Red (#FF6B35) - Warm, inviting
- **Restaurant**: Orange/Blue (#FF6B35, #004E89) - Professional
- **Rider**: Green (#10B981) - Active, go
- **Admin**: Purple/Blue (#8B5CF6, #3B82F6) - Authority

---

## 📱 Responsive Design

All dashboards are fully responsive:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (375px+)

---

## 🔧 Tech Stack

### Frontend (All Dashboards)
- React 18
- Vite (Build tool)
- TailwindCSS (Styling)
- Zustand (State management)
- React Router (Routing)
- Axios (HTTP client)
- React Hot Toast (Notifications)
- Lucide React (Icons)

### Backend (Shared)
- FastAPI
- SQLAlchemy ORM
- MySQL Database
- JWT Authentication
- WebSockets
- Pydantic validation

---

## 🚀 Deployment

### Production URLs (Example)
- Customer: https://app.foodhub.com
- Restaurant: https://restaurant.foodhub.com
- Rider: https://rider.foodhub.com
- Admin: https://admin.foodhub.com
- API: https://api.foodhub.com

### Build Commands
```bash
# Customer
cd frontend/customer && npm run build

# Restaurant
cd frontend/restaurant && npm run build

# Rider
cd frontend/rider && npm run build

# Admin
cd frontend/admin && npm run build
```

---

## 📞 Support & Documentation

- **API Docs**: http://localhost:8000/docs
- **Project Structure**: docs/PROJECT_STRUCTURE.md
- **Features List**: docs/FEATURES.md
- **Architecture**: docs/ARCHITECTURE.md
- **Quick Start**: docs/QUICKSTART.md

---

## 🎯 Testing Credentials

Create these accounts for testing:

```json
// Customer
{
  "email": "customer@test.com",
  "password": "password123",
  "role": "customer"
}

// Restaurant
{
  "email": "restaurant@test.com",
  "password": "password123",
  "role": "restaurant"
}

// Rider
{
  "email": "rider@test.com",
  "password": "password123",
  "role": "rider"
}

// Admin
{
  "email": "admin@test.com",
  "password": "password123",
  "role": "admin"
}
```

---

**All four dashboards are production-ready and fully functional! 🎉**
