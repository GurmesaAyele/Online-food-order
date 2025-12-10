import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './CustomerDashboard.css'

function CustomerDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [activeSection, setActiveSection] = useState('restaurants')
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const authData = localStorage.getItem('auth-storage')
    if (authData) {
      const { state } = JSON.parse(authData)
      if (state.user && state.user.role === 'customer') {
        setUser(state.user)
        setToken(state.token)
        fetchRestaurants()
        // Load cart from localStorage
        const savedCart = localStorage.getItem(`cart_${state.user.id}`)
        if (savedCart) {
          setCart(JSON.parse(savedCart))
        }
      } else {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }, [navigate])

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/restaurant/all')
      setRestaurants(response.data)
    } catch (error) {
      console.error('Error fetching restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth-storage')
    navigate('/')
  }

  const scrollToSection = (section) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="customer-dashboard">
      {/* Navbar - Same style as homepage */}
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">🍕 FoodHub</h1>
          <div className="nav-links">
            <button onClick={() => scrollToSection('restaurants')} className="nav-link-btn">
              Restaurants
            </button>
            <button onClick={() => scrollToSection('orders')} className="nav-link-btn">
              My Orders
            </button>
            <button onClick={() => scrollToSection('cart')} className="nav-link-btn">
              Cart {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
            </button>
            <div className="user-menu">
              <span className="user-name">👤 {user.full_name}</span>
              <button onClick={handleLogout} className="btn btn-outline">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Personalized */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome back, {user.full_name}! 🍕</h1>
          <p>Order from your favorite restaurants and get it delivered to your doorstep</p>
          <button onClick={() => scrollToSection('restaurants')} className="btn btn-large btn-primary">
            Browse Restaurants
          </button>
        </div>
      </section>

      {/* Restaurants Section - Same as homepage */}
      <section id="restaurants" className="restaurants-section">
        <h2 className="section-title">Available Restaurants</h2>
        <p className="section-subtitle">Discover amazing restaurants near you</p>
        
        {loading ? (
          <div className="loading">Loading restaurants...</div>
        ) : restaurants.length === 0 ? (
          <div className="no-restaurants">
            <p>No restaurants available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="restaurants-grid">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                {/* Restaurant Image */}
                <div className="restaurant-image">
                  {restaurant.images ? (
                    <img src={restaurant.images} alt={restaurant.name} />
                  ) : (
                    <div className="restaurant-image-placeholder">
                      🏪 {restaurant.name}
                    </div>
                  )}
                </div>
                
                <div className="restaurant-header">
                  <h3>{restaurant.name}</h3>
                  <div className="restaurant-rating">
                    ⭐ {restaurant.rating.toFixed(1)}
                  </div>
                </div>
                <div className="restaurant-info">
                  <p className="restaurant-cuisine">
                    {restaurant.cuisine_type || 'Various Cuisines'}
                  </p>
                  <p className="restaurant-address">
                    📍 {restaurant.address}
                  </p>
                  <p className="restaurant-phone">
                    📞 {restaurant.phone}
                  </p>
                </div>
                <div className="restaurant-footer">
                  <span className="restaurant-status">🟢 Open</span>
                  <Link to={`/restaurant/${restaurant.id}`} className="btn btn-small btn-primary">View Menu</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Orders Section */}
      <section id="orders" className="orders-section">
        <h2 className="section-title">My Orders</h2>
        <p className="section-subtitle">Track your order history and status</p>
        
        <div className="orders-container">
          {orders.length === 0 ? (
            <div className="no-orders">
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No orders yet</h3>
                <p>Start ordering from your favorite restaurants!</p>
                <button onClick={() => scrollToSection('restaurants')} className="btn btn-primary">
                  Browse Restaurants
                </button>
              </div>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`order-status status-${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p>Restaurant: {order.restaurant_name}</p>
                    <p>Total: ${order.total_amount}</p>
                    <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <button className="btn btn-small">View Details</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart Section */}
      <section id="cart" className="cart-section">
        <h2 className="section-title">Shopping Cart</h2>
        <p className="section-subtitle">Review your items before checkout</p>
        
        <div className="cart-container">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-state">
                <div className="empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add items from restaurants to get started!</p>
                <button onClick={() => scrollToSection('restaurants')} className="btn btn-primary">
                  Browse Restaurants
                </button>
              </div>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price}</p>
                    </div>
                    <div className="item-quantity">
                      <button className="qty-btn">-</button>
                      <span>{item.quantity}</span>
                      <button className="qty-btn">+</button>
                    </div>
                    <button className="remove-btn">Remove</button>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>$0.00</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>$2.00</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>$2.00</span>
                </div>
                <button className="btn btn-primary btn-block">Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer - Same as homepage */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>FoodHub</h3>
              <p>Delicious food delivered to your doorstep</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <button onClick={() => scrollToSection('restaurants')} className="footer-link">Restaurants</button>
              <button onClick={() => scrollToSection('orders')} className="footer-link">My Orders</button>
              <button onClick={() => scrollToSection('cart')} className="footer-link">Cart</button>
            </div>
            <div className="footer-section">
              <h4>Account</h4>
              <a href="#profile">Profile Settings</a>
              <a href="#" onClick={handleLogout}>Logout</a>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 FoodHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CustomerDashboard
