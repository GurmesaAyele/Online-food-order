import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import api from '../api/axios'
import { useCartStore } from '../store/cartStore'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, restaurantId, getTotal, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    delivery_address: '',
    delivery_latitude: 0,
    delivery_longitude: 0,
    payment_method: 'cod'
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const orderData = {
        restaurant_id: restaurantId,
        items: items.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        })),
        ...formData
      }
      
      const { data } = await api.post('/orders', orderData)
      clearCart()
      toast.success('Order placed successfully!')
      navigate(`/orders/${data.id}/track`)
    } catch (error) {
      toast.error('Failed to place order')
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
          <textarea
            className="input"
            rows="3"
            placeholder="Enter your delivery address"
            value={formData.delivery_address}
            onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
            required
          />
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <select
            className="input"
            value={formData.payment_method}
            onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="stripe">Credit/Debit Card</option>
            <option value="mobile_money">Mobile Money</option>
          </select>
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>$5.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(getTotal() + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <button type="submit" className="btn-primary w-full">
          Place Order
        </button>
      </form>
    </div>
  )
}
