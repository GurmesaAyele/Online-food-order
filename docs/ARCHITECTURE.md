# 🏗️ System Architecture

## Overview

This is a distributed, full-stack food delivery platform with real-time capabilities, built using modern web technologies.

## Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MySQL with SQLAlchemy ORM
- **Authentication**: JWT tokens
- **Real-time**: WebSockets
- **Caching**: Redis (optional)
- **Payment**: Stripe, Chapa integration
- **File Storage**: Local filesystem (can be extended to S3)

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## System Components

### 1. Customer Web App (Port 5173)
- Restaurant discovery and search
- Menu browsing with filters
- Shopping cart management
- Order placement and tracking
- Real-time delivery tracking
- Order history
- User profile management

### 2. Restaurant Dashboard (Port 5174)
- Order management (accept/decline/update status)
- Menu management (CRUD operations)
- Sales analytics
- Profile management
- Real-time order notifications

### 3. Delivery Rider App (Port 5175)
- Available orders list
- Accept/reject deliveries
- Navigation integration
- Real-time location updates
- Earnings tracking
- Delivery history

### 4. Admin Panel (Port 5176)
- User management
- Restaurant verification
- Order monitoring
- System analytics
- Dispute resolution
- Platform configuration

## Database Schema

### Core Tables
- **users**: All user accounts (customers, restaurants, riders, admins)
- **restaurants**: Restaurant profiles and details
- **menu_items**: Restaurant menu items
- **orders**: Order records with items (JSON)
- **riders**: Rider profiles and vehicle info
- **reviews**: Customer reviews for restaurants and riders
- **promotions**: Discount codes and promotions

## API Architecture

### RESTful Endpoints

```
/api/v1/auth
  POST /register - User registration
  POST /login - User authentication

/api/v1/restaurants
  GET / - List restaurants
  GET /{id} - Get restaurant details
  POST / - Create restaurant (restaurant role)
  GET /{id}/menu - Get menu items
  POST /{id}/menu - Add menu item (restaurant role)

/api/v1/orders
  POST / - Create order (customer role)
  GET / - List user orders
  GET /{id} - Get order details
  PATCH /{id}/status - Update order status

/api/v1/riders
  GET /available-orders - List available deliveries
  POST /accept-order/{id} - Accept delivery
  POST /update-location - Update rider location

/api/v1/admin
  GET /stats - Platform statistics
  GET /users - List all users
  PATCH /restaurants/{id}/verify - Verify restaurant
```

### WebSocket Endpoints

```
/ws/orders/{user_id} - Real-time order updates
```

## Security Features

1. **Authentication**: JWT-based with Bearer tokens
2. **Authorization**: Role-based access control (RBAC)
3. **Password Hashing**: Bcrypt
4. **CORS**: Configured for frontend origins
5. **Input Validation**: Pydantic schemas
6. **SQL Injection Protection**: SQLAlchemy ORM

## Real-time Features

### WebSocket Communication
- Order status updates
- Delivery tracking
- Rider location updates
- New order notifications

## Payment Integration

### Supported Methods
1. **Stripe**: Credit/Debit cards
2. **Chapa**: Ethiopian payment gateway
3. **Mobile Money**: Integration ready
4. **Cash on Delivery**: Default option

## Scalability Considerations

### Backend
- Stateless API design
- Database connection pooling
- Redis caching for frequently accessed data
- Background tasks with Celery (optional)

### Frontend
- Code splitting with React lazy loading
- Optimized bundle sizes
- CDN for static assets
- Progressive Web App (PWA) ready

## Deployment Architecture

```
┌─────────────────┐
│   Load Balancer │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│ API 1 │ │ API 2 │
└───┬───┘ └──┬────┘
    │        │
    └────┬───┘
         │
    ┌────▼────┐
    │  MySQL  │
    └─────────┘
```

## Future Enhancements

1. **AI Recommendations**: ML-based food suggestions
2. **Push Notifications**: Firebase Cloud Messaging
3. **Advanced Analytics**: Data visualization dashboards
4. **Multi-language Support**: i18n integration
5. **Dark Mode**: Theme switching
6. **Social Login**: OAuth integration
7. **Chat Support**: Real-time customer support
8. **Loyalty Program**: Points and rewards system
