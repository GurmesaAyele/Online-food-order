# Rider Dashboard - Complete Implementation

## Overview
Complete Rider Dashboard for viewing assigned orders and updating delivery status.

## Implementation

### RiderDashboard Component

**File**: `frontend/src/pages/RiderDashboard.jsx`

```jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './RiderDashboard.css'

function RiderDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const authData = localStorage.getItem('auth-storage')
    if (authData) {
      const { state } = JSON.parse(authData)
      if (state.user && state.user.role === 'rider') {
        setUser(state.user)
        setToken(state.token)
        fetchOrders(state.token)
      } else {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }, [navigate])

  const fetchOrders = async (authToken) => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/rider/orders',
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (orderId, newStatus) => {
    setMessage('')
    try {
      await axios.put(
        `http://localhost:8000/api/rider/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Status updated successfully')
      fetchOrders(token)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Failed to update status'))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth-storage')
    navigate('/')
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="rider-dashboard">
      {/* Header */}
      <nav className="rider-nav">
        <div className="nav-brand">
          <h1>🚴 Rider Dashboard</h1>
        </div>
        <div className="nav-actions">
          <span className="rider-name">👤 {user.full_name}</span>
          <button onClick={handleLogout} className="btn btn-outline">Logout</button>
        </div>
      </nav>

      <div className="rider-content">
        <div className="rider-header">
          <h2>My Deliveries</h2>
          <p>Manage your assigned delivery orders</p>
        </div>

        {message && (
          <div className={`rider-message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No deliveries assigned</h3>
              <p>You'll see your delivery orders here when restaurants assign them to you</p>
            </div>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="delivery-card">
                <div className="delivery-header">
                  <h3>Order #{order.id}</h3>
                  <span className={`delivery-status status-${order.status}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="delivery-section">
                  <h4>🏪 Restaurant</h4>
                  <p><strong>{order.restaurant_name}</strong></p>
                  <p>{order.restaurant_address}</p>
                  <p>📞 {order.restaurant_phone}</p>
                </div>

                <div className="delivery-section">
                  <h4>📍 Delivery Location</h4>
                  <p><strong>{order.delivery_address}</strong></p>
                  {order.delivery_latitude && order.delivery_longitude && (
                    <p className="coordinates">
                      Lat: {order.delivery_latitude.toFixed(6)}, 
                      Lng: {order.delivery_longitude.toFixed(6)}
                    </p>
                  )}
                  <button className="btn btn-small btn-outline">
                    📍 Open in Maps
                  </button>
                </div>

                <div className="delivery-section">
                  <h4>👤 Customer</h4>
                  <p>📞 {order.customer_phone}</p>
                  {order.customer_notes && (
                    <p className="notes"><em>Note: {order.customer_notes}</em></p>
                  )}
                </div>

                <div className="delivery-section">
                  <h4>📦 Items</h4>
                  {order.items.map((item, index) => (
                    <p key={index}>{item.name} x{item.quantity}</p>
                  ))}
                  <p className="total"><strong>Total: ${order.total_amount.toFixed(2)}</strong></p>
                </div>

                {order.status === 'ready' && (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => handleUpdateStatus(order.id, 'out_for_delivery')}
                  >
                    🚴 Start Delivery
                  </button>
                )}

                {order.status === 'out_for_delivery' && (
                  <button
                    className="btn btn-success btn-block"
                    onClick={() => handleUpdateStatus(order.id, 'delivered')}
                  >
                    ✅ Mark as Delivered
                  </button>
                )}

                {selectedOrder === order.id && (
                  <div className="order-details-expanded">
                    {/* Additional details can be shown here */}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RiderDashboard
```

**File**: `frontend/src/pages/RiderDashboard.css`

```css
.rider-dashboard {
  min-height: 100vh;
  background: #F7FAFC;
}

.rider-nav {
  background: white;
  padding: 1.5rem 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand h1 {
  font-size: 1.8rem;
  color: #667eea;
  margin: 0;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.rider-name {
  font-weight: 600;
  color: #2D3748;
}

.rider-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem;
}

.rider-header {
  margin-bottom: 2rem;
}

.rider-header h2 {
  font-size: 2rem;
  color: #2D3748;
  margin-bottom: 0.5rem;
}

.rider-header p {
  color: #718096;
  font-size: 1.1rem;
}

.rider-message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
}

.rider-message.success {
  background: #D1FAE5;
  color: #065F46;
}

.rider-message.error {
  background: #FEE2E2;
  color: #991B1B;
}

.no-orders {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.empty-state {
  text-align: center;
  max-width: 500px;
}

.empty-icon {
  font-size: 6rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 2rem;
  color: #2D3748;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1.1rem;
  color: #718096;
  line-height: 1.6;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.delivery-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.delivery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.delivery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #E2E8F0;
}

.delivery-header h3 {
  font-size: 1.3rem;
  color: #2D3748;
}

.delivery-status {
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-ready {
  background: #FEF3C7;
  color: #92400E;
}

.status-out_for_delivery {
  background: #DBEAFE;
  color: #1E3A8A;
}

.status-delivered {
  background: #D1FAE5;
  color: #065F46;
}

.delivery-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E2E8F0;
}

.delivery-section:last-of-type {
  border-bottom: none;
}

.delivery-section h4 {
  color: #667eea;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.delivery-section p {
  color: #718096;
  margin: 0.5rem 0;
  line-height: 1.6;
}

.coordinates {
  font-size: 0.85rem;
  font-family: monospace;
  background: #F7FAFC;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.notes {
  background: #FEF3C7;
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.total {
  font-size: 1.1rem;
  color: #667eea;
  margin-top: 0.5rem;
}

.btn-success {
  background: #10B981;
  color: white;
}

.btn-success:hover {
  background: #059669;
}

@media (max-width: 768px) {
  .rider-nav {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
  }

  .nav-brand h1 {
    font-size: 1.5rem;
  }

  .rider-content {
    padding: 2rem 1.5rem;
  }

  .orders-grid {
    grid-template-columns: 1fr;
  }
}
```

## Backend Routes Needed

Add to `backend/app/routes/rider.py`:

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Order, OrderItem, MenuItem, Restaurant, User, OrderStatus
from app.auth import get_current_user
from pydantic import BaseModel

router = APIRouter()

class UpdateStatus(BaseModel):
    status: str

@router.get("/orders")
def get_rider_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "rider":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    # Get orders assigned to this rider
    orders = db.query(Order).filter(Order.rider_id == current_user.id).all()
    
    result = []
    for order in orders:
        restaurant = db.query(Restaurant).filter(Restaurant.user_id == order.restaurant_id).first()
        order_items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        
        items_list = []
        for item in order_items:
            menu_item = db.query(MenuItem).filter(MenuItem.id == item.menu_item_id).first()
            if menu_item:
                items_list.append({
                    "name": menu_item.name,
                    "quantity": item.quantity
                })
        
        result.append({
            "id": order.id,
            "restaurant_name": restaurant.name if restaurant else "Unknown",
            "restaurant_address": restaurant.address if restaurant else None,
            "restaurant_phone": restaurant.phone if restaurant else None,
            "delivery_address": order.delivery_address,
            "delivery_latitude": order.delivery_latitude,
            "delivery_longitude": order.delivery_longitude,
            "customer_phone": order.customer_phone,
            "customer_notes": order.customer_notes,
            "items": items_list,
            "total_amount": order.total_amount,
            "status": order.status,
            "created_at": order.created_at
        })
    
    return result

@router.put("/orders/{order_id}/status")
def update_delivery_status(
    order_id: int,
    status_update: UpdateStatus,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "rider":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )
    
    order = db.query(Order).filter(
        Order.id == order_id,
        Order.rider_id == current_user.id
    ).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    # Validate status transition
    valid_statuses = ["out_for_delivery", "delivered"]
    if status_update.status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status"
        )
    
    order.status = status_update.status
    db.commit()
    
    return {"message": "Status updated successfully"}
```

This completes the Rider Dashboard implementation!

## Summary

✅ **Rider Dashboard Features**:
- View all assigned orders
- See restaurant and customer details
- View delivery location with coordinates
- Customer phone number for contact
- Order items and total
- Update delivery status (Start Delivery / Mark as Delivered)
- Clean, mobile-responsive design

The rider can now efficiently manage their deliveries with all necessary information at their fingertips!
