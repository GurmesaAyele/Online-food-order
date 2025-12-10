# Complete Order System - Implementation Guide

## ✅ Phase 1: Database Schema (COMPLETED)

All database tables have been updated with the required fields:

### Restaurants Table
- ✅ images (JSON array of base64 images)
- ✅ operating_hours (JSON object)
- ✅ delivery_hours (JSON object)
- ✅ payment_methods (JSON array with account details)

### Menu Items Table
- ✅ meal_types (JSON array: can be multiple like ["breakfast", "lunch"])
- ✅ dietary_type (fasting/non_fasting)
- ✅ delivery_schedule (JSON with days and hours)

### Orders Table
- ✅ delivery_latitude, delivery_longitude (map coordinates)
- ✅ customer_phone
- ✅ payment_method, payment_screenshot
- ✅ payment_account_number, payment_account_name
- ✅ rejection_reason
- ✅ customer_rating, customer_review
- ✅ Enhanced status (pending, confirmed, preparing, ready, out_for_delivery, delivered, rejected)

## Phase 2: Backend API Endpoints (TO IMPLEMENT)

### Restaurant Endpoints
```
POST   /api/restaurant/settings/images          - Upload restaurant images
PUT    /api/restaurant/settings/payment-methods - Set payment methods
PUT    /api/restaurant/settings/hours           - Set operating/delivery hours
GET    /api/restaurant/settings                 - Get all settings

POST   /api/restaurant/menu                     - Create menu item (with meal_types array)
PUT    /api/restaurant/menu/{id}                - Update menu item
DELETE /api/restaurant/menu/{id}                - Delete menu item
GET    /api/restaurant/menu                     - Get all menu items

GET    /api/restaurant/orders                   - Get all orders
GET    /api/restaurant/orders/{id}              - Get order details
PUT    /api/restaurant/orders/{id}/status       - Update order status
POST   /api/restaurant/orders/{id}/assign-rider - Assign rider to order
POST   /api/restaurant/orders/{id}/reject       - Reject order with reason
```

### Customer Endpoints
```
GET    /api/customer/restaurants                - Get all open restaurants
GET    /api/customer/restaurants/{id}           - Get restaurant details with menu
GET    /api/customer/restaurants/{id}/menu      - Get restaurant menu (filtered by meal_type, dietary_type)

POST   /api/customer/cart/add                   - Add item to cart
PUT    /api/customer/cart/update                - Update cart item quantity
DELETE /api/customer/cart/remove/{item_id}      - Remove from cart
GET    /api/customer/cart                       - Get cart contents

POST   /api/customer/orders                     - Create order (with location, payment screenshot)
GET    /api/customer/orders                     - Get customer orders
GET    /api/customer/orders/{id}                - Get order details
POST   /api/customer/orders/{id}/rate           - Rate and review order
```

### Rider Endpoints
```
GET    /api/rider/orders                        - Get assigned orders
GET    /api/rider/orders/{id}                   - Get order details (with location, phone)
PUT    /api/rider/orders/{id}/status            - Update delivery status
```

## Phase 3: Restaurant Dashboard UI (TO IMPLEMENT)

### Menu Management Tab
- Form to add menu items:
  - Name, description, price
  - Image upload (convert to base64)
  - Multiple meal type checkboxes (breakfast, lunch, dinner, snack)
  - Dietary type radio (fasting/non-fasting)
  - Delivery schedule (days and hours)
  - Availability toggle
- List of menu items with edit/delete buttons
- Image preview

### Restaurant Settings Tab
- Upload multiple restaurant images
- Payment methods form:
  - Add CBE account (number + name)
  - Add Telebirr account
  - Add Amole account
  - Add Mobile Banking account
  - Edit/delete payment methods
- Operating hours (day-wise)
- Delivery hours (day-wise)

### Orders Management Tab
- List of incoming orders with:
  - Order ID, customer name, items
  - Payment screenshot viewer
  - Delivery address (text)
  - Map showing delivery location
  - Customer phone number
  - Status dropdown (pending → confirmed → preparing → ready)
  - Assign rider button
  - Reject button (with reason input)
- Order details modal with full information

## Phase 4: Customer Features (TO IMPLEMENT)

### Restaurant Browsing
- Grid of restaurants with images
- Click to view restaurant details
- Menu items filtered by:
  - Meal type tabs (breakfast, lunch, dinner, snack, all)
  - Dietary filter (all, fasting, non-fasting)
- Add to cart button on each item

### Shopping Cart
- Cart icon with item count
- Cart sidebar/modal showing:
  - Items with quantities
  - Price per item
  - Total price
  - Update quantity buttons
  - Remove item buttons
  - Checkout button

### Checkout Process
- Multi-step form:
  1. Delivery Information
     - Text address input
     - Map component to select location (lat/lng)
     - Phone number input
  2. Payment
     - Select payment method (from restaurant's available methods)
     - Show account number and name
     - Upload payment screenshot
  3. Review and Submit

### Order Tracking
- List of customer orders
- Order status timeline
- View order details
- Rate and review (after delivery)

## Phase 5: Rider Features (TO IMPLEMENT)

### Order List
- Assigned orders
- Order details with:
  - Restaurant name and address
  - Customer delivery address (text)
  - Map with delivery location
  - Customer phone number
  - Items list
- Update status button

## Phase 6: Additional Features

### Map Integration
- Use Leaflet.js or Google Maps API
- Allow customers to pin location
- Show location to riders
- Calculate distance

### Image Handling
- Convert images to base64 for storage
- Compress images before upload
- Image preview components
- Gallery viewer for restaurant images

### Real-time Updates (Optional)
- WebSocket for order status updates
- Notifications for new orders
- Live order tracking

## Implementation Priority

Given the scope, I recommend implementing in this order:

1. **Restaurant Menu Management** (Most Critical)
   - Backend API for menu CRUD
   - Frontend UI for adding/editing menu items
   - Image upload functionality

2. **Customer Browsing & Cart**
   - View restaurants and menus
   - Add to cart functionality
   - Cart management

3. **Restaurant Settings**
   - Payment methods setup
   - Restaurant images
   - Operating hours

4. **Order Creation**
   - Checkout flow
   - Location selection
   - Payment screenshot upload

5. **Order Management**
   - Restaurant order dashboard
   - Status updates
   - Rider assignment

6. **Rider Delivery**
   - View assigned orders
   - Access delivery information
   - Update delivery status

7. **Rating & Review**
   - Customer rating system
   - Review submission

## Next Steps

Would you like me to:
1. Start with Restaurant Menu Management (backend + frontend)?
2. Implement Customer Browsing & Cart system?
3. Build the complete checkout flow?
4. Or focus on a specific component?

This is a large system that will require multiple implementation sessions. Let me know which part you'd like to prioritize!
