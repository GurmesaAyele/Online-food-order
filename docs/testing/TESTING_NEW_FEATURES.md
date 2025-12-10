# Testing Guide - Restaurant & Rider Dashboards

## Quick Start Testing

### Prerequisites
1. Backend running on `http://localhost:8000`
2. Frontend running on `http://localhost:5173`
3. Test accounts created (see TEST_ACCOUNTS.md)

---

## 🏪 Testing Restaurant Dashboard

### 1. Login as Restaurant Owner
```
Email: restaurant@test.com (or your restaurant account)
Password: password123
```

### 2. Test Menu Management
**Add Menu Item:**
1. Click "Menu Items" in sidebar
2. Click "➕ Add New Item" button
3. Fill in the form:
   - Upload an image (optional)
   - Name: "Margherita Pizza"
   - Description: "Classic pizza with tomato and mozzarella"
   - Price: 12.99
   - Category: "Main Course"
   - Meal Type: "Lunch"
   - Dietary Type: "Non-Fasting"
   - Check "Available for order"
4. Click "Add Item"
5. ✅ Should see success message and new item in grid

**Edit Menu Item:**
1. Click "✏️ Edit" on any menu item
2. Change price to 14.99
3. Click "Update Item"
4. ✅ Should see updated price

**Delete Menu Item:**
1. Click "🗑️ Delete" on any menu item
2. Confirm deletion
3. ✅ Item should be removed from grid

### 3. Test Orders Section
1. Click "Orders" in sidebar
2. ✅ Should see list of orders (if any exist)
3. Change order status using dropdown
4. ✅ Should see success message

### 4. Test Analytics Dashboard
1. Click "Analytics" in sidebar
2. ✅ Should see 4 stat cards:
   - Total Orders (with 📦 icon)
   - Total Revenue (with 💰 icon)
   - Pending Orders (with ⏳ icon)
   - Completed Orders (with ✅ icon)
3. ✅ Should see 3 charts:
   - Order Status Distribution (bar chart)
   - Menu Statistics (bar chart)
   - Average Order Value (large display)
4. ✅ All numbers should be calculated from real data
5. ✅ Bars should be animated and color-coded

### 5. Test Profile Features
**Profile Picture:**
1. Click on profile picture in sidebar
2. Upload new image
3. ✅ Should update immediately

**Restaurant Photo:**
1. Click on restaurant photo section
2. Upload new image
3. ✅ Should update immediately

**Change Password:**
1. Click "Settings" in sidebar
2. Go to "Change Password" tab
3. Enter current and new password
4. Click "Change Password"
5. ✅ Should see success message

### 6. Test Dark Mode
1. Click "🌙 Dark Mode" button at bottom of sidebar
2. ✅ Entire dashboard should switch to dark theme
3. Click "☀️ Light Mode" to switch back
4. ✅ Should return to light theme

---

## 🚴 Testing Rider Dashboard

### 1. Login as Rider
```
Email: rider@test.com (or your rider account)
Password: password123
```

### 2. Test Order Display
1. ✅ Should see all assigned orders in grid layout
2. Each order card should show:
   - Order number
   - Status badge (color-coded)
   - Restaurant details (name, address, phone)
   - Delivery location with coordinates
   - Customer phone number
   - Customer notes (if any)
   - Order items list
   - Total amount

### 3. Test Delivery Actions
**For orders with status "ready":**
1. Click "🚴 Start Delivery" button
2. ✅ Should see success message
3. ✅ Status should change to "out_for_delivery"
4. ✅ Button should change to "✅ Mark as Delivered"

**For orders with status "out_for_delivery":**
1. Click "✅ Mark as Delivered" button
2. ✅ Should see success message
3. ✅ Status should change to "delivered"
4. ✅ Action buttons should disappear

### 4. Test Map Integration
1. Find order with coordinates
2. Click "📍 Open in Maps" button
3. ✅ Should open Google Maps in new tab with location

### 5. Test Empty State
1. If no orders assigned:
2. ✅ Should see empty state with:
   - 📦 icon (animated floating)
   - "No deliveries assigned" message
   - Helpful description text

---

## 🧪 API Testing

### Restaurant Endpoints
```bash
# Get menu items
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/restaurant/menu

# Add menu item
curl -X POST -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","description":"Test","price":9.99,"category":"Main Course","available":1}' \
  http://localhost:8000/api/restaurant/menu

# Get orders
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/restaurant/orders

# Update order status
curl -X PUT -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"preparing"}' \
  http://localhost:8000/api/restaurant/orders/1/status
```

### Rider Endpoints
```bash
# Get assigned orders
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/rider/orders

# Update delivery status
curl -X PUT -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"out_for_delivery"}' \
  http://localhost:8000/api/rider/orders/1/status

# Get rider stats
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/rider/stats
```

---

## 📱 Responsive Testing

### Desktop (> 1024px)
1. Open browser at full width
2. ✅ Sidebar should be visible
3. ✅ Grid should show multiple columns
4. ✅ All features accessible

### Tablet (768px - 1024px)
1. Resize browser to ~900px width
2. ✅ Sidebar should be narrower
3. ✅ Grid should show 2 columns
4. ✅ All features still accessible

### Mobile (< 768px)
1. Resize browser to ~400px width
2. ✅ Sidebar should collapse
3. ✅ Grid should show 1 column
4. ✅ Buttons should be full width
5. ✅ Touch-friendly spacing

---

## 🎨 Visual Testing

### Restaurant Dashboard
✅ **Colors:**
- Purple gradient for primary actions
- Green for success/revenue
- Orange for warnings/pending
- Blue for info
- Red for delete actions

✅ **Animations:**
- Smooth transitions on hover
- Bar charts animate on load
- Cards lift on hover
- Buttons have press effect

✅ **Typography:**
- Clear hierarchy
- Readable font sizes
- Proper spacing

### Rider Dashboard
✅ **Colors:**
- Purple gradient for primary
- Green for success/delivered
- Yellow for ready status
- Blue for out_for_delivery
- Red for errors

✅ **Animations:**
- Float animation on empty state
- Fade-in for order cards
- Pulse animation for ready status
- Smooth status transitions

---

## 🐛 Common Issues & Solutions

### Issue: "Not authorized" error
**Solution**: Make sure you're logged in with correct role (restaurant/rider)

### Issue: No orders showing
**Solution**: 
- For restaurants: Customers need to place orders
- For riders: Restaurant needs to assign orders to you

### Issue: Charts showing 0
**Solution**: Add menu items and orders to see data

### Issue: Image upload not working
**Solution**: Make sure image is < 5MB and in supported format (jpg, png)

### Issue: Status update fails
**Solution**: Check that status transition is valid (e.g., can't go from pending to delivered)

---

## ✅ Test Checklist

### Restaurant Dashboard
- [ ] Login successful
- [ ] Menu items display correctly
- [ ] Can add new menu item
- [ ] Can edit menu item
- [ ] Can delete menu item
- [ ] Image upload works
- [ ] Orders display correctly
- [ ] Can update order status
- [ ] Analytics cards show correct numbers
- [ ] Charts display and animate
- [ ] Profile picture upload works
- [ ] Restaurant photo upload works
- [ ] Password change works
- [ ] Dark mode toggle works
- [ ] Responsive on mobile
- [ ] Logout works

### Rider Dashboard
- [ ] Login successful
- [ ] Assigned orders display
- [ ] Restaurant details visible
- [ ] Delivery location shows
- [ ] Customer phone visible
- [ ] Order items list correct
- [ ] Can start delivery
- [ ] Can mark as delivered
- [ ] Map button opens Google Maps
- [ ] Status updates in real-time
- [ ] Empty state shows when no orders
- [ ] Success/error messages work
- [ ] Responsive on mobile
- [ ] Logout works

---

## 🎯 Performance Testing

1. **Load Time**: Dashboard should load in < 2 seconds
2. **API Response**: API calls should complete in < 500ms
3. **Animations**: Should be smooth (60fps)
4. **Image Upload**: Should handle images up to 5MB
5. **Concurrent Users**: Should handle multiple users simultaneously

---

## 📊 Data Validation

### Restaurant Analytics
- Total Orders = Count of all orders
- Total Revenue = Sum of all order totals
- Pending Orders = Count where status = 'pending'
- Completed Orders = Count where status = 'delivered'
- Average Order Value = Total Revenue / Total Orders

### Rider Stats
- Total Earnings = Sum of (order total * 0.1) for delivered orders
- Completed Deliveries = Count where status = 'delivered'
- Active Deliveries = Count where status in ['ready', 'out_for_delivery']

---

## 🚀 Ready for Production

Once all tests pass:
1. ✅ All features working
2. ✅ No console errors
3. ✅ Responsive on all devices
4. ✅ Data calculations correct
5. ✅ Error handling works
6. ✅ Performance acceptable

**System is ready for deployment!** 🎉
