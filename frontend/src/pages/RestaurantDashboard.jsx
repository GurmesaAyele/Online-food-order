import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './RestaurantDashboard.css'

function RestaurantDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const authData = localStorage.getItem('auth-storage')
    if (authData) {
      const { state } = JSON.parse(authData)
      if (state.user && state.user.role === 'restaurant') {
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
    <div className="restaurant-dashboard">
      <div className="restaurant-sidebar">
        <div className="sidebar-brand">🍽️ Restaurant</div>
        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item active">
            <span className="nav-icon">📊</span>
            Dashboard
          </a>
          <a href="#menu" className="nav-item">
            <span className="nav-icon">📋</span>
            Menu Items
          </a>
          <a href="#orders" className="nav-item">
            <span className="nav-icon">📦</span>
            Orders
          </a>
          <a href="#analytics" className="nav-item">
            <span className="nav-icon">📈</span>
            Analytics
          </a>
          <a href="#profile" className="nav-item">
            <span className="nav-icon">⚙️</span>
            Settings
          </a>
        </nav>
        <button onClick={handleLogout} className="sidebar-logout">Logout</button>
      </div>

      <div className="restaurant-main">
        <div className="restaurant-header">
          <h1>Welcome, {user.full_name}</h1>
          <p>Manage your restaurant</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Pending Orders</p>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Completed Today</p>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">🍽️</div>
            <div className="stat-info">
              <h3>0</h3>
              <p>Menu Items</p>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>$0</h3>
              <p>Today's Revenue</p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="section-card">
            <h2>Recent Orders</h2>
            <div className="orders-table">
              <p className="no-data">No orders yet</p>
            </div>
          </div>

          <div className="section-card">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-btn">➕ Add Menu Item</button>
              <button className="action-btn">📋 View All Orders</button>
              <button className="action-btn">📊 View Analytics</button>
              <button className="action-btn">⚙️ Restaurant Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDashboard
