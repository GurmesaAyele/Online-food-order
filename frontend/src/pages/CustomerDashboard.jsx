import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CustomerDashboard.css'

function CustomerDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user from localStorage
    const authData = localStorage.getItem('auth-storage')
    if (authData) {
      const { state } = JSON.parse(authData)
      if (state.user && state.user.role === 'customer') {
        setUser(state.user)
      } else {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('auth-storage')
    navigate('/')
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="customer-dashboard">
      <nav className="customer-nav">
        <div className="nav-brand">🍕 FoodHub</div>
        <div className="nav-menu">
          <a href="#restaurants">Restaurants</a>
          <a href="#orders">My Orders</a>
          <a href="#cart">Cart</a>
          <a href="#profile">Profile</a>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <div className="customer-content">
        <div className="welcome-section">
          <h1>Welcome back, {user.full_name}! 👋</h1>
          <p>Ready to order some delicious food?</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">🍽️</div>
            <h3>Browse Restaurants</h3>
            <p>Explore local restaurants</p>
            <button className="card-btn">View All</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📦</div>
            <h3>My Orders</h3>
            <p>Track your orders</p>
            <button className="card-btn">View Orders</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🛒</div>
            <h3>Shopping Cart</h3>
            <p>0 items in cart</p>
            <button className="card-btn">View Cart</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>My Profile</h3>
            <p>Manage your account</p>
            <button className="card-btn">Edit Profile</button>
          </div>
        </div>

        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <div className="orders-list">
            <div className="order-item">
              <p>No orders yet. Start ordering now!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard
