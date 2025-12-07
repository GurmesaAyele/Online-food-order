import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { 
  LayoutDashboard, Users, Store, Package, Bike, 
  BarChart3, Settings, LogOut, Shield, FileText 
} from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()
  const { logout } = useAuthStore()

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', section: 'Main' },
    { path: '/requests', icon: FileText, label: 'Access Requests', section: 'Main' },
    { path: '/users', icon: Users, label: 'Users', section: 'Management' },
    { path: '/restaurants', icon: Store, label: 'Restaurants', section: 'Management' },
    { path: '/orders', icon: Package, label: 'Orders', section: 'Management' },
    { path: '/riders', icon: Bike, label: 'Riders', section: 'Management' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', section: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings', section: 'System' },
  ]

  const sections = [...new Set(navItems.map(item => item.section))]

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-logo">
          <div className="admin-logo-icon">
            <Shield size={28} />
          </div>
          <div className="admin-logo-text">
            <h1>FoodHub</h1>
            <p>Admin Control</p>
          </div>
        </div>
      </div>

      <nav className="admin-nav">
        {sections.map(section => (
          <div key={section} className="admin-nav-section">
            <div className="admin-nav-section-title">{section}</div>
            {navItems
              .filter(item => item.section === section)
              .map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <item.icon className="admin-nav-icon" />
                  <span>{item.label}</span>
                </Link>
              ))}
          </div>
        ))}

        <div className="admin-nav-section">
          <button onClick={logout} className="admin-nav-item w-full">
            <LogOut className="admin-nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
