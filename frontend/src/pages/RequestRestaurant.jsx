import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './RequestRestaurant.css'

function RequestRestaurant() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    restaurant_name: '',
    restaurant_address: '',
    business_license: '',
    additional_info: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await axios.post('http://localhost:8000/api/requests/restaurant', formData)
      setSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Request submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="request-restaurant-page">
        <div className="request-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Request Submitted Successfully!</h2>
            <p>Thank you for your interest in partnering with us.</p>
            <p>Our admin team will review your application and contact you within 2-3 business days.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="request-restaurant-page">
      <div className="request-container">
        <h2>Restaurant Partner Request</h2>
        <p className="request-subtitle">Join our platform and reach thousands of customers!</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Owner Full Name *</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Restaurant Name *</label>
              <input
                type="text"
                value={formData.restaurant_name}
                onChange={(e) => setFormData({...formData, restaurant_name: e.target.value})}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Restaurant Address *</label>
            <input
              type="text"
              value={formData.restaurant_address}
              onChange={(e) => setFormData({...formData, restaurant_address: e.target.value})}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Business License Number *</label>
            <input
              type="text"
              value={formData.business_license}
              onChange={(e) => setFormData({...formData, business_license: e.target.value})}
              required
              disabled={loading}
              placeholder="Enter your business license or registration number"
            />
          </div>

          <div className="form-group">
            <label>Additional Information</label>
            <textarea
              value={formData.additional_info}
              onChange={(e) => setFormData({...formData, additional_info: e.target.value})}
              disabled={loading}
              rows="4"
              placeholder="Tell us more about your restaurant (cuisine type, operating hours, etc.)"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting Request...' : 'Submit Request'}
          </button>
        </form>

        <div className="request-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
          <p><Link to="/">Back to Home</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RequestRestaurant
