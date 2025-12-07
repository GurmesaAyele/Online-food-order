import { useAuthStore } from '../store/authStore'
import { User, Phone, Mail, Bike } from 'lucide-react'

export default function Profile() {
  const { user } = useAuthStore()
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Rider Profile</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-6">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{user?.full_name || 'Not set'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{user?.phone || 'Not set'}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-6">Vehicle Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Bike className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Vehicle Type</p>
                <p className="font-medium">Motorcycle</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Vehicle Number</p>
              <p className="font-medium">ABC-1234</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">License Number</p>
              <p className="font-medium">DL-123456789</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                Verified
              </span>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-6">Performance Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Deliveries</span>
              <span className="font-bold">245</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rating</span>
              <span className="font-bold">4.8 ⭐</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">On-time Rate</span>
              <span className="font-bold">96%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Earnings</span>
              <span className="font-bold text-green-600">$3,456.20</span>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-6">Availability</h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5" defaultChecked />
                <span>Available for deliveries</span>
              </label>
            </div>
            <button className="btn-primary w-full">Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}
