import { useState, useEffect } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { Search, Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react'

export default function Riders() {
  const [riders, setRiders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchRiders()
  }, [])

  const fetchRiders = async () => {
    try {
      const response = await api.get('/admin/riders')
      setRiders(response.data)
    } catch (error) {
      toast.error('Failed to fetch riders')
    }
  }

  const handleVerify = async (riderId, isVerified) => {
    try {
      await api.patch(`/admin/riders/${riderId}`, { is_verified: !isVerified })
      toast.success(`Rider ${!isVerified ? 'verified' : 'unverified'} successfully`)
      fetchRiders()
    } catch (error) {
      toast.error('Failed to update rider')
    }
  }

  const handleDelete = async (riderId) => {
    if (!confirm('Are you sure you want to delete this rider?')) return

    try {
      await api.delete(`/admin/riders/${riderId}`)
      toast.success('Rider deleted successfully')
      fetchRiders()
    } catch (error) {
      toast.error('Failed to delete rider')
    }
  }

  const filteredRiders = riders.filter(rider => {
    const matchesSearch = rider.vehicle_number?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || rider.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Rider Management</h1>
          <p className="admin-page-subtitle">Manage delivery riders</p>
        </div>
      </div>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search riders..."
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
          <option value="available">Available</option>
          <option value="busy">Busy</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2 className="admin-table-title">All Riders ({filteredRiders.length})</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Vehicle</th>
              <th>Vehicle Number</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider) => (
              <tr key={rider.id}>
                <td>#{rider.id}</td>
                <td>User #{rider.user_id}</td>
                <td>{rider.vehicle_type || 'N/A'}</td>
                <td>{rider.vehicle_number || 'N/A'}</td>
                <td>⭐ {rider.rating?.toFixed(1) || '0.0'}</td>
                <td>
                  <span className={`admin-badge ${rider.status}`}>
                    {rider.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleVerify(rider.id, rider.is_verified)}
                    className={`admin-badge ${rider.is_verified ? 'verified' : 'pending'}`}
                    style={{ cursor: 'pointer', border: 'none' }}
                  >
                    {rider.is_verified ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {rider.is_verified ? ' Verified' : ' Pending'}
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
                      onClick={() => handleDelete(rider.id)}
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
