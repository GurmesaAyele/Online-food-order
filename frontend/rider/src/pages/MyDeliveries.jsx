import { useState, useEffect } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { toast } from 'react-hot-toast'
import api from '../api/axios'

export default function MyDeliveries() {
  const [deliveries, setDeliveries] = useState([])
  
  useEffect(() => {
    fetchMyDeliveries()
  }, [])
  
  const fetchMyDeliveries = async () => {
    try {
      // Mock data for now
      setDeliveries([
        {
          id: 1,
          restaurant_name: 'Pizza Palace',
          delivery_address: '123 Main St, Apt 4B',
          status: 'picked_up',
          total: 45.99
        }
      ])
    } catch (error) {
      toast.error('Failed to load deliveries')
    }
  }
  
  const updateStatus = async (orderId, status) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status })
      toast.success('Status updated!')
      fetchMyDeliveries()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Active Deliveries</h1>
      
      {deliveries.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-600 text-lg">No active deliveries</p>
          <p className="text-gray-500 mt-2">Accept orders to start delivering</p>
        </div>
      ) : (
        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">Order #{delivery.id}</h3>
                  <p className="text-gray-600">{delivery.restaurant_name}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {delivery.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Delivery Address</p>
                    <p className="text-sm text-gray-600">{delivery.delivery_address}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(delivery.id, 'delivering')}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Navigate
                </button>
                <button
                  onClick={() => updateStatus(delivery.id, 'delivered')}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg flex-1"
                >
                  Mark Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
