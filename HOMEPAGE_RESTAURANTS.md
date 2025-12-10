# Homepage Restaurant Display Feature

## Overview
The homepage now displays all approved and open restaurants for customers to browse before signing up.

## Implementation

### Backend
- **Endpoint**: `GET /api/restaurant/all`
- **Location**: `backend/app/routes/restaurant.py`
- **Functionality**: Returns all restaurants with status "open"
- **No authentication required** - Public endpoint for browsing

### Frontend
- **Component**: `frontend/src/pages/Home.jsx`
- **Styling**: `frontend/src/pages/Home.css`

### Features
1. **Restaurant Cards Display**
   - Restaurant name
   - Rating (with star icon)
   - Cuisine type
   - Address with location icon
   - Phone number with phone icon
   - Open status indicator (green badge)
   - "Order Now" button (links to registration)

2. **Responsive Design**
   - Grid layout that adapts to screen size
   - Desktop: Multiple columns
   - Tablet: 2 columns
   - Mobile: Single column

3. **Loading States**
   - Shows "Loading restaurants..." while fetching
   - Shows "No restaurants available" if empty

4. **User Experience**
   - Hover effects on restaurant cards
   - Smooth animations
   - Clean, modern design
   - Encourages sign-up with "Order Now" buttons

## How It Works

1. **On Page Load**
   - Home component fetches all open restaurants from API
   - Displays loading state during fetch
   - Renders restaurant cards when data arrives

2. **Restaurant Visibility**
   - Only restaurants with status "open" are shown
   - Closed or rejected restaurants are hidden
   - Admin can control visibility via status management

3. **Customer Journey**
   - Browse restaurants on homepage (no login required)
   - Click "Order Now" to register/login
   - After login, can place orders from restaurants

## Database Requirements

Restaurants must have:
- `status = 'open'` to appear on homepage
- Valid name, address, phone
- Rating (defaults to 0.0 for new restaurants)

## Admin Control

Admins can control restaurant visibility by:
1. Changing status to "closed" - hides from homepage
2. Changing status to "rejected" - hides from homepage
3. Changing status to "open" - shows on homepage
4. Deleting restaurant - removes completely

## Testing

1. **View Restaurants**
   - Visit homepage (http://localhost:5173)
   - Scroll to "Available Restaurants" section
   - See all open restaurants

2. **Approve New Restaurant**
   - Login as admin
   - Approve a restaurant request
   - Refresh homepage to see new restaurant

3. **Change Restaurant Status**
   - Login as admin
   - Change restaurant to "closed"
   - Refresh homepage - restaurant disappears
   - Change back to "open"
   - Refresh homepage - restaurant reappears

## Benefits

1. **Marketing** - Showcases available restaurants to visitors
2. **Transparency** - Customers see options before signing up
3. **Conversion** - Encourages registration by showing value
4. **Real-time** - Always shows current open restaurants
5. **Admin Control** - Easy management of visibility
