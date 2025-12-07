import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, DollarSign } from 'lucide-react'
import api from '../api/axios'
import { toast } from 'react-hot-toast'

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ cuisine: '', search: '' })
  
  useEffect(() => {
    fetchRestaurants()
  }, [filters])
  
  const fetchRestaurants = async () => {
    try {
      const { data } = await api.get('/restaurants', { params: filters })
      setRestaurants(data)
    } catch (error) {
      toast.error('Failed to load restaurants')
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Restaurants Near You</h1>
      
      <div className="mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Search restaurants..."
          className="input flex-1"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          className="input w-48"
          value={filters.cuisine}
          onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
        >
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Chinese">Chinese</option>
          <option value="Indian">Indian</option>
          <option value="Mexican">Mexican</option>
        </select>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`} className="card overflow-hidden">
            <img
              src={restaurant.image_url || 'https://via.placeholder.com/400x200'}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine_type}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{restaurant.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{restaurant.delivery_time} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span>${restaurant.minimum_order}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
