import { useState, useEffect } from 'react'
import api from '../api/axios'
import { Users, Store, Package, Bike, TrendingUp, DollarSign } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalOrders: 0,
    totalRiders: 0,
    revenue: 0,
    activeOrders: 0
  })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [usersRes, restaurantsRes, ordersRes, ridersRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/restaurants'),
        api.get('/admin/orders'),
        api.get('/admin/riders')
      ])

      setStats({
        totalUsers: usersRes.data.length,
        totalRestaurants: restaurantsRes.data.length,
        totalOrders: ordersRes.data.length,
        totalRiders: ridersRes.data.length,
        revenue: ordersRes.data.reduce((sum, order) => sum + (order.total_amount || 0), 0),
        activeOrders: ordersRes.data.filter(o => ['pending', 'preparing', 'on_the_way'].includes(o.status)).length
      })

      setRecentOrders(ordersRes.data.slice(0, 5))
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    }
  }

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'purple', change: '+12%' },
    { label: 'Restaurants', value: stats.totalRestaurants, icon: Store, color: 'blue', change: '+8%' },
    { label: 'Total Orders', value: stats.totalOrders, icon: Package, color: 'green', change: '+23%' },
    { label: 'Active Riders', value: stats.totalRiders, icon: Bike, color: 'orange', change: '+5%' },
  ]

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Dashboard Overview</h1>
          <p className="admin-page-subtitle">Monitor your platform performance</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="admin-stat-card">
            <div className="admin-stat-header">
              <div>
                <div className="admin-stat-label">{stat.label}</div>
                <div className="admin-stat-value">{stat.value}</div>
                <div className="admin-stat-change positive">
                  <TrendingUp size={14} />
                  {stat.change} from last month
                </div>
              </div>
              <div className={`admin-stat-icon ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h2 className="admin-table-title">Recent Orders</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Restaurant</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer_id}</td>
                <td>{order.restaurant_id}</td>
                <td>${order.total_amount?.toFixed(2)}</td>
                <td>
                  <span className={`admin-badge ${order.status}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
