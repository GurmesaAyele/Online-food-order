import { Link } from 'react-router-dom'
import { ShoppingCart, User, LogOut, UtensilsCrossed } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const { items } = useCartStore()
  
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-primary">FoodHub</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/restaurants" className="text-gray-700 hover:text-primary transition">
              Restaurants
            </Link>
            
            {user ? (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-primary transition">
                  Orders
                </Link>
                
                <Link to="/cart" className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary transition" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                
                <Link to="/profile" className="text-gray-700 hover:text-primary transition">
                  <User className="w-6 h-6" />
                </Link>
                
                <button onClick={logout} className="text-gray-700 hover:text-primary transition">
                  <LogOut className="w-6 h-6" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary transition">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
