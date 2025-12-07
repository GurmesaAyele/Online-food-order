import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import api from '../api/axios'
import { useCartStore } from '../store/cartStore'
import { toast } from 'react-hot-toast'

export default function RestaurantDetail() {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [menu, setMenu] = useState([])
  const { addItem } = useCartStore()
  
  useEffect(() => {
    fetchRestaurant()
    fetchMenu()
  }, [id])
  
  const fetchRestaurant = async () => {
    try {
      const { data } = await api.get(`/restaurants/${id}`)
      setRestaurant(data)
    } catch (error) {
      toast.error('Failed to load restaurant')
    }
  }
  
  const fetchMenu = async () => {
    try {
      const { data } = await api.get(`/restaurants/${id}/menu`)
      setMenu(data)
    } catch (error) {
      toast.error('Failed to load menu')
    }
  }
  
  const handleAddToCart = (item) => {
    addItem(item, parseInt(id))
    toast.success('Added to cart!')
  }
  
  if (!restaurant) return <div className="container mx-auto px-4 py-8">Loading...</div>
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
        <p className="text-gray-600 mb-4">{restaurant.description}</p>
        <div className="flex gap-4 text-sm">
          <span>⭐ {restaurant.rating}</span>
          <span>🕐 {restaurant.delivery_time} min</span>
          <span>💵 Min order: ${restaurant.minimum_order}</span>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((item) => (
          <div key={item.id} className="card p-4">
            <img
              src={item.image_url || 'https://via.placeholder.com/300x200'}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary">${item.price}</span>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90"
                disabled={!item.is_available}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
