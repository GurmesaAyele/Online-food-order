import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RequestRestaurant from './pages/RequestRestaurant'
import RequestRider from './pages/RequestRider'
import CustomerDashboard from './pages/CustomerDashboard'
import RestaurantDashboard from './pages/RestaurantDashboard'
import RiderDashboard from './pages/RiderDashboard'
import AdminDashboard from './pages/AdminDashboard'
import RestaurantMenu from './pages/RestaurantMenu'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request-restaurant" element={<RequestRestaurant />} />
          <Route path="/request-rider" element={<RequestRider />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantMenu />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
