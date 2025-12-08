import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', formData)
      const { user, access_token } = response.data

      // Store auth data
      localStorage.setItem('auth-storage', JSON.stringify({
        state: {
          user,
          token: access_token
        }
      }))

      // Redirect based on role
      switch(user.role) {
        case 'customer':
          navigate('/customer-dashboard')
          break
        case 'restaurant':
          navigate('/restaurant-dashboard')
          break
        case 'rider':
          navigate('/rider-dashboard')
          break
        case 'admin':
          navigate('/admin-dashboard')
          break
        default:
          navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Login to access your dashboard</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="test-accounts">
          <p style={{fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem', fontWeight: '600'}}>🔐 Test Accounts (Password: admin123)</p>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem', color: '#888'}}>
            <div>👤 customer@test.com</div>
            <div>🏪 restaurant@test.com</div>
            <div>🚴 rider@test.com</div>
            <div>⚙️ admin@foodhub.com</div>
          </div>
        </div>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Sign up as Customer</Link></p>
          <p className="partner-links">
            <Link to="/request-restaurant">Restaurant Owner?</Link> | 
            <Link to="/request-rider"> Become a Rider</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
