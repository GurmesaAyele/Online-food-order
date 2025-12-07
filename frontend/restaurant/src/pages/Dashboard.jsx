import { useState, useEffect } from 'react'
import { DollarSign, ShoppingBag, Clock, TrendingUp } from 'lucide-react'
import api from '../api/axios'

export default function Dashboard() {
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    avgPreparationTime: 0
  })
  
  useEffect(() => {
    // Fetch dashboard stats
    fetchStats()
  }, [])
  
  const fetchStats = async () => {
    // Mock data for now
    setStats({
      todayOrders: 24,
      todayRevenue: 1250.50,
      pendingOrders: 3,
      avgPreparationTime: 18
    })
  }
  
  const statCards = [
    { icon: ShoppingBag, label: "Today's Orders", value: stats.todayOrders, color: 'bg-blue-500' },
    { icon: DollarSign, label: "Today's Revenue", value: `$${stats.todayRevenue}`, color: 'bg-green-500' },
    { icon: Clock, label: 'Pending Orders', value: stats.pendingOrders, color: 'bg-orange-500' },
    { icon: TrendingUp, label: 'Avg Prep Time', value: `${stats.avgPreparationTime}m`, color: 'bg-purple-500' },
  ]
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          )
        })}
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <p className="text-gray-600">No recent orders</p>
      </div>
    </div>
  )
}
