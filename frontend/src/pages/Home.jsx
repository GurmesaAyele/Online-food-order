import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'

function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRestaurants()
  }, [])

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

  return (
    <div className="home">
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">🍕 FoodHub</h1>
          <div className="nav-links">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Delicious Food, Delivered Fast 🍕</h1>
          <p>Order from your favorite restaurants and get it delivered to your doorstep</p>
          <Link to="/register" className="btn btn-large btn-primary">Order Now</Link>
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="restaurants-section">
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
                  <Link to={`/restaurant/${restaurant.id}`} className="btn btn-small">View Menu</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Get your favorite food delivered in just three simple steps</p>
        <div className="steps">
          <div className="step">
            <div className="step-icon">🔍</div>
            <h3>Choose Restaurant</h3>
            <p>Browse hundreds of restaurants and discover amazing dishes near you</p>
          </div>
          <div className="step">
            <div className="step-icon">🛒</div>
            <h3>Place Order</h3>
            <p>Add your favorite items to cart and checkout securely</p>
          </div>
          <div className="step">
            <div className="step-icon">🚴</div>
            <h3>Get Delivered</h3>
            <p>Track your order in real-time and enjoy hot, fresh food</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2 className="section-title">Why Choose Us</h2>
        <p className="section-subtitle">We provide the best food delivery experience with unmatched quality and service</p>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast Delivery</h3>
            <p>Get your food delivered in 30 minutes or less. We value your time and ensure quick service.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⭐</div>
            <h3>Top Rated Restaurants</h3>
            <p>Partner with the best restaurants in your area. Quality food from trusted sources.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📍</div>
            <h3>Real-Time Tracking</h3>
            <p>Track your order from restaurant to doorstep. Know exactly when your food arrives.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payments</h3>
            <p>100% safe and secure payment options. Your financial information is always protected.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Competitive pricing with regular discounts and offers. Great value for your money.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>Wide Selection</h3>
            <p>Choose from hundreds of restaurants and thousands of dishes. Something for everyone.</p>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="partner">
        <h2 className="section-title">Partner With Us</h2>
        <p className="section-subtitle">Join our growing network and be part of the food delivery revolution</p>
        <div className="partner-options">
          <div className="partner-card">
            <h3>🏪 Restaurant Owner</h3>
            <p>Expand your business and reach thousands of hungry customers. Increase your revenue with our platform.</p>
            <Link to="/request-restaurant" className="btn">Join as Restaurant</Link>
          </div>
          <div className="partner-card">
            <h3>🚴 Delivery Rider</h3>
            <p>Earn money on your schedule with flexible hours. Be your own boss and make great income.</p>
            <Link to="/request-rider" className="btn">Become a Rider</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>FoodHub</h3>
              <p>Delicious food delivered to your doorstep</p>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Careers</a>
            </div>
            <div className="footer-section">
              <h4>For Partners</h4>
              <Link to="/request-restaurant">Partner with us</Link>
              <Link to="/request-rider">Become a rider</Link>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
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

export default Home
