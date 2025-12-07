import { useState, useEffect } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { Search, Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react'

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      const response = await api.get('/restaurants')
      setRestaurants(response.data)
    } catch (error) {
      toast.error('Failed to fetch restaurants')
    }
  }

  const handleVerify = async (restaurantId, isVerified) => {
    try {
      await api.patch(`/admin/restaurants/${restaurantId}`, { is_verified: !isVerified })
      toast.success(`Restaurant ${!isVerified ? 'verified' : 'unverified'} successfully`)
      fetchRestaurants()
    } catch (error) {
      toast.error('Failed to update restaurant')
    }
  }

  const handleDelete = async (restaurantId) => {
    if (!confirm('Are you sure you want to delete this restaurant?')) return

    try {
      await api.delete(`/admin/restaurants/${restaurantId}`)
      toast.success('Restaurant deleted successfully')
      fetchRestaurants()
    } catch (error) {
      toast.error('Failed to delete restaurant')
    }
  }

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'verified' && restaurant.is_verified) ||
                         (statusFilter === 'unverified' && !restaurant.is_verified)
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Restaurant Management</h1>
          <p className="admin-page-subtitle">Manage and verify restaurants</p>
        </div>
      </div>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search restaurants..."
          className="admin-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="admin-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </select>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2 className="admin-table-title">All Restaurants ({filteredRestaurants.length})</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRestaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <td>#{restaurant.id}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.cuisine_type || 'N/A'}</td>
                <td>⭐ {restaurant.rating?.toFixed(1) || '0.0'}</td>
                <td>
                  <span className={`admin-badge ${restaurant.is_active ? 'active' : 'inactive'}`}>
                    {restaurant.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleVerify(restaurant.id, restaurant.is_verified)}
                    className={`admin-badge ${restaurant.is_verified ? 'verified' : 'pending'}`}
                    style={{ cursor: 'pointer', border: 'none' }}
                  >
                    {restaurant.is_verified ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {restaurant.is_verified ? ' Verified' : ' Pending'}
                  </button>
                </td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-action-btn view">
                      <Eye size={16} />
                    </button>
                    <button className="admin-action-btn edit">
                      <Edit size={16} />
                    </button>
                    <button 
                      className="admin-action-btn delete"
                      onClick={() => handleDelete(restaurant.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
