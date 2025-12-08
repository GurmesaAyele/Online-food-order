import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './RiderDashboard.css'

function RiderDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const authData = localStorage.getItem('auth-storage')
    if (authData) {
      const { state } = JSON.parse(authData)
      if (state.user && state.user.role === 'rider') {
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
    <div className="rider-dashboard">
      <div className="rider-header">
        <div className="header-left">
          <h1>🚴 Rider Dashboard</h1>
          <p>Welcome, {user.full_name}</p>
        </div>
        <button onClick={handleLogout} className="rider-logout">Logout</button>
      </div>

      <div className="rider-content">
        <div className="rider-stats">
          <div className="rider-stat-card green">
            <div className="stat-icon">✅</div>
            <div className="stat-details">
              <h2>0</h2>
              <p>Completed Deliveries</p>
            </div>
          </div>

          <div className="rider-stat-card blue">
            <div className="stat-icon">📦</div>
            <div className="stat-details">
              <h2>0</h2>
              <p>Active Deliveries</p>
            </div>
          </div>

          <div className="rider-stat-card orange">
            <div className="stat-icon">💰</div>
            <div className="stat-details">
              <h2>$0</h2>
              <p>Today's Earnings</p>
            </div>
          </div>

          <div className="rider-stat-card purple">
            <div className="stat-icon">⭐</div>
            <div className="stat-details">
              <h2>5.0</h2>
              <p>Rating</p>
            </div>
          </div>
        </div>

        <div className="rider-main-content">
          <div className="available-orders">
            <h2>Available Orders</h2>
            <div className="orders-container">
              <div className="no-orders">
                <div className="no-orders-icon">📭</div>
                <p>No available orders at the moment</p>
                <button className="refresh-btn">Refresh</button>
              </div>
            </div>
          </div>

          <div className="rider-sidebar-content">
            <div className="rider-card">
              <h3>Today's Summary</h3>
              <div className="summary-item">
                <span>Total Deliveries:</span>
                <strong>0</strong>
              </div>
              <div className="summary-item">
                <span>Total Earnings:</span>
                <strong>$0.00</strong>
              </div>
              <div className="summary-item">
                <span>Average Time:</span>
                <strong>--</strong>
              </div>
            </div>

            <div className="rider-card">
              <h3>Quick Actions</h3>
              <button className="action-button">📍 View Map</button>
              <button className="action-button">📊 View Earnings</button>
              <button className="action-button">📜 Delivery History</button>
              <button className="action-button">⚙️ Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiderDashboard
