import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import api from '../api/axios'
import { toast } from 'react-hot-toast'

export default function Orders() {
  const [orders, setOrders] = useState([])
  
  useEffect(() => {
    fetchOrders()
  }, [])
  
  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders')
      setOrders(data)
    } catch (error) {
      toast.error('Failed to load orders')
    }
  }
  
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      ready: 'bg-orange-100 text-orange-800',
      delivering: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Order #{order.id}</h3>
                <p className="text-gray-600 text-sm">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            <div className="mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="text-sm text-gray-600">
                  {item.quantity}x {item.name}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
              {['preparing', 'ready', 'delivering'].includes(order.status) && (
                <Link
                  to={`/orders/${order.id}/track`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <MapPin className="w-4 h-4" />
                  Track Order
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
