import { useAuthStore } from '../store/authStore'

export default function Profile() {
  const { user } = useAuthStore()
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="card p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
          <p className="text-lg">{user?.full_name || 'Not set'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <p className="text-lg">{user?.email}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
          <p className="text-lg">{user?.phone || 'Not set'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Account Type</label>
          <p className="text-lg capitalize">{user?.role}</p>
        </div>
      </div>
    </div>
  )
}
