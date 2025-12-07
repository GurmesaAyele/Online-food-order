import { useState, useEffect } from 'react'
import api from '../api/axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, DollarSign, Package, Users } from 'lucide-react'

export default function Analytics() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    totalCustomers: 0
  })

  const salesData = [
    { name: 'Mon', orders: 45, revenue: 2400 },
    { name: 'Tue', orders: 52, revenue: 2800 },
    { name: 'Wed', orders: 61, revenue: 3200 },
    { name: 'Thu', orders: 58, revenue: 3100 },
    { name: 'Fri', orders: 72, revenue: 3900 },
    { name: 'Sat', orders: 85, revenue: 4500 },
    { name: 'Sun', orders: 78, revenue: 4200 },
  ]

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const [ordersRes, usersRes] = await Promise.all([
        api.get('/admin/orders'),
        api.get('/admin/users')
      ])

      const totalRevenue = ordersRes.data.reduce((sum, order) => sum + (order.total_amount || 0), 0)
      const totalOrders = ordersRes.data.length

      setStats({
        totalRevenue,
        totalOrders,
        avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
        totalCustomers: usersRes.data.filter(u => u.role === 'customer').length
      })
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    }
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Analytics & Reports</h1>
          <p className="admin-page-subtitle">Track performance metrics</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div>
              <div className="admin-stat-label">Total Revenue</div>
              <div className="admin-stat-value">${stats.totalRevenue.toFixed(2)}</div>
            </div>
            <div className="admin-stat-icon purple">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div>
              <div className="admin-stat-label">Total Orders</div>
              <div className="admin-stat-value">{stats.totalOrders}</div>
            </div>
            <div className="admin-stat-icon blue">
              <Package size={24} />
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div>
              <div className="admin-stat-label">Avg Order Value</div>
              <div className="admin-stat-value">${stats.avgOrderValue.toFixed(2)}</div>
            </div>
            <div className="admin-stat-icon green">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <div>
              <div className="admin-stat-label">Total Customers</div>
              <div className="admin-stat-value">{stats.totalCustomers}</div>
            </div>
            <div className="admin-stat-icon orange">
              <Users size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="admin-chart-container">
        <h3 className="admin-chart-title">Weekly Sales Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#8B5CF6" />
            <Bar dataKey="revenue" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="admin-chart-container">
        <h3 className="admin-chart-title">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
