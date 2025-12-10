import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './AdminDashboard.css'

function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalUsers: 0,
    restaurants: 0,
    riders: 0,
    pendingRequests: 0
  })
  const [requests, setRequests] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const authData = localStorage.getItem('auth-storage')
    if (authData) {
      const { state } = JSON.parse(authData)
      if (state.user && state.user.role === 'admin') {
        setUser(state.user)
        setToken(state.token)
        fetchStats(state.token)
        fetchRequests(state.token)
        fetchRestaurants(state.token)
        fetchRiders(state.token)
      } else {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }, [navigate])

  const fetchStats = async (authToken) => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/stats', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchRequests = async (authToken) => {
    try {
      const response = await axios.get('http://localhost:8000/api/requests/', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setRequests(response.data)
      setStats(prev => ({ ...prev, pendingRequests: response.data.length }))
    } catch (error) {
      console.error('Error fetching requests:', error)
    }
  }

  const fetchRestaurants = async (authToken) => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/restaurants', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setRestaurants(response.data)
    } catch (error) {
      console.error('Error fetching restaurants:', error)
    }
  }

  const fetchRiders = async (authToken) => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/riders', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setRiders(response.data)
    } catch (error) {
      console.error('Error fetching riders:', error)
    }
  }

  const handleApprove = async (requestId) => {
    if (!window.confirm('Approve this request? An account will be created and credentials will be sent to their email.')) return

    setLoading(true)
    setMessage('')
    try {
      const response = await axios.post(
        `http://localhost:8000/api/requests/${requestId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage(`✅ ${response.data.message}`)
      fetchRequests(token)
      fetchStats(token)
      fetchRestaurants(token)
      fetchRiders(token)
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Failed to approve request')
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async (requestId) => {
    const reason = prompt('Please enter the reason for rejection:')
    if (!reason || reason.trim() === '') {
      setMessage('❌ Rejection reason is required')
      return
    }

    setLoading(true)
    setMessage('')
    try {
      await axios.post(
        `http://localhost:8000/api/requests/${requestId}/reject?reason=${encodeURIComponent(reason)}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Request rejected and notification sent with reason')
      fetchRequests(token)
      fetchStats(token)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Failed to reject request'))
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateRestaurantStatus = async (restaurantId, status, reason = null) => {
    setLoading(true)
    setMessage('')
    try {
      await axios.put(
        `http://localhost:8000/api/admin/restaurants/${restaurantId}/status`,
        { status, rejection_reason: reason },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage(`✅ Restaurant status updated to ${status}`)
      fetchRestaurants(token)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Failed to update restaurant status'))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRestaurant = async (restaurantId) => {
    if (!window.confirm('Are you sure you want to delete this restaurant? This will also delete the associated user account.')) return

    setLoading(true)
    setMessage('')
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/restaurants/${restaurantId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Restaurant deleted successfully')
      fetchRestaurants(token)
      fetchStats(token)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Failed to delete restaurant'))
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateRiderStatus = async (riderId, status, reason = null) => {
    setLoading(true)
    setMessage('')
    try {
      await axios.put(
        `http://localhost:8000/api/admin/riders/${riderId}/status`,
        { status, rejection_reason: reason },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage(`✅ Rider status updated to ${status}`)
      fetchRiders(token)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Failed to update rider status'))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRider = async (riderId) => {
    if (!window.confirm('Are you sure you want to delete this rider? This will also delete the associated user account.')) return

    setLoading(true)
    setMessage('')
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/riders/${riderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Rider deleted successfully')
      fetchRiders(token)
      fetchStats(token)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Failed to delete rider'))
    } finally {
      setLoading(false)
    }
  }

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
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="admin-stat-card blue">
            <div className="stat-icon">🏪</div>
            <div className="stat-content">
              <h3>{stats.restaurants}</h3>
              <p>Restaurants</p>
            </div>
          </div>

          <div className="admin-stat-card green">
            <div className="stat-icon">🚴</div>
            <div className="stat-content">
              <h3>{stats.riders}</h3>
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
              <h3>{stats.pendingRequests}</h3>
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
              {message && (
                <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
              <div className="requests-table">
                {requests.length === 0 ? (
                  <p className="no-data">No pending requests</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Details</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((request) => (
                        <tr key={request.id}>
                          <td>
                            <span className={`badge ${request.request_type}`}>
                              {request.request_type === 'restaurant' ? '🏪 Restaurant' : '🚴 Rider'}
                            </span>
                          </td>
                          <td>{request.full_name}</td>
                          <td>{request.email}</td>
                          <td>{request.phone}</td>
                          <td>
                            {request.request_type === 'restaurant' ? (
                              <div className="details">
                                <div><strong>Restaurant:</strong> {request.restaurant_name}</div>
                                <div><strong>Address:</strong> {request.restaurant_address}</div>
                                <div><strong>License:</strong> {request.business_license}</div>
                              </div>
                            ) : (
                              <div className="details">
                                <div><strong>Vehicle:</strong> {request.vehicle_type}</div>
                                <div><strong>License:</strong> {request.license_number}</div>
                                <div><strong>Address:</strong> {request.address}</div>
                              </div>
                            )}
                          </td>
                          <td>{new Date(request.created_at).toLocaleDateString()}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                onClick={() => handleApprove(request.id)}
                                disabled={loading}
                                className="btn-approve"
                              >
                                ✓ Approve
                              </button>
                              <button
                                onClick={() => handleReject(request.id)}
                                disabled={loading}
                                className="btn-reject"
                              >
                                ✗ Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === 'restaurants' && (
            <div className="admin-card">
              <h2>Restaurants Management</h2>
              {message && (
                <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
              <div className="requests-table">
                {restaurants.length === 0 ? (
                  <p className="no-data">No restaurants found</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>License</th>
                        <th>Status</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurants.map((restaurant) => (
                        <tr key={restaurant.id}>
                          <td><strong>{restaurant.name}</strong></td>
                          <td>{restaurant.email}</td>
                          <td>{restaurant.phone}</td>
                          <td>{restaurant.address}</td>
                          <td>{restaurant.business_license}</td>
                          <td>
                            <span className={`badge ${restaurant.status}`}>
                              {restaurant.status === 'open' ? '🟢 Open' : 
                               restaurant.status === 'closed' ? '🔴 Closed' : 
                               '❌ Rejected'}
                            </span>
                            {restaurant.rejection_reason && (
                              <div className="rejection-reason">
                                <small>Reason: {restaurant.rejection_reason}</small>
                              </div>
                            )}
                          </td>
                          <td>⭐ {restaurant.rating.toFixed(1)}</td>
                          <td>
                            <div className="action-buttons">
                              <select 
                                onChange={(e) => {
                                  const value = e.target.value
                                  if (value === 'rejected') {
                                    const reason = prompt('Enter rejection reason:')
                                    if (reason) handleUpdateRestaurantStatus(restaurant.id, value, reason)
                                  } else if (value) {
                                    handleUpdateRestaurantStatus(restaurant.id, value)
                                  }
                                  e.target.value = ''
                                }}
                                disabled={loading}
                                className="status-select"
                              >
                                <option value="">Change Status</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="rejected">Reject</option>
                              </select>
                              <button
                                onClick={() => handleDeleteRestaurant(restaurant.id)}
                                disabled={loading}
                                className="btn-delete"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === 'riders' && (
            <div className="admin-card">
              <h2>Riders Management</h2>
              {message && (
                <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
              <div className="requests-table">
                {riders.length === 0 ? (
                  <p className="no-data">No riders found</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Vehicle</th>
                        <th>License</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riders.map((rider) => (
                        <tr key={rider.id}>
                          <td><strong>{rider.full_name}</strong></td>
                          <td>{rider.email}</td>
                          <td>{rider.phone}</td>
                          <td>{rider.vehicle_type}</td>
                          <td>{rider.license_number}</td>
                          <td>{rider.address}</td>
                          <td>
                            <span className={`badge ${rider.status}`}>
                              {rider.status === 'available' ? '🟢 Available' : 
                               rider.status === 'unavailable' ? '🟡 Unavailable' : 
                               '❌ Rejected'}
                            </span>
                            {rider.rejection_reason && (
                              <div className="rejection-reason">
                                <small>Reason: {rider.rejection_reason}</small>
                              </div>
                            )}
                          </td>
                          <td>⭐ {rider.rating.toFixed(1)}</td>
                          <td>
                            <div className="action-buttons">
                              <select 
                                onChange={(e) => {
                                  const value = e.target.value
                                  if (value === 'rejected') {
                                    const reason = prompt('Enter rejection reason:')
                                    if (reason) handleUpdateRiderStatus(rider.id, value, reason)
                                  } else if (value) {
                                    handleUpdateRiderStatus(rider.id, value)
                                  }
                                  e.target.value = ''
                                }}
                                disabled={loading}
                                className="status-select"
                              >
                                <option value="">Change Status</option>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                                <option value="rejected">Reject</option>
                              </select>
                              <button
                                onClick={() => handleDeleteRider(rider.id)}
                                disabled={loading}
                                className="btn-delete"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'requests' && activeTab !== 'restaurants' && activeTab !== 'riders' && (
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
