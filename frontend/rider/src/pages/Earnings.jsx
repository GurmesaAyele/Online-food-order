import { useState } from 'react'
import { DollarSign, TrendingUp, Calendar } from 'lucide-react'

export default function Earnings() {
  const [period, setPeriod] = useState('today')
  
  const earnings = {
    today: { amount: 145.50, deliveries: 12 },
    week: { amount: 892.75, deliveries: 67 },
    month: { amount: 3456.20, deliveries: 245 }
  }
  
  const current = earnings[period]
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Earnings</h1>
      
      <div className="card p-6 mb-8">
        <div className="flex gap-4 mb-6">
          {['today', 'week', 'month'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-semibold capitalize ${
                period === p
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <p className="text-sm font-medium text-green-900">Total Earnings</p>
            </div>
            <p className="text-3xl font-bold text-green-600">${current.amount}</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-medium text-blue-900">Deliveries</p>
            </div>
            <p className="text-3xl font-bold text-blue-600">{current.deliveries}</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <p className="text-sm font-medium text-purple-900">Avg per Delivery</p>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              ${(current.amount / current.deliveries).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b">
              <div>
                <p className="font-medium">Delivery #{1000 + i}</p>
                <p className="text-sm text-gray-600">Dec {7 - i}, 2025</p>
              </div>
              <p className="font-bold text-green-600">+$12.50</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
