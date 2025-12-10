# Complete Order System Implementation Plan

## Phase 1: Database Schema Updates

### 1.1 Menu Items Enhancement
- Add meal_type (breakfast, lunch, dinner, snack) - can be multiple
- Add dietary_type (fasting, non-fasting)
- Add delivery_hours and delivery_days
- Add image support

### 1.2 Restaurant Profile Enhancement
- Add restaurant images (multiple)
- Add payment methods (CBE, Telebirr, Amole, Mobile Banking)
- Add account numbers and account holder names
- Add operating hours

### 1.3 Orders Enhancement
- Add payment_method
- Add payment_screenshot (base64 image)
- Add delivery_location (text)
- Add delivery_latitude
- Add delivery_longitude
- Add customer_phone
- Add rider_id (assigned rider)
- Add status tracking (pending, confirmed, preparing, ready, out_for_delivery, delivered, rejected)
- Add rejection_reason
- Add customer_rating
- Add customer_review

### 1.4 Order Items
- Link to menu items
- Store quantity and price at order time

## Phase 2: Restaurant Dashboard Features

### 2.1 Menu Management
- Add menu items with:
  - Name, description, price
  - Image upload
  - Meal types (multiple selection)
  - Dietary type
  - Availability toggle
- Edit menu items
- Delete menu items
- View all menu items

### 2.2 Restaurant Settings
- Upload restaurant images
- Set payment methods with account details
- Set operating hours
- Set delivery hours/days

### 2.3 Order Management
- View incoming orders
- See order details (items, payment screenshot, location, map)
- Change order status
- Assign riders to orders
- Reject orders with reason

## Phase 3: Customer Features

### 3.1 Browse Restaurants
- View all open restaurants
- See restaurant images
- See menu items filtered by meal type and dietary preference
- See prices and availability

### 3.2 Shopping Cart
- Add items to cart
- Update quantities
- Remove items
- See total price

### 3.3 Checkout Process
- Enter delivery location (text)
- Select location on map (lat/lng)
- Enter phone number
- Select payment method
- Upload payment screenshot
- Submit order

### 3.4 Order Tracking
- View order status
- See assigned rider info
- Rate and review after delivery

## Phase 4: Rider Features

### 4.1 Order Assignment
- Receive orders from restaurants
- See delivery location (text + map coordinates)
- See customer phone number
- Navigate to location

### 4.2 Delivery Management
- Update delivery status
- Mark as delivered

## Implementation Order

1. ✅ Database migrations
2. ✅ Backend API endpoints
3. ✅ Restaurant dashboard UI
4. ✅ Customer browsing and cart
5. ✅ Checkout and payment
6. ✅ Order management
7. ✅ Rider assignment and delivery
8. ✅ Rating and review system

Let's begin implementation!
