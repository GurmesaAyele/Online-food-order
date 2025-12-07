import { useState, useEffect } from 'react'
import { MapPin, Clock, DollarSign } from 'lucide-react'
import { toast } from 'react-hot-toast'
import api from '../api/axios'

export default function AvailableOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchAvailableOrders()
  }, [])
  
  const fetchAvailableOrders = async () => {
    try {
      const { data } = await api.get('/riders/available-orders')
      setOrders(data)
    } catch (error) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }
  
  const acceptOrder = async (orderId) => {
    try {
      await api.post(`/riders/accept-order/${orderId}`)
      toast.success('Order accepted!')
      fetchAvailableOrders()
    } catch (error) {
      toast.error('Failed to accept order')
    }
  }
  
  if (loading) {
    return <div className="p-8">Loading...</div>
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Available Delivery Orders</h1>
      
      {orders.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-600 text-lg">No available orders at the moment</p>
          <p className="text-gray-500 mt-2">Check back soon for new delivery opportunities</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">Restaurant Order</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Ready
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Delivery Address</p>
                    <p className="text-sm text-gray-600">{order.delivery_address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <p className="text-sm">Est. {order.estimated_delivery_time || '30'} mins</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <p className="text-sm font-semibold">Delivery Fee: $5.00</p>
                </div>
              </div>
              
              <button
                onClick={() => acceptOrder(order.id)}
                className="btn-primary w-full"
              >
                Accept Delivery
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
