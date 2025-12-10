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
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Failed to update status'))
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth-storage')
    navigate('/')
  }

  const openInMaps = (lat, lng) => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')
    }
  }

  if (!user) return <div className="loading">Loading...</div>

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
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading orders...</p>
          </div>
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
                  {order.restaurant_address && <p>{order.restaurant_address}</p>}
                  {order.restaurant_phone && <p>📞 {order.restaurant_phone}</p>}
                </div>

                <div className="delivery-section">
                  <h4>📍 Delivery Location</h4>
                  <p><strong>{order.delivery_address}</strong></p>
                  {order.delivery_latitude && order.delivery_longitude && (
                    <>
                      <p className="coordinates">
                        Lat: {order.delivery_latitude.toFixed(6)}, 
                        Lng: {order.delivery_longitude.toFixed(6)}
                      </p>
                      <button 
                        className="btn btn-small btn-outline"
                        onClick={() => openInMaps(order.delivery_latitude, order.delivery_longitude)}
                      >
                        📍 Open in Maps
                      </button>
                    </>
                  )}
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
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <p key={index}>{item.name} x{item.quantity}</p>
                    ))
                  ) : (
                    <p>No items</p>
                  )}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RiderDashboard
