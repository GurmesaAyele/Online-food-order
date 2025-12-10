import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SettingsPanel from '../components/SettingsPanel'
import './RestaurantDashboard.css'

function RestaurantDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [activeTab, setActiveTab] = useState('menu')
  const [darkMode, setDarkMode] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [orders, setOrders] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showRestaurantPicModal, setShowRestaurantPicModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const [restaurantPic, setRestaurantPic] = useState(null)
  const [menuItemPic, setMenuItemPic] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    meal_type: '',
    dietary_type: '',
    available: true,
    image: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [restaurantProfile, setRestaurantProfile] = useState({
    name: '',
    address: '',
    phone: '',
    cuisine_type: '',
    description: '',
    images: ''
  })

  useEffect(() => {
    const authData = localStorage.getItem('auth-storage')
    if (authData) {
      const { state } = JSON.parse(authData)
      if (state.user && state.user.role === 'restaurant') {
        setUser(state.user)
        setToken(state.token)
        fetchMenuItems(state.token)
        fetchOrders(state.token)
        fetchRestaurantProfile(state.token)
      } else {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }

    // Load preferences
    const savedDarkMode = localStorage.getItem('restaurant-dark-mode') === 'true'
    setDarkMode(savedDarkMode)
    setProfilePic(localStorage.getItem('restaurant-profile-pic'))
    setRestaurantPic(localStorage.getItem('restaurant-pic'))
  }, [navigate])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const fetchMenuItems = async (authToken) => {
    try {
      const response = await axios.get('http://localhost:8000/api/restaurant/menu', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setMenuItems(response.data)
    } catch (error) {
      console.error('Error fetching menu:', error)
    }
  }

  const fetchOrders = async (authToken) => {
    try {
      const response = await axios.get('http://localhost:8000/api/restaurant/orders', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const fetchRestaurantProfile = async (authToken) => {
    try {
      const response = await axios.get('http://localhost:8000/api/restaurant/profile', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setRestaurantProfile(response.data)
      
      // Also set restaurant image if it exists in database
      if (response.data.images) {
        setRestaurantPic(response.data.images)
        localStorage.setItem('restaurant-pic', response.data.images)
      }
    } catch (error) {
      console.error('Error fetching restaurant profile:', error)
    }
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('restaurant-dark-mode', newMode.toString())
  }

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePic(reader.result)
        localStorage.setItem('restaurant-profile-pic', reader.result)
        setShowProfileModal(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRestaurantPicChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const imageData = reader.result
        setRestaurantPic(imageData)
        localStorage.setItem('restaurant-pic', imageData)
        
        // Also save to database
        try {
          await axios.put(
            'http://localhost:8000/api/restaurant/profile',
            { images: imageData },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          setMessage('✅ Restaurant image updated successfully!')
          setTimeout(() => setMessage(''), 3000)
        } catch (error) {
          console.error('Error updating restaurant image:', error)
          setMessage('❌ Failed to update restaurant image')
        }
        
        setShowRestaurantPicModal(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleMenuItemPicChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMenuItemPic(reader.result)
        setFormData({...formData, image: reader.result})
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddItem = () => {
    setEditingItem(null)
    setMenuItemPic(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      meal_type: '',
      dietary_type: '',
      available: true,
      image: ''
    })
    setShowAddModal(true)
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setMenuItemPic(item.image)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      meal_type: item.meal_type || '',
      dietary_type: item.dietary_type || '',
      available: item.available === 1,
      image: item.image || ''
    })
    setShowAddModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const submitData = { ...formData, available: formData.available ? 1 : 0 }
      
      if (editingItem) {
        await axios.put(
          `http://localhost:8000/api/restaurant/menu/${editingItem.id}`,
          submitData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setMessage('✅ Menu item updated successfully!')
      } else {
        await axios.post(
          'http://localhost:8000/api/restaurant/menu',
          submitData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setMessage('✅ Menu item added successfully!')
      }
      setShowAddModal(false)
      setMenuItemPic(null)
      fetchMenuItems(token)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Full error:', error)
      console.error('Error response:', error.response)
      const errorMsg = error.response?.data?.detail || error.response?.data?.message || error.message || 'Operation failed'
      setMessage('❌ ' + errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return

    try {
      await axios.delete(`http://localhost:8000/api/restaurant/menu/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('✅ Menu item deleted successfully!')
      fetchMenuItems(token)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Delete failed'))
    }
  }

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8000/api/restaurant/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Order status updated!')
      fetchOrders(token)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ Failed to update order status')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth-storage')
    navigate('/')
  }

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser)
    const authData = JSON.parse(localStorage.getItem('auth-storage'))
    authData.state.user = updatedUser
    localStorage.setItem('auth-storage', JSON.stringify(authData))
  }

  const handleRestaurantUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await axios.put(
        'http://localhost:8000/api/restaurant/profile',
        restaurantProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Restaurant information updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Full error:', error)
      const errorMsg = error.response?.data?.detail || error.response?.data?.message || error.message || 'Update failed'
      setMessage('❌ ' + errorMsg)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <div className="loading">Loading...</div>

  console.log('RestaurantDashboard rendering, activeTab:', activeTab)

  return (
    <div className={`restaurant-dashboard ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className="restaurant-sidebar">
        <div className="sidebar-header">
          <div className="profile-section">
            <div className="profile-pic-container" onClick={() => setShowProfileModal(true)}>
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="profile-pic" />
              ) : (
                <div className="profile-pic-placeholder">
                  {user.full_name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="profile-pic-overlay">📷</div>
            </div>
            <h3>{user.full_name}</h3>
            <p className="user-email">{user.email}</p>
          </div>

          <div className="restaurant-pic-section" onClick={() => setShowRestaurantPicModal(true)}>
            {restaurantPic ? (
              <img src={restaurantPic} alt="Restaurant" className="restaurant-pic" />
            ) : (
              <div className="restaurant-pic-placeholder">
                🏪 Add Restaurant Photo
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => {
              console.log('Menu clicked')
              setActiveTab('menu')
            }}
          >
            <span className="nav-icon">📋</span>
            Menu Items
          </button>
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => {
              console.log('Orders clicked')
              setActiveTab('orders')
            }}
          >
            <span className="nav-icon">📦</span>
            Orders
          </button>
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => {
              console.log('Analytics clicked')
              setActiveTab('analytics')
            }}
          >
            <span className="nav-icon">📊</span>
            Analytics
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => {
              console.log('Settings clicked')
              setActiveTab('settings')
            }}
          >
            <span className="nav-icon">⚙️</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="restaurant-main">
        <div className="main-header">
          <div>
            <h1>Restaurant Dashboard</h1>
            <p>Manage your menu and orders</p>
          </div>
        </div>

        {message && (
          <div className={`alert ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Menu Items</h2>
              <button onClick={handleAddItem} className="btn-primary">
                ➕ Add New Item
              </button>
            </div>

            <div className="menu-grid">
              {menuItems.length === 0 ? (
                <div className="empty-state">
                  <p>No menu items yet. Add your first item!</p>
                </div>
              ) : (
                menuItems.map((item) => (
                  <div key={item.id} className="menu-card">
                    {item.image && (
                      <div className="menu-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                    )}
                    <div className="menu-card-header">
                      <h3>{item.name}</h3>
                      <span className={`status ${item.available ? 'available' : 'unavailable'}`}>
                        {item.available ? '✓ Available' : '✗ Unavailable'}
                      </span>
                    </div>
                    <p className="menu-description">{item.description}</p>
                    <div className="menu-tags">
                      {item.category && <span className="tag category">{item.category}</span>}
                      {item.meal_type && <span className="tag meal">{item.meal_type}</span>}
                      {item.dietary_type && <span className="tag dietary">{item.dietary_type}</span>}
                    </div>
                    <div className="menu-details">
                      <span className="price">${parseFloat(item.price).toFixed(2)}</span>
                    </div>
                    <div className="menu-actions">
                      <button onClick={() => handleEditItem(item)} className="btn-edit">
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="btn-delete">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="content-section">
            <h2>Orders</h2>
            <div className="orders-list">
              {orders.length === 0 ? (
                <div className="empty-state">
                  <p>No orders yet. Orders will appear here when customers place them.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <h3>Order #{order.id}</h3>
                      <span className={`order-status ${order.status}`}>{order.status}</span>
                    </div>
                    <div className="order-details">
                      <p><strong>Customer:</strong> {order.customer_name}</p>
                      <p><strong>Items:</strong> {order.items}</p>
                      <p><strong>Total:</strong> ${order.total}</p>
                      <p><strong>Time:</strong> {new Date(order.created_at).toLocaleString()}</p>
                    </div>
                    <div className="order-actions">
                      <select 
                        value={order.status}
                        onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="content-section">
            <h2>Analytics Dashboard</h2>
            <div className="stats-grid">
              <div className="stat-card stat-primary">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h3>Total Orders</h3>
                  <p className="stat-value">{orders.length}</p>
                  <span className="stat-label">All time</span>
                </div>
              </div>
              <div className="stat-card stat-success">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>Total Revenue</h3>
                  <p className="stat-value">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</p>
                  <span className="stat-label">All time</span>
                </div>
              </div>
              <div className="stat-card stat-warning">
                <div className="stat-icon">⏳</div>
                <div className="stat-info">
                  <h3>Pending Orders</h3>
                  <p className="stat-value">{orders.filter(o => o.status === 'pending').length}</p>
                  <span className="stat-label">Needs attention</span>
                </div>
              </div>
              <div className="stat-card stat-info">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>Completed</h3>
                  <p className="stat-value">{orders.filter(o => o.status === 'delivered').length}</p>
                  <span className="stat-label">Successfully delivered</span>
                </div>
              </div>
            </div>

            <div className="analytics-charts">
              <div className="chart-card">
                <h3>Order Status Distribution</h3>
                <div className="bar-chart">
                  {['pending', 'preparing', 'ready', 'delivered'].map(status => {
                    const count = orders.filter(o => o.status === status).length
                    const percentage = orders.length > 0 ? (count / orders.length) * 100 : 0
                    return (
                      <div key={status} className="bar-item">
                        <div className="bar-label">{status}</div>
                        <div className="bar-container">
                          <div 
                            className={`bar bar-${status}`} 
                            style={{width: `${percentage}%`}}
                          >
                            <span className="bar-value">{count}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="chart-card">
                <h3>Menu Statistics</h3>
                <div className="bar-chart">
                  <div className="bar-item">
                    <div className="bar-label">Total Items</div>
                    <div className="bar-container">
                      <div className="bar bar-total" style={{width: '100%'}}>
                        <span className="bar-value">{menuItems.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bar-item">
                    <div className="bar-label">Available</div>
                    <div className="bar-container">
                      <div 
                        className="bar bar-available" 
                        style={{width: `${menuItems.length > 0 ? (menuItems.filter(i => i.available).length / menuItems.length) * 100 : 0}%`}}
                      >
                        <span className="bar-value">{menuItems.filter(i => i.available).length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bar-item">
                    <div className="bar-label">Unavailable</div>
                    <div className="bar-container">
                      <div 
                        className="bar bar-unavailable" 
                        style={{width: `${menuItems.length > 0 ? (menuItems.filter(i => !i.available).length / menuItems.length) * 100 : 0}%`}}
                      >
                        <span className="bar-value">{menuItems.filter(i => !i.available).length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>Average Order Value</h3>
                <div className="avg-order-value">
                  <div className="avg-value-display">
                    <span className="currency">$</span>
                    <span className="value">
                      {orders.length > 0 
                        ? (orders.reduce((sum, o) => sum + o.total, 0) / orders.length).toFixed(2)
                        : '0.00'
                      }
                    </span>
                  </div>
                  <p className="avg-description">Per order average</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="content-section">
            <h2>Restaurant Settings</h2>
            
            <div className="settings-tabs">
              <div className="settings-section">
                <h3>Restaurant Information</h3>
                <form className="restaurant-info-form" onSubmit={handleRestaurantUpdate}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Restaurant Name</label>
                      <input
                        type="text"
                        placeholder="Enter restaurant name"
                        className="form-input"
                        value={restaurantProfile.name || ''}
                        onChange={(e) => setRestaurantProfile({...restaurantProfile, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Cuisine Type</label>
                      <select 
                        className="form-input"
                        value={restaurantProfile.cuisine_type || ''}
                        onChange={(e) => setRestaurantProfile({...restaurantProfile, cuisine_type: e.target.value})}
                      >
                        <option value="">Select cuisine type</option>
                        <option value="Ethiopian">Ethiopian</option>
                        <option value="Italian">Italian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Indian">Indian</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Continental">Continental</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        placeholder="Enter restaurant address"
                        className="form-input"
                        value={restaurantProfile.address || ''}
                        onChange={(e) => setRestaurantProfile({...restaurantProfile, address: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        className="form-input"
                        value={restaurantProfile.phone || ''}
                        onChange={(e) => setRestaurantProfile({...restaurantProfile, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Restaurant Info'}
                  </button>
                </form>
              </div>
              
              <div className="settings-section">
                <h3>Account Settings</h3>
                <SettingsPanel user={user} token={token} onUpdate={handleUserUpdate} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Menu Item Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
              <button onClick={() => setShowAddModal(false)} className="modal-close">✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Image Upload */}
                <div className="form-group">
                  <label>Item Photo</label>
                  <div className="image-upload-container">
                    {menuItemPic ? (
                      <img src={menuItemPic} alt="Preview" className="image-preview" />
                    ) : (
                      <div className="image-placeholder">📷 Add Photo</div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMenuItemPicChange}
                      id="menu-item-pic"
                      style={{display: 'none'}}
                    />
                    <label htmlFor="menu-item-pic" className="upload-label">
                      Choose Photo
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Item Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    disabled={loading}
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                      disabled={loading}
                    >
                      <option value="">Select category</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Beverage">Beverage</option>
                      <option value="Side Dish">Side Dish</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Meal Type</label>
                    <select
                      value={formData.meal_type}
                      onChange={(e) => setFormData({...formData, meal_type: e.target.value})}
                      disabled={loading}
                    >
                      <option value="">Select meal type</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Snack">Snack</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Dietary Type</label>
                    <select
                      value={formData.dietary_type}
                      onChange={(e) => setFormData({...formData, dietary_type: e.target.value})}
                      disabled={loading}
                    >
                      <option value="">Select dietary type</option>
                      <option value="Non-Fasting">Non-Fasting</option>
                      <option value="Fasting">Fasting</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData({...formData, available: e.target.checked})}
                      disabled={loading}
                    />
                    Available for order
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary" disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingItem ? 'Update Item' : 'Add Item')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Picture Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Update Profile Picture</h2>
              <button onClick={() => setShowProfileModal(false)} className="modal-close">✕</button>
            </div>
            <div className="modal-body">
              <div className="current-pic">
                {profilePic ? (
                  <img src={profilePic} alt="Current" />
                ) : (
                  <div className="pic-placeholder-large">
                    {user.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                id="profile-pic-input"
                style={{display: 'none'}}
              />
              <label htmlFor="profile-pic-input" className="upload-btn">
                📷 Choose Photo
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Picture Modal */}
      {showRestaurantPicModal && (
        <div className="modal-overlay" onClick={() => setShowRestaurantPicModal(false)}>
          <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Update Restaurant Photo</h2>
              <button onClick={() => setShowRestaurantPicModal(false)} className="modal-close">✕</button>
            </div>
            <div className="modal-body">
              <div className="current-pic restaurant">
                {restaurantPic ? (
                  <img src={restaurantPic} alt="Restaurant" />
                ) : (
                  <div className="pic-placeholder-large">🏪</div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleRestaurantPicChange}
                id="restaurant-pic-input"
                style={{display: 'none'}}
              />
              <label htmlFor="restaurant-pic-input" className="upload-btn">
                📷 Choose Photo
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RestaurantDashboard
