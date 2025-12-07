import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Bike } from 'lucide-react'
import api from '../api/axios'
import { useAuthStore } from '../store/authStore'

export default function Login() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { data } = await api.post('/auth/login', formData)
      if (data.user.role !== 'rider') {
        toast.error('Access denied. Rider account required.')
        return
      }
      setAuth(data.user, data.access_token)
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="card p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-primary p-4 rounded-full">
            <Bike className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8">Rider Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600 text-sm">
          Need an account? Contact admin for registration
        </p>
      </div>
    </div>
  )
}
