import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AvailableOrders from './pages/AvailableOrders'
import MyDeliveries from './pages/MyDeliveries'
import Earnings from './pages/Earnings'
import Profile from './pages/Profile'

function ProtectedRoute({ children }) {
  const { user } = useAuthStore()
  return user ? children : <Navigate to="/login" />
}

function App() {
  const { user } = useAuthStore()
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && <Sidebar />}
        <main className={user ? 'ml-64' : ''}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/available" element={<ProtectedRoute><AvailableOrders /></ProtectedRoute>} />
            <Route path="/deliveries" element={<ProtectedRoute><MyDeliveries /></ProtectedRoute>} />
            <Route path="/earnings" element={<ProtectedRoute><Earnings /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
