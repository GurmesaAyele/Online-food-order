import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const authData = localStorage.getItem('auth-storage')
    if (authData) {
      const { state } = JSON.parse(authData)
      if (state.user && state.user.role === 'admin') {
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
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-brand">
          <div className="brand-icon">👑</div>
          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon">📊</span>
            Overview
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="nav-icon">👥</span>
            Users
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <span className="nav-icon">📝</span>
            Requests
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'restaurants' ? 'active' : ''}`}
            onClick={() => setActiveTab('restaurants')}
          >
            <span className="nav-icon">🏪</span>
            Restaurants
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'riders' ? 'active' : ''}`}
            onClick={() => setActiveTab('riders')}
          >
            <span className="nav-icon">🚴</span>
            Riders
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span className="nav-icon">📦</span>
            Orders
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <span className="nav-icon">📈</span>
            Analytics
          </button>
        </nav>

        <button onClick={handleLogout} className="admin-logout">
          <span className="nav-icon">🚪</span>
          Logout
        </button>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Welcome, {user.full_name}</h1>
            <p>Admin Dashboard</p>
          </div>
        </div>

        <div className="admin-stats">
          <div className="admin-stat-card purple">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>0</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="admin-stat-card blue">
            <div className="stat-icon">🏪</div>
            <div className="stat-content">
              <h3>0</h3>
              <p>Restaurants</p>
            </div>
          </div>

          <div className="admin-stat-card green">
            <div className="stat-icon">🚴</div>
            <div className="stat-content">
              <h3>0</h3>
              <p>Riders</p>
            </div>
          </div>

          <div className="admin-stat-card orange">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>0</h3>
              <p>Total Orders</p>
            </div>
          </div>

          <div className="admin-stat-card red">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>0</h3>
              <p>Pending Requests</p>
            </div>
          </div>

          <div className="admin-stat-card teal">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>$0</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="admin-content">
          {activeTab === 'overview' && (
            <div className="content-section">
              <div className="admin-card">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <p className="no-data">No recent activity</p>
                </div>
              </div>

              <div className="admin-card">
                <h2>Quick Actions</h2>
                <div className="quick-actions">
                  <button className="quick-action-btn">➕ Add Restaurant</button>
                  <button className="quick-action-btn">➕ Add Rider</button>
                  <button className="quick-action-btn">📊 View Reports</button>
                  <button className="quick-action-btn">⚙️ Settings</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="admin-card">
              <h2>Pending Requests</h2>
              <div className="requests-table">
                <p className="no-data">No pending requests</p>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'requests' && (
            <div className="admin-card">
              <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              <p className="no-data">Content for {activeTab} will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
