# 🔐 Default Login Credentials

## Admin Dashboard

**Email**: `admin@foodhub.com`  
**Password**: `admin123`

**Login URL**: http://localhost:5177

---

## How to Create Admin Account

Since the admin account doesn't exist by default, you need to create it first.

### Method 1: Using API Documentation (Recommended)

1. **Open API Docs**: http://localhost:8000/docs

2. **Find**: `POST /api/v1/auth/register`

3. **Click "Try it out"**

4. **Paste this JSON**:
```json
{
  "email": "admin@foodhub.com",
  "password": "admin123",
  "full_name": "Admin User",
  "phone": "1234567890",
  "role": "admin"
}
```

5. **Click "Execute"**

6. **Done!** Now you can login with:
   - Email: admin@foodhub.com
   - Password: admin123

---

## All Test Accounts

### 👨‍💼 Admin
```
Email: admin@foodhub.com
Password: admin123
Role: admin
Dashboard: http://localhost:5177
```

### 👤 Customer
```
Email: customer@test.com
Password: password123
Role: customer
Dashboard: http://localhost:5174
```

### 🍽️ Restaurant
```
Email: restaurant@test.com
Password: password123
Role: restaurant
Dashboard: http://localhost:5175
```

### 🚴 Rider
```
Email: rider@test.com
Password: password123
Role: rider
Dashboard: http://localhost:5176
```

---

## Create All Accounts at Once

Run this script:
```bash
cd backend
venv\Scripts\activate
python create_all_test_accounts.py
```

This will create all 4 test accounts automatically!

---

## Important Notes

- ⚠️ **Backend must be running** before creating accounts
- ⚠️ **Change passwords** in production
- ⚠️ Each role has its own dashboard
- ⚠️ You cannot login to wrong dashboard (role mismatch)

---

## Quick Access

| Role | Dashboard URL | Default Email |
|------|--------------|---------------|
| Admin | http://localhost:5177 | admin@foodhub.com |
| Customer | http://localhost:5174 | customer@test.com |
| Restaurant | http://localhost:5175 | restaurant@test.com |
| Rider | http://localhost:5176 | rider@test.com |

---

**Remember**: Create the accounts first using the API docs!
