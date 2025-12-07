import { useState, useEffect } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { Search, Edit, Trash2, Eye } from 'lucide-react'

export default function Users() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users')
      setUsers(response.data)
    } catch (error) {
      toast.error('Failed to fetch users')
    }
  }

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      await api.delete(`/admin/users/${userId}`)
      toast.success('User deleted successfully')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">User Management</h1>
          <p className="admin-page-subtitle">Manage all platform users</p>
        </div>
      </div>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search users..."
          className="admin-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="admin-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="customer">Customer</option>
          <option value="restaurant">Restaurant</option>
          <option value="rider">Rider</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2 className="admin-table-title">All Users ({filteredUsers.length})</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>{user.full_name || 'N/A'}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`admin-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`admin-badge ${user.is_active ? 'active' : 'inactive'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
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
                      onClick={() => handleDelete(user.id)}
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
