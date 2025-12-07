import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { Save, User, Lock, Bell, Globe } from 'lucide-react'

export default function Settings() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')

  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Settings</h1>
          <p className="admin-page-subtitle">Manage system configuration</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ width: '250px' }}>
          <div className="admin-table-container" style={{ padding: '16px' }}>
            <button
              onClick={() => setActiveTab('profile')}
              className={`admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              style={{ width: '100%', marginBottom: '8px' }}
            >
              <User size={18} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`admin-nav-item ${activeTab === 'security' ? 'active' : ''}`}
              style={{ width: '100%', marginBottom: '8px' }}
            >
              <Lock size={18} />
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`admin-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              style={{ width: '100%', marginBottom: '8px' }}
            >
              <Bell size={18} />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`admin-nav-item ${activeTab === 'system' ? 'active' : ''}`}
              style={{ width: '100%' }}
            >
              <Globe size={18} />
              System
            </button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="admin-table-container" style={{ padding: '32px' }}>
            {activeTab === 'profile' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>
                  Profile Settings
                </h2>
                <div className="admin-input-group">
                  <label className="admin-input-label">Full Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    defaultValue={user?.full_name || 'Admin User'}
                  />
                </div>
                <div className="admin-input-group">
                  <label className="admin-input-label">Email</label>
                  <input
                    type="email"
                    className="admin-input"
                    defaultValue={user?.email}
                    disabled
                  />
                </div>

                <button onClick={handleSave} className="admin-btn admin-btn-primary">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>
                  Security Settings
                </h2>
                <div className="admin-input-group">
                  <label className="admin-input-label">Current Password</label>
                  <input type="password" className="admin-input" />
                </div>
                <div className="admin-input-group">
                  <label className="admin-input-label">New Password</label>
                  <input type="password" className="admin-input" />
                </div>
                <div className="admin-input-group">
                  <label className="admin-input-label">Confirm Password</label>
                  <input type="password" className="admin-input" />
                </div>
                <button onClick={handleSave} className="admin-btn admin-btn-primary">
                  <Lock size={18} />
                  Update Password
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>
                  Notification Preferences
                </h2>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Email notifications for new orders</span>
                  </label>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Email notifications for new restaurants</span>
                  </label>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="checkbox" />
                    <span>Daily summary reports</span>
                  </label>
                </div>
                <button onClick={handleSave} className="admin-btn admin-btn-primary">
                  <Save size={18} />
                  Save Preferences
                </button>
              </div>
            )}

            {activeTab === 'system' && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>
                  System Configuration
                </h2>
                <div className="admin-input-group">
                  <label className="admin-input-label">Platform Name</label>
                  <input type="text" className="admin-input" defaultValue="FoodHub" />
                </div>
                <div className="admin-input-group">
                  <label className="admin-input-label">Support Email</label>
                  <input type="email" className="admin-input" defaultValue="support@foodhub.com" />
                </div>
                <div className="admin-input-group">
                  <label className="admin-input-label">Delivery Fee</label>
                  <input type="number" className="admin-input" defaultValue="2.99" />
                </div>
                <button onClick={handleSave} className="admin-btn admin-btn-primary">
                  <Save size={18} />
                  Update System
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
