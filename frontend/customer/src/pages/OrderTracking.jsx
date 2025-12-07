import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

export default function OrderTracking() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  
  useEffect(() => {
    fetchOrder()
    
    // WebSocket connection for real-time updates
    const ws = new WebSocket(`ws://localhost:8000/ws/orders/${id}`)
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'update') {
        fetchOrder()
      }
    }
    
    return () => ws.close()
  }, [id])
  
  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`)
      setOrder(data)
    } catch (error) {
      console.error('Failed to load order')
    }
  }
  
  if (!order) return <div className="container mx-auto px-4 py-8">Loading...</div>
  
  const steps = [
    { status: 'confirmed', label: 'Order Confirmed' },
    { status: 'preparing', label: 'Preparing' },
    { status: 'ready', label: 'Ready for Pickup' },
    { status: 'delivering', label: 'Out for Delivery' },
    { status: 'delivered', label: 'Delivered' }
  ]
  
  const currentStepIndex = steps.findIndex(s => s.status === order.status)
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Track Order #{order.id}</h1>
      
      <div className="card p-8 mb-8">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.status} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index <= currentStepIndex ? 'bg-primary text-white' : 'bg-gray-200'
                }`}>
                  {index + 1}
                </div>
                <p className="text-sm mt-2 text-center">{step.label}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`absolute top-6 left-1/2 w-full h-1 ${
                  index < currentStepIndex ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-bold mb-2">Delivery Address</h3>
          <p className="text-gray-600">{order.delivery_address}</p>
        </div>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Order Items</h2>
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between py-2">
            <span>{item.quantity}x {item.name}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
