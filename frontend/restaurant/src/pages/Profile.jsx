import { useAuthStore } from '../store/authStore'

export default function Profile() {
  const { user } = useAuthStore()
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Restaurant Profile</h1>
      <div className="card p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Restaurant Name</label>
            <p className="text-lg">{user?.full_name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <p className="text-lg">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <p className="text-lg">{user?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
