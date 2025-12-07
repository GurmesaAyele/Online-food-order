import { useState, useEffect } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { Search, Eye } from 'lucide-react'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/admin/orders')
      setOrders(response.data)
    } catch (error) {
      toast.error('Failed to fetch orders')
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id?.toString().includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Order Management</h1>
          <p className="admin-page-subtitle">Monitor all platform orders</p>
        </div>
      </div>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search by order ID..."
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
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="on_the_way">On The Way</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2 className="admin-table-title">All Orders ({filteredOrders.length})</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Restaurant</th>
              <th>Rider</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>User #{order.customer_id}</td>
                <td>Restaurant #{order.restaurant_id}</td>
                <td>{order.rider_id ? `Rider #${order.rider_id}` : 'Unassigned'}</td>
                <td>${order.total_amount?.toFixed(2)}</td>
                <td>
                  <span className={`admin-badge ${order.status}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-action-btn view">
                      <Eye size={16} />
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
