import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, Clock, Star, TrendingUp, Utensils, MapPin, Shield, Bike, Store } from 'lucide-react'
import api from '../api/axios'

export default function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      const response = await api.get('/restaurants')
      setRestaurants(response.data.slice(0, 6)) // Top 6 restaurants
    } catch (error) {
      console.error('Failed to fetch restaurants:', error)
    }
  }

  const handleSearch = () => {
    if (searchTerm) {
      window.location.href = `/restaurants?search=${searchTerm}`
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 animate-fade-in">
              Delicious Food, Delivered Fast 🍕
            </h1>
            <p className="text-2xl mb-10 text-orange-100">
              Order from your favorite restaurants and get it delivered to your doorstep in minutes
            </p>
            
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-3 flex gap-2">
              <input
                type="text"
                placeholder="Search for restaurants or cuisines..."
                className="flex-1 px-6 py-4 text-gray-900 outline-none rounded-xl text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>

            <div className="mt-8">
              <Link 
                to="/restaurants" 
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-10 rounded-xl inline-block text-lg transition shadow-lg"
              >
                Order Now →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Get your food in 3 easy steps</p>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                🔍
              </div>
              <h3 className="text-2xl font-bold mb-3">1. Choose Restaurant</h3>
              <p className="text-gray-600 text-lg">Browse hundreds of restaurants and select your favorite dishes</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                🛒
              </div>
              <h3 className="text-2xl font-bold mb-3">2. Place Order</h3>
              <p className="text-gray-600 text-lg">Add items to cart and checkout with secure payment</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                🚴
              </div>
              <h3 className="text-2xl font-bold mb-3">3. Get Delivered</h3>
              <p className="text-gray-600 text-lg">Track your order in real-time and enjoy your meal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Restaurants */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Best Restaurants</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Top rated restaurants in your area</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {restaurants.map((restaurant) => (
              <Link 
                key={restaurant.id}
                to={`/restaurants/${restaurant.id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-6xl">
                  🍽️
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-3">{restaurant.cuisine_type || 'Various Cuisines'}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{restaurant.rating?.toFixed(1) || '4.5'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">30-40 min</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/restaurants" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl inline-block transition"
            >
              View All Restaurants
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose Us</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">The best food delivery experience</p>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">30 minutes or less</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Top Restaurants</h3>
              <p className="text-gray-600">Best in your area</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Tracking</h3>
              <p className="text-gray-600">Real-time updates</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% safe & secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6">Partner With Us</h2>
            <p className="text-center text-xl mb-12 text-blue-100">
              Join our platform and grow your business
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Link 
                to="/request-restaurant"
                className="bg-white text-blue-600 rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                    <Store className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Restaurant Owner?</h3>
                    <p className="text-blue-600">Join our platform</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Register your restaurant and reach thousands of customers
                </p>
                <span className="text-blue-600 font-semibold">Request to Join →</span>
              </Link>

              <Link 
                to="/request-rider"
                className="bg-white text-blue-600 rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                    <Bike className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Become a Rider</h3>
                    <p className="text-blue-600">Earn on your schedule</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Deliver food and earn money with flexible hours
                </p>
                <span className="text-blue-600 font-semibold">Apply Now →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-2xl mb-10 text-orange-100">Browse restaurants and start ordering now</p>
          <Link to="/restaurants" className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-12 rounded-xl inline-block text-lg transition shadow-lg">
            Explore Restaurants
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">FoodHub</h3>
              <p className="text-gray-400">Delicious food delivered to your doorstep</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Partners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/request-restaurant" className="hover:text-white">Partner with us</Link></li>
                <li><Link to="/request-rider" className="hover:text-white">Become a rider</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
