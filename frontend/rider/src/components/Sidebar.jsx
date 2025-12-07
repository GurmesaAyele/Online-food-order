import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Truck, DollarSign, User, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export default function Sidebar() {
  const location = useLocation()
  const { logout } = useAuthStore()
  
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/available', icon: Package, label: 'Available Orders' },
    { to: '/deliveries', icon: Truck, label: 'My Deliveries' },
    { to: '/earnings', icon: DollarSign, label: 'Earnings' },
    { to: '/profile', icon: User, label: 'Profile' },
  ]
  
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
      <div className="p-6 bg-primary text-white">
        <h1 className="text-2xl font-bold">Rider</h1>
        <p className="text-sm opacity-90">Dashboard</p>
      </div>
      
      <nav className="px-4 mt-4">
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
          className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-gray-700 hover:bg-gray-100 w-full mt-4"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  )
}
