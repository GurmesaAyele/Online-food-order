import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import api from '../api/axios'

export default function Orders() {
  const [orders, setOrders] = useState([])
  
  useEffect(() => {
    fetchOrders()
  }, [])
  
  const fetchOrders = async () => {
    try {
      // Fetch restaurant orders
      const { data } = await api.get('/orders')
      setOrders(data)
    } catch (error) {
      toast.error('Failed to load orders')
    }
  }
  
  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status })
      toast.success('Order status updated')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">Order #{order.id}</h3>
                <p className="text-sm text-gray-600">{order.customer_name}</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                {order.status}
              </span>
            </div>
            
            <div className="mb-4">
              {order.items?.map((item, idx) => (
                <div key={idx} className="text-sm">
                  {item.quantity}x {item.name}
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => updateOrderStatus(order.id, 'confirmed')}
                className="btn-primary text-sm"
              >
                Accept
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'preparing')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Preparing
              </button>
              <button
                onClick={() => updateOrderStatus(order.id, 'ready')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Ready
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
