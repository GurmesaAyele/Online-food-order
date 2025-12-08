import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">FoodHub</h1>
          <div className="nav-links">
            <Link to="/login" className="btn">Login</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <h1>Delicious Food, Delivered Fast 🍕</h1>
          <p>Order from your favorite restaurants</p>
          <Link to="/login" className="btn btn-primary">Get Started</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
