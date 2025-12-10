import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './RestaurantMenu.css'

function RestaurantMenu() {
  const { restaurantId } = useParams()
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMealType, setSelectedMealType] = useState('all')
  const [selectedDietaryType, setSelectedDietaryType] = useState('all')
  const [cart, setCart] = useState([])
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'

  useEffect(() => {
    fetchRestaurantData()
  }, [restaurantId])

  useEffect(() => {
    filterMenuItems()
  }, [menuItems, selectedMealType, selectedDietaryType])

  const fetchRestaurantData = async () => {
    try {
      // Fetch restaurant details with menu
      const response = await axios.get(`http://localhost:8000/api/customer/restaurants/${restaurantId}`)
      const data = response.data
      
      // Set restaurant info
      setRestaurant({
        id: data.id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        cuisine_type: data.cuisine_type,
        rating: data.rating,
        images: data.images?.[0] || null, // Take first image
        payment_methods: data.payment_methods
      })
      
      // Set menu items
      setMenuItems(data.menu || [])
    } catch (error) {
      console.error('Error fetching restaurant data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterMenuItems = () => {
    let filtered = menuItems

    if (selectedMealType !== 'all') {
      filtered = filtered.filter(item => {
        // Check if meal_types array includes the selected type
        if (item.meal_types && Array.isArray(item.meal_types)) {
          return item.meal_types.includes(selectedMealType)
        }
        return false
      })
    }

    if (selectedDietaryType !== 'all') {
      filtered = filtered.filter(item => 
        item.dietary_type === selectedDietaryType
      )
    }

    setFilteredItems(filtered)
  }

  const addToCart = (item) => {
    // Check if user is logged in
    const authData = localStorage.getItem('auth-storage')
    if (!authData) {
      setShowAuthModal(true)
      return
    }

    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== itemId))
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleAuth = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    // Redirect to customer dashboard or reload page
    window.location.reload()
  }

  const proceedToCheckout = () => {
    // Save cart to localStorage and redirect to customer dashboard
    const authData = JSON.parse(localStorage.getItem('auth-storage'))
    if (authData && authData.state.user) {
      localStorage.setItem(`cart_${authData.state.user.id}`, JSON.stringify(cart))
      navigate('/customer-dashboard')
    }
  }

  if (loading) {
    return (
      <div className="restaurant-menu-loading">
        <div className="spinner"></div>
        <p>Loading restaurant menu...</p>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="restaurant-not-found">
        <h2>Restaurant not found</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="restaurant-menu-page">
      {/* Header */}
      <header className="menu-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Restaurants
        </button>
        <div className="restaurant-info">
          <div className="restaurant-image">
            {restaurant.images ? (
              <img src={restaurant.images} alt={restaurant.name} />
            ) : (
              <div className="restaurant-image-placeholder">
                🏪 {restaurant.name}
              </div>
            )}
          </div>
          <div className="restaurant-details">
            <h1>{restaurant.name}</h1>
            <p className="cuisine-type">{restaurant.cuisine_type || 'Various Cuisines'}</p>
            <p className="restaurant-address">📍 {restaurant.address}</p>
            <p className="restaurant-phone">📞 {restaurant.phone}</p>
            <div className="restaurant-rating">⭐ {restaurant.rating.toFixed(1)}</div>
          </div>
        </div>
      </header>

      <div className="menu-content">
        {/* Filters */}
        <div className="menu-filters">
          <div className="filter-group">
            <h3>Meal Type</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${selectedMealType === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedMealType('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${selectedMealType === 'breakfast' ? 'active' : ''}`}
                onClick={() => setSelectedMealType('breakfast')}
              >
                🌅 Breakfast
              </button>
              <button 
                className={`filter-btn ${selectedMealType === 'lunch' ? 'active' : ''}`}
                onClick={() => setSelectedMealType('lunch')}
              >
                🍽️ Lunch
              </button>
              <button 
                className={`filter-btn ${selectedMealType === 'dinner' ? 'active' : ''}`}
                onClick={() => setSelectedMealType('dinner')}
              >
                🌙 Dinner
              </button>
              <button 
                className={`filter-btn ${selectedMealType === 'snack' ? 'active' : ''}`}
                onClick={() => setSelectedMealType('snack')}
              >
                🍿 Snack
              </button>
            </div>
          </div>

          <div className="filter-group">
            <h3>Dietary Type</h3>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${selectedDietaryType === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedDietaryType('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${selectedDietaryType === 'fasting' ? 'active' : ''}`}
                onClick={() => setSelectedDietaryType('fasting')}
              >
                🥗 Fasting
              </button>
              <button 
                className={`filter-btn ${selectedDietaryType === 'non_fasting' ? 'active' : ''}`}
                onClick={() => setSelectedDietaryType('non_fasting')}
              >
                🍖 Non-Fasting
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="menu-items">
          <h2>Menu Items ({filteredItems.length})</h2>
          {filteredItems.length === 0 ? (
            <div className="no-items">
              <p>No items found for the selected filters.</p>
            </div>
          ) : (
            <div className="menu-grid">
              {filteredItems.map((item) => (
                <div key={item.id} className="menu-item-card">
                  {item.image && (
                    <div className="menu-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                  )}
                  <div className="menu-item-content">
                    <h3>{item.name}</h3>
                    <p className="menu-item-description">{item.description}</p>
                    <div className="menu-item-tags">
                      {item.meal_types && item.meal_types.map((mealType, index) => (
                        <span key={index} className="tag meal-tag">{mealType}</span>
                      ))}
                      {item.dietary_type && (
                        <span className="tag dietary-tag">{item.dietary_type.replace('_', '-')}</span>
                      )}
                    </div>
                    <div className="menu-item-footer">
                      <span className="price">${parseFloat(item.price).toFixed(2)}</span>
                      <button 
                        className="btn btn-primary add-to-cart-btn"
                        onClick={() => addToCart(item)}
                        disabled={!item.available}
                      >
                        {item.available ? 'Add to Cart' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      {cart.length > 0 && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h3>Your Cart ({cart.length})</h3>
          </div>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>${parseFloat(item.price).toFixed(2)}</p>
                </div>
                <div className="cart-item-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
            </div>
            <button 
              className="btn btn-primary btn-block"
              onClick={proceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header">
              <h2>{authMode === 'login' ? 'Login Required' : 'Create Account'}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowAuthModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="auth-modal-content">
              <p>Please {authMode === 'login' ? 'login' : 'create an account'} to add items to your cart.</p>
              <div className="auth-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => navigate('/register')}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RestaurantMenu