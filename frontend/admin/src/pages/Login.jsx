import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { Shield, Mail, Lock } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      toast.success('Welcome back, Admin!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.detail || error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <Shield size={40} />
        </div>
        <h1 className="admin-login-title">Admin Portal</h1>
        <p className="admin-login-subtitle">
          Sign in to access the control panel
        </p>

        <form onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <label className="admin-input-label">
              <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Email Address
            </label>
            <input
              type="email"
              className="admin-input"
              placeholder="admin@foodhub.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-input-group">
            <label className="admin-input-label">
              <Lock size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Password
            </label>
            <input
              type="password"
              className="admin-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="admin-btn-login"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
          <p>Default: admin@foodhub.com / admin123</p>
        </div>
      </div>
    </div>
  )
}
