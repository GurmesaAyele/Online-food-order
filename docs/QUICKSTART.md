# 🚀 Quick Start Guide

Get the food delivery platform running in 5 minutes!

## Prerequisites Check

```bash
# Check Python version (need 3.9+)
python --version

# Check Node.js version (need 18+)
node --version

# Check MySQL
mysql --version
```

## Step 1: Database Setup (2 minutes)

```bash
# Start MySQL and create database
mysql -u root -p

# In MySQL prompt:
CREATE DATABASE fooddelivery;
EXIT;
```

## Step 2: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
copy .env.example .env

# Edit .env and update:
# DATABASE_URL=mysql+pymysql://root:YOUR_PASSWORD@localhost:3306/fooddelivery
# SECRET_KEY=your-secret-key-here

# Start backend
uvicorn app.main:app --reload
```

Backend running at: http://localhost:8000

## Step 3: Frontend Setup (1 minute per app)

### Customer App

```bash
# New terminal
cd frontend/customer
npm install
npm run dev
```

Running at: http://localhost:5173

### Restaurant Dashboard

```bash
# New terminal
cd frontend/restaurant
npm install
npm run dev
```

Running at: http://localhost:5174

## Test the Platform

### 1. Create a Customer Account
- Go to http://localhost:5173
- Click "Sign Up"
- Register with email/password
- Role: customer

### 2. Create a Restaurant Account
- Go to http://localhost:5174
- Register a restaurant account
- Role: restaurant

### 3. Test the Flow
1. **Restaurant**: Login and add menu items
2. **Customer**: Browse restaurants and add items to cart
3. **Customer**: Place an order
4. **Restaurant**: Accept and update order status
5. **Customer**: Track order in real-time

## Default Test Accounts

If you run the database init script:

```
Admin: admin@foodhub.com / password123
Restaurant: restaurant@test.com / password123
Customer: customer@test.com / password123
Rider: rider@test.com / password123
```

## API Documentation

Once backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Common Issues

### Port Already in Use
```bash
# Change port in vite.config.js or uvicorn command
```

### Database Connection Error
```bash
# Verify MySQL is running
# Check DATABASE_URL in .env
# Ensure database exists
```

### Module Not Found
```bash
# Backend: Make sure venv is activated
# Frontend: Run npm install again
```

## Next Steps

1. ✅ Explore the API documentation
2. ✅ Customize the styling in TailwindCSS
3. ✅ Add your payment gateway keys
4. ✅ Configure Google Maps API
5. ✅ Set up email service
6. ✅ Deploy to production

## Development Tips

### Hot Reload
- Backend: Automatically reloads on file changes
- Frontend: Vite HMR for instant updates

### Debugging
- Backend: Check terminal for FastAPI logs
- Frontend: Use browser DevTools console
- Database: Check MySQL logs

### Code Structure
```
backend/app/
  ├── api/v1/        # API routes
  ├── models/        # Database models
  ├── schemas/       # Pydantic schemas
  └── core/          # Config & security

frontend/*/src/
  ├── pages/         # Route components
  ├── components/    # Reusable components
  ├── store/         # State management
  └── api/           # API client
```

## Support

- Check ARCHITECTURE.md for system design
- Check FEATURES.md for feature list
- Check SETUP.md for detailed setup
- API docs at /docs endpoint

Happy coding! 🎉
