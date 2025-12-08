import { useState } from 'react'
import axios from 'axios'
import './SettingsPanel.css'

function SettingsPanel({ user, token, onUpdate }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    full_name: user.full_name,
    phone: user.phone
  })
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await axios.put(
        'http://localhost:8000/api/profile/update',
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Profile updated successfully!')
      if (onUpdate) onUpdate(response.data.user)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Update failed'))
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setMessage('')

    if (passwordData.new_password !== passwordData.confirm_password) {
      setMessage('❌ New passwords do not match')
      return
    }

    if (passwordData.new_password.length < 6) {
      setMessage('❌ Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await axios.post(
        'http://localhost:8000/api/profile/change-password',
        {
          current_password: passwordData.current_password,
          new_password: passwordData.new_password
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('✅ Password changed successfully!')
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      })
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Password change failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="settings-panel">
      <h2>Settings</h2>

      <div className="settings-tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
        <button
          className={`tab ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          🔒 Password
        </button>
      </div>

      {message && (
        <div className={`settings-message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {activeTab === 'profile' && (
        <form onSubmit={handleProfileUpdate} className="settings-form">
          <div className="form-group">
            <label>Email (cannot be changed)</label>
            <input type="email" value={user.email} disabled />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={profileData.full_name}
              onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input type="text" value={user.role} disabled />
          </div>

          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}

      {activeTab === 'password' && (
        <form onSubmit={handlePasswordChange} className="settings-form">
          <div className="password-info">
            <p>🔐 Change your password to secure your account</p>
            <p>Password must be at least 6 characters long</p>
          </div>

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={passwordData.current_password}
              onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={passwordData.new_password}
              onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
              required
              disabled={loading}
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirm_password}
              onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
              required
              disabled={loading}
              minLength="6"
            />
          </div>

          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      )}
    </div>
  )
}

export default SettingsPanel
