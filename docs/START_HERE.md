# 🚀 START HERE - Quick Launch Guide

## Prerequisites Check ✅
- ✅ Python 3.12 - Installed
- ✅ Node.js 22 - Installed  
- ✅ WampServer - You have it!

## Step-by-Step Launch

### 1️⃣ Setup Database (2 minutes)

**Option A: Using phpMyAdmin (Easiest)**
1. Start WampServer (make sure icon is GREEN)
2. Open browser: http://localhost/phpmyadmin
3. Click "New" in left sidebar
4. Database name: `fooddelivery`
5. Click "Create"

**Option B: Using SQL**
1. Go to http://localhost/phpmyadmin
2. Click "SQL" tab
3. Paste and run:
```sql
CREATE DATABASE fooddelivery;
```

### 2️⃣ Start Backend (Double-click this file)
```
start_backend.bat
```

This will:
- Activate Python virtual environment
- Install required packages
- Start FastAPI server on http://localhost:8000

**Wait for**: "Application startup complete"

### 3️⃣ Start Customer App (Double-click this file)
```
start_customer_app.bat
```

This will:
- Install npm packages (first time only)
- Start React app on http://localhost:5173

### 4️⃣ Start Restaurant Dashboard (Optional - Double-click this file)
```
start_restaurant_app.bat
```

This will start on http://localhost:5174

## 🎉 You're Ready!

### Access the Apps:
- **Customer App**: http://localhost:5173
- **Restaurant Dashboard**: http://localhost:5174
- **API Documentation**: http://localhost:8000/docs

### First Steps:
1. Go to Customer App (http://localhost:5173)
2. Click "Sign Up"
3. Create an account
4. Start exploring!

### Create Restaurant Account:
1. Go to Restaurant Dashboard (http://localhost:5174)
2. Register with role: "restaurant"
3. Add menu items
4. Accept orders!

## 🐛 Troubleshooting

### Backend won't start?
- Make sure WampServer is running (green icon)
- Check database exists in phpMyAdmin
- Verify .env file exists in backend folder

### Frontend won't start?
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` folder and run `npm install` again

### Port already in use?
- Backend: Change port in start_backend.bat (--port 8001)
- Frontend: Change port in vite.config.js

## 📚 Next Steps

Once everything is running:
1. ✅ Create a customer account
2. ✅ Create a restaurant account  
3. ✅ Add menu items (restaurant dashboard)
4. ✅ Place an order (customer app)
5. ✅ Accept order (restaurant dashboard)
6. ✅ Track order status

## 🆘 Need Help?

Check these files:
- `QUICKSTART.md` - Detailed setup
- `SETUP.md` - Full installation guide
- `ARCHITECTURE.md` - System design
- `FEATURES.md` - What's included

## 🎯 Quick Commands

### Backend
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

### Customer App
```bash
cd frontend/customer
npm run dev
```

### Restaurant App
```bash
cd frontend/restaurant
npm run dev
```

Happy coding! 🚀
