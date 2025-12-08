import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
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

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-icon">🔍</div>
              <h3>Choose Restaurant</h3>
              <p>Browse hundreds of restaurants</p>
            </div>
            <div className="step">
              <div className="step-icon">🛒</div>
              <h3>Place Order</h3>
              <p>Add items and checkout</p>
            </div>
            <div className="step">
              <div className="step-icon">🚴</div>
              <h3>Get Delivered</h3>
              <p>Track in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="feature-grid">
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Fast Delivery</h3>
              <p>30 minutes or less</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⭐</div>
              <h3>Top Restaurants</h3>
              <p>Best in your area</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📍</div>
              <h3>Live Tracking</h3>
              <p>Real-time updates</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% safe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="partner-section">
        <div className="container">
          <h2>Partner With Us</h2>
          <div className="partner-cards">
            <Link to="/request-restaurant" className="partner-card">
              <div className="partner-icon">🏪</div>
              <h3>Restaurant Owner?</h3>
              <p>Join our platform and reach thousands of customers</p>
              <span className="link-text">Request to Join →</span>
            </Link>
            <Link to="/request-rider" className="partner-card">
              <div className="partner-icon">🚴</div>
              <h3>Become a Rider</h3>
              <p>Earn money with flexible hours</p>
              <span className="link-text">Apply Now →</span>
            </Link>
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
