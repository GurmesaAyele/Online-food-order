# Testing Guide - Food Delivery Platform

## Quick Start

### 1. Start Both Servers

**Backend** (Terminal 1):
```bash
cd backend
venv\Scripts\activate
python start.py
```
Running on: http://localhost:8000

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```
Running on: http://localhost:5173

### 2. Setup Test Users

Run the SQL commands in `backend/add_admin.sql` using phpMyAdmin or MySQL Workbench to create test accounts.

## Test Scenarios

### Scenario 1: Customer Registration & Login

1. Visit http://localhost:5173
2. Click "Sign Up" button in the header
3. Fill out the registration form:
   - Full Name: John Doe
   - Email: john@test.com
   - Phone: 5555555555
   - Password: password123
   - Confirm Password: password123
4. Click "Sign Up"
5. Should automatically login and redirect to Customer Dashboard
6. Verify you see the purple-themed Customer Dashboard
7. Click "Logout" to test logout functionality
8. Click "Login" and login again with the same credentials
9. Should redirect back to Customer Dashboard

### Scenario 2: Restaurant Owner Request

1. Visit http://localhost:5173
2. Click "Login" button
3. At the bottom, click "Restaurant Owner? Request to join"
4. Fill out the restaurant request form:
   - Owner Full Name: Jane Smith
   - Email: jane@restaurant.com
   - Phone: 5555551234
   - Restaurant Name: Jane's Pizza
   - Restaurant Address: 123 Main St
   - Business License: BL123456
   - Additional Info: Italian cuisine, open 10am-10pm
5. Click "Submit Request"
6. Should see success message
7. Request is now pending admin approval

### Scenario 3: Rider Request

1. Visit http://localhost:5173
2. Click "Login" button
3. At the bottom, click "Become a Rider"
4. Fill out the rider request form:
   - Full Name: Mike Johnson
   - Email: mike@rider.com
   - Phone: 5555556789
   - Vehicle Type: Motorcycle
   - Driver's License: DL987654
   - Address: 456 Oak Ave
   - Additional Info: 5 years delivery experience
5. Click "Submit Request"
6. Should see success message
7. Request is now pending admin approval

### Scenario 4: Admin Login & Approval

1. First, run the SQL in `add_admin.sql` to create admin account
2. Visit http://localhost:5173
3. Click "Login"
4. Login with:
   - Email: admin@foodhub.com
   - Password: admin123
5. Should redirect to Admin Dashboard (purple theme with sidebar)
6. Verify you see the admin interface
7. (Future: Will show pending requests here)

### Scenario 5: Test All Dashboards

Using the test accounts from `add_admin.sql`:

**Customer Dashboard:**
- Login: customer@test.com / admin123
- Should see purple gradient theme
- Cards: Browse Restaurants, My Orders, Shopping Cart, My Profile

**Restaurant Dashboard:**
- Login: restaurant@test.com / admin123
- Should see blue theme with left sidebar
- Sections: Dashboard, Menu Items, Orders, Analytics, Settings

**Rider Dashboard:**
- Login: rider@test.com / admin123
- Should see green theme
- Cards: Available Orders, Active Deliveries, Completed Today, Total Earnings

**Admin Dashboard:**
- Login: admin@foodhub.com / admin123
- Should see purple theme with sidebar
- Sections: Dashboard, Users, Restaurants, Riders, Orders, Requests, Settings

## Expected Behaviors

### Role-Based Redirect
- Customer → `/customer-dashboard`
- Restaurant → `/restaurant-dashboard`
- Rider → `/rider-dashboard`
- Admin → `/admin-dashboard`

### Authentication
- Unauthenticated users trying to access dashboards → redirected to `/login`
- After login, users are redirected based on their role
- Logout clears localStorage and redirects to home

### Request Submission
- Restaurant/Rider requests check for duplicate emails
- Success message shows after submission
- Auto-redirect to home after 3 seconds

## API Testing

### Test Registration
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User",
    "phone": "1234567890",
    "role": "customer"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@foodhub.com",
    "password": "admin123"
  }'
```

### Test Restaurant Request
```bash
curl -X POST http://localhost:8000/api/requests/restaurant \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test Restaurant",
    "email": "testrest@example.com",
    "phone": "1234567890",
    "restaurant_name": "Test Pizza",
    "restaurant_address": "123 Test St",
    "business_license": "BL123",
    "additional_info": "Test info"
  }'
```

## Common Issues

### Issue: Backend won't start
- Check if MySQL/WampServer is running
- Verify database `fooddelivery` exists
- Check `.env` file has correct password

### Issue: Frontend shows blank page
- Check browser console for errors
- Verify backend is running on port 8000
- Check if all dependencies are installed

### Issue: Login doesn't work
- Verify test users exist in database
- Check browser console for API errors
- Verify backend is responding at http://localhost:8000

### Issue: Can't access dashboard
- Check localStorage for auth token
- Verify user role matches dashboard route
- Check browser console for redirect errors

## Next Steps

1. ✅ Test customer registration
2. ✅ Test all role-based logins
3. ✅ Test restaurant/rider request submission
4. 🔄 Implement admin approval interface
5. 🔄 Add actual functionality to dashboard cards
6. 🔄 Implement restaurant menu management
7. 🔄 Implement order placement
8. 🔄 Implement delivery tracking

## Notes

- All passwords in test accounts: `admin123`
- JWT tokens expire after 30 minutes
- Database tables are recreated when running `update_database.py`
- Frontend uses localStorage for auth state
