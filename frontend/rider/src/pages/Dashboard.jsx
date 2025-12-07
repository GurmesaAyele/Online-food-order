import { useState, useEffect } from 'react'
import { Package, DollarSign, TrendingUp, Clock } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    todayDeliveries: 0,
    todayEarnings: 0,
    activeDeliveries: 0,
    avgDeliveryTime: 0
  })
  
  useEffect(() => {
    // Mock data - replace with API call
    setStats({
      todayDeliveries: 12,
      todayEarnings: 145.50,
      activeDeliveries: 2,
      avgDeliveryTime: 22
    })
  }, [])
  
  const statCards = [
    { icon: Package, label: "Today's Deliveries", value: stats.todayDeliveries, color: 'bg-blue-500' },
    { icon: DollarSign, label: "Today's Earnings", value: `$${stats.todayEarnings}`, color: 'bg-green-500' },
    { icon: TrendingUp, label: 'Active Deliveries', value: stats.activeDeliveries, color: 'bg-orange-500' },
    { icon: Clock, label: 'Avg Delivery Time', value: `${stats.avgDeliveryTime}m`, color: 'bg-purple-500' },
  ]
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome Back, Rider!</h1>
        <p className="text-gray-600 mt-2">Here's your delivery overview for today</p>
      </div>
      
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
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          )
        })}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Active Deliveries</h2>
          <p className="text-gray-600">You have {stats.activeDeliveries} active deliveries</p>
          <button className="btn-primary mt-4">View Deliveries</button>
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Available Orders</h2>
          <p className="text-gray-600">Check for new delivery opportunities</p>
          <button className="btn-primary mt-4">Browse Orders</button>
        </div>
      </div>
    </div>
  )
}
