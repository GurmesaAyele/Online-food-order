import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { Store, ArrowLeft } from 'lucide-react'

export default function RequestRestaurant() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    restaurant_name: '',
    business_license: '',
    restaurant_address: '',
    cuisine_type: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/requests/restaurant', formData)
      toast.success('Request submitted successfully! We will review and contact you soon.')
      setTimeout(() => navigate('/'), 2000)
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Restaurant Partner Request</h1>
            <p className="text-gray-600">
              Join our platform and reach thousands of customers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Restaurant Name *</label>
              <input
                type="text"
                name="restaurant_name"
                value={formData.restaurant_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Business License Number</label>
              <input
                type="text"
                name="business_license"
                value={formData.business_license}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Restaurant Address *</label>
              <textarea
                name="restaurant_address"
                value={formData.restaurant_address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Cuisine Type *</label>
              <select
                name="cuisine_type"
                value={formData.cuisine_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select cuisine type</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Indian">Indian</option>
                <option value="Mexican">Mexican</option>
                <option value="Japanese">Japanese</option>
                <option value="American">American</option>
                <option value="Thai">Thai</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>What happens next?</strong><br />
                Our team will review your application within 2-3 business days. 
                If approved, you'll receive an email with login credentials and instructions to set up your restaurant dashboard.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
