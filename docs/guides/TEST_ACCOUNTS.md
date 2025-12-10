# Test Accounts - Food Delivery Platform

## 🔐 Default Login Credentials

All test accounts use the same password: **admin123**

### Admin Account
- **Email:** `admin@foodhub.com`
- **Password:** `admin123`
- **Role:** Admin
- **Redirects to:** `/admin-dashboard`
- **Access:** Full platform management, approve requests, manage users

### Restaurant Account
- **Email:** `restaurant@test.com`
- **Password:** `admin123`
- **Role:** Restaurant
- **Redirects to:** `/restaurant-dashboard`
- **Access:** Manage menu, receive orders, update order status

### Rider Account
- **Email:** `rider@test.com`
- **Password:** `admin123`
- **Role:** Rider
- **Redirects to:** `/rider-dashboard`
- **Access:** Accept deliveries, update delivery status, view earnings

### Customer Account
- **Email:** `customer@test.com`
- **Password:** `admin123`
- **Role:** Customer
- **Redirects to:** `/customer-dashboard`
- **Access:** Browse restaurants, place orders, track deliveries

## 📋 How to Create Test Accounts

### Option 1: Run SQL Script (Recommended)
1. Open phpMyAdmin or MySQL Workbench
2. Select the `fooddelivery` database
3. Open the file `backend/add_admin.sql`
4. Run all SQL commands
5. All 4 test accounts will be created

### Option 2: Use the Application
**For Customers:**
- Go to http://localhost:5173
- Click "Sign Up"
- Fill out the registration form
- Account is created immediately

**For Restaurants & Riders:**
- Go to http://localhost:5173
- Click "Restaurant Owner?" or "Become a Rider"
- Fill out the request form
- Wait for admin approval
- Admin creates account and provides credentials

## 🔄 Role-Based Redirect Logic

The login system automatically redirects users based on their role:

```javascript
switch(user.role) {
  case 'customer':
    navigate('/customer-dashboard')
    break
  case 'restaurant':
    navigate('/restaurant-dashboard')
    break
  case 'rider':
    navigate('/rider-dashboard')
    break
  case 'admin':
    navigate('/admin-dashboard')
    break
  default:
    navigate('/')
}
```

## ✅ Testing the Login Flow

### Test Admin Login:
1. Go to http://localhost:5173/login
2. Enter: `admin@foodhub.com` / `admin123`
3. Click "Login"
4. ✅ Should redirect to `/admin-dashboard` (purple theme with sidebar)

### Test Restaurant Login:
1. Go to http://localhost:5173/login
2. Enter: `restaurant@test.com` / `admin123`
3. Click "Login"
4. ✅ Should redirect to `/restaurant-dashboard` (blue theme with sidebar)

### Test Rider Login:
1. Go to http://localhost:5173/login
2. Enter: `rider@test.com` / `admin123`
3. Click "Login"
4. ✅ Should redirect to `/rider-dashboard` (green theme)

### Test Customer Login:
1. Go to http://localhost:5173/login
2. Enter: `customer@test.com` / `admin123`
3. Click "Login"
4. ✅ Should redirect to `/customer-dashboard` (purple gradient theme)

## 🛡️ Security Features

- **JWT Authentication:** Secure token-based authentication
- **Password Hashing:** All passwords are hashed with bcrypt
- **Role Verification:** Each dashboard checks user role on mount
- **Auto Redirect:** Unauthorized users are redirected to login
- **Token Storage:** Auth tokens stored in localStorage

## 🔧 Troubleshooting

### "Login failed" error:
- Make sure backend is running on http://localhost:8000
- Check if test accounts exist in database
- Run the SQL script in `backend/add_admin.sql`

### Redirects to wrong dashboard:
- Check user role in database
- Clear localStorage and login again
- Verify the role field matches: 'admin', 'restaurant', 'rider', or 'customer'

### Can't access dashboard:
- Make sure you're logged in
- Check if auth token exists in localStorage
- Try logging out and logging in again

## 📝 Notes

- All test accounts share the same password for easy testing
- In production, use unique, strong passwords
- The bcrypt hash in the SQL file corresponds to "admin123"
- Customers can self-register, but restaurants and riders need admin approval
- Each role has a unique dashboard design and functionality
