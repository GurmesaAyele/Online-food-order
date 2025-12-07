# 🎯 Four Separate Dashboards - Access Guide

## ⚠️ IMPORTANT: Each Dashboard is SEPARATE

Each dashboard runs on a **different port** and has **different features**. You MUST access them via their specific URLs.

---

## 🌐 Dashboard URLs & Credentials

### 1. 👤 CUSTOMER DASHBOARD
**Purpose**: Order food, track deliveries  
**URL**: http://localhost:5174  
**Port**: 5174  
**Login**: customer@test.com / password123  
**Color Theme**: Orange (#FF6B35)

**Features**:
- Browse restaurants
- View menus
- Add to cart
- Place orders
- Track deliveries
- Order history

**Status**: ✅ RUNNING

---

### 2. 🍽️ RESTAURANT DASHBOARD
**Purpose**: Manage restaurant, menu, and orders  
**URL**: http://localhost:5175  
**Port**: 5175  
**Login**: restaurant@test.com / password123  
**Color Theme**: Orange/Blue

**Features**:
- Dashboard with stats
- Accept/decline orders
- Update order status
- Menu management (add/edit/delete)
- Sales analytics
- Restaurant profile

**Status**: ✅ RUNNING

---

### 3. 🚴 RIDER DASHBOARD
**Purpose**: Accept deliveries, track earnings  
**URL**: http://localhost:5176  
**Port**: 5176  
**Login**: rider@test.com / password123  
**Color Theme**: Green (#10B981)

**Features**:
- View available orders
- Accept/reject deliveries
- Update delivery status
- Track earnings (daily/weekly/monthly)
- Delivery history
- Performance stats

**Status**: 🔄 NEEDS TO BE STARTED

---

### 4. 👨‍💼 ADMIN DASHBOARD
**Purpose**: Manage entire platform  
**URL**: http://localhost:5177  
**Port**: 5177  
**Login**: admin@foodhub.com / admin123  
**Color Theme**: Purple/Blue

**Features**:
- Platform statistics
- User management (all roles)
- Restaurant verification
- Order monitoring
- Rider management
- Revenue analytics
- System settings

**Status**: 🔄 NEEDS TO BE STARTED

---

## 🚀 How to Access Each Dashboard

### Step 1: Make Sure Backend is Running
```bash
# Check if backend is running at http://localhost:8000
# If not, start it:
cd backend
venv\Scripts\activate
python start.py
```

### Step 2: Access the Correct URL

**CUSTOMER** → http://localhost:5174  
**RESTAURANT** → http://localhost:5175  
**RIDER** → http://localhost:5176  
**ADMIN** → http://localhost:5177  

### Step 3: Use the Correct Credentials

Each dashboard requires its specific role account!

---

## ⚠️ Common Mistakes

### ❌ WRONG: Using same URL for all
- Don't use http://localhost:5174 for everything
- Each dashboard has its own port!

### ❌ WRONG: Using wrong credentials
- Don't use customer credentials on restaurant dashboard
- Each role has its own login!

### ✅ CORRECT: Use specific URL + credentials
- Customer → Port 5174 + customer@test.com
- Restaurant → Port 5175 + restaurant@test.com
- Rider → Port 5176 + rider@test.com
- Admin → Port 5177 + admin@foodhub.com

---

## 🎨 Visual Differences

Each dashboard has unique:
- **Color scheme**
- **Navigation layout**
- **Features**
- **Pages**

### Customer Dashboard
- Navbar at top
- Restaurant cards
- Shopping cart
- Orange theme

### Restaurant Dashboard
- Sidebar navigation
- Order management
- Menu CRUD
- Orange/Blue theme

### Rider Dashboard
- Sidebar navigation
- Delivery cards
- Earnings tracker
- Green theme

### Admin Dashboard
- Sidebar navigation
- User tables
- Analytics charts
- Purple theme

---

## 🔧 Start Missing Dashboards

### Start Rider Dashboard
```bash
cd frontend/rider
npm install
npm run dev
```
Access at: http://localhost:5176

### Start Admin Dashboard
```bash
cd frontend/admin
npm install
npm run dev
```
Access at: http://localhost:5177

---

## 📝 Quick Test

1. Open 4 browser tabs:
   - Tab 1: http://localhost:5174 (Customer - Orange)
   - Tab 2: http://localhost:5175 (Restaurant - Blue)
   - Tab 3: http://localhost:5176 (Rider - Green)
   - Tab 4: http://localhost:5177 (Admin - Purple)

2. Login to each with correct credentials

3. You'll see completely different interfaces!

---

## 🎯 Summary

| Dashboard | Port | URL | Login | Theme |
|-----------|------|-----|-------|-------|
| Customer | 5174 | http://localhost:5174 | customer@test.com | Orange |
| Restaurant | 5175 | http://localhost:5175 | restaurant@test.com | Blue |
| Rider | 5176 | http://localhost:5176 | rider@test.com | Green |
| Admin | 5177 | http://localhost:5177 | admin@foodhub.com | Purple |

**Each dashboard is completely separate with its own files, features, and styling!**
