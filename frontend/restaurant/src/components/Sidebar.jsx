import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, BarChart3, User, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export default function Sidebar() {
  const location = useLocation()
  const { logout } = useAuthStore()
  
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/menu', icon: UtensilsCrossed, label: 'Menu' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/profile', icon: User, label: 'Profile' },
  ]
  
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Restaurant</h1>
        <p className="text-sm text-gray-600">Dashboard</p>
      </div>
      
      <nav className="px-4">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = location.pathname === link.to
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          )
        })}
        
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-gray-700 hover:bg-gray-100 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  )
}
