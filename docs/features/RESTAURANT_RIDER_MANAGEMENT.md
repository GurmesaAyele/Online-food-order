# Restaurant and Rider Management Features

## Overview
This document describes the new restaurant and rider management features added to the admin dashboard.

## Features Implemented

### 1. Database Changes
- **New `riders` table** with fields:
  - `id`, `user_id`, `full_name`, `phone`
  - `vehicle_type`, `license_number`, `address`
  - `status` (available/unavailable/rejected)
  - `rejection_reason`, `rating`
  - `created_at`, `updated_at`

- **Updated `restaurants` table** with new fields:
  - `status` (open/closed/rejected)
  - `rejection_reason`
  - `business_license`
  - `updated_at`

### 2. Backend API Endpoints

#### Admin Endpoints (`/api/admin/`)
- `GET /restaurants` - Get all restaurants with details
- `PUT /restaurants/{id}/status` - Update restaurant status (open/closed/rejected)
- `DELETE /restaurants/{id}` - Delete restaurant and associated user account
- `GET /riders` - Get all riders with details
- `PUT /riders/{id}/status` - Update rider status (available/unavailable/rejected)
- `DELETE /riders/{id}` - Delete rider and associated user account

#### Restaurant Endpoints (`/api/restaurant/`)
- `GET /all` - Get all open restaurants (for customers)

### 3. Approval Process Enhancement
When admin approves a restaurant or rider request:
1. User account is created
2. **Restaurant record** is created in `restaurants` table (for restaurant requests)
3. **Rider record** is created in `riders` table (for rider requests)
4. Email with credentials is sent to the applicant

### 4. Admin Dashboard UI

#### Restaurants Tab
- View all approved restaurants
- See restaurant details (name, email, phone, address, license, rating)
- **Status management**:
  - Change status to Open/Closed/Rejected
  - Add rejection reason when rejecting
- **Delete restaurants** (removes restaurant and user account)

#### Riders Tab
- View all approved riders
- See rider details (name, email, phone, vehicle, license, address, rating)
- **Status management**:
  - Change status to Available/Unavailable/Rejected
  - Add rejection reason when rejecting
- **Delete riders** (removes rider and user account)

### 5. Customer Experience
- Customers can now see only **open restaurants** in their dashboard
- Closed or rejected restaurants are hidden from customer view

## Status Options

### Restaurant Status
- **Open** 🟢 - Restaurant is accepting orders
- **Closed** 🔴 - Restaurant is temporarily closed
- **Rejected** ❌ - Restaurant access revoked (with reason)

### Rider Status
- **Available** 🟢 - Rider is available for deliveries
- **Unavailable** 🟡 - Rider is temporarily unavailable
- **Rejected** ❌ - Rider access revoked (with reason)

## Usage Instructions

### For Admins

1. **Approve Requests**
   - Go to "Requests" tab
   - Click "Approve" on pending requests
   - Restaurant/Rider records are automatically created

2. **Manage Restaurants**
   - Go to "Restaurants" tab
   - Use dropdown to change status
   - Click "Delete" to permanently remove

3. **Manage Riders**
   - Go to "Riders" tab
   - Use dropdown to change status
   - Click "Delete" to permanently remove

4. **Reject After Approval**
   - Select "Reject" from status dropdown
   - Enter rejection reason when prompted
   - User will see rejection reason

## Database Migration

Run the migration script to update your database:
```bash
cd backend
python migrate_restaurant_rider.py
```

This will:
- Create the `riders` table
- Add new columns to `restaurants` table
- Preserve existing data

## Files Modified

### Backend
- `backend/app/models.py` - Added Rider model and status enums
- `backend/app/routes/admin.py` - Added restaurant/rider management endpoints
- `backend/app/routes/requests.py` - Updated approval process
- `backend/app/routes/restaurant.py` - Added endpoint for open restaurants
- `backend/migrate_restaurant_rider.py` - Database migration script

### Frontend
- `frontend/src/pages/AdminDashboard.jsx` - Added restaurants and riders management UI
- `frontend/src/pages/AdminDashboard.css` - Added styling for new features

## Testing

1. Start the backend server
2. Login as admin
3. Approve a restaurant/rider request
4. Check "Restaurants" or "Riders" tab to see the approved entry
5. Test status changes and deletion
6. Verify customers only see open restaurants
