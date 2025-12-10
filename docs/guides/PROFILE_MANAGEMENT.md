# Profile Management Implementation

## Overview
Complete profile management for customers with update info and change password features.

## Implementation

### ProfileModal Component

**File**: `frontend/src/components/ProfileModal.jsx`

```jsx
import { useState } from 'react'
import axios from 'axios'
import './ProfileModal.css'

function ProfileModal({ user, token, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('info')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  // Profile Info
  const [fullName, setFullName] = useState(user.full_name)
  const [phone, setPhone] = useState(user.phone || '')
  const [email] = useState(user.email) // Email is read-only
  
  // Password Change
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await axios.put(
        'http://localhost:8000/api/profile/update',
        { full_name: fullName, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setMessage('✅ Profile updated successfully!')
      if (onUpdate) onUpdate(response.data)
      
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Failed to update profile'))
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setMessage('')

    if (newPassword !== confirmPassword) {
      setMessage('❌ Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setMessage('❌ Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await axios.put(
        'http://localhost:8000/api/profile/change-password',
        { current_password: currentPassword, new_password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setMessage('✅ Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.detail || 'Failed to change password'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <h2>Profile Settings</h2>

        <div className="profile-tabs">
          <button
            className={`tab ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Personal Info
          </button>
          <button
            className={`tab ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
        </div>

        {message && (
          <div className={`profile-message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {activeTab === 'info' && (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="disabled-input"
              />
              <small>Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        )}

        {activeTab === 'password' && (
          <form onSubmit={handleChangePassword} className="profile-form">
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProfileModal
```

**File**: `frontend/src/components/ProfileModal.css`

```css
.profile-modal {
  max-width: 500px;
}

.profile-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #E2E8F0;
}

.tab {
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #718096;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.3s;
}

.tab:hover {
  color: #667eea;
}

.tab.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.profile-message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.profile-message.success {
  background: #D1FAE5;
  color: #065F46;
}

.profile-message.error {
  background: #FEE2E2;
  color: #991B1B;
}

.profile-form {
  margin-top: 1.5rem;
}

.disabled-input {
  background: #F7FAFC;
  cursor: not-allowed;
}

.form-group small {
  display: block;
  margin-top: 0.25rem;
  color: #718096;
  font-size: 0.85rem;
}
```

### Integration with CustomerDashboard

Add to imports:
```jsx
import ProfileModal from '../components/ProfileModal'
```

Add to state:
```jsx
const [showProfile, setShowProfile] = useState(false)
```

Add profile button to navbar:
```jsx
<div className="user-menu">
  <button onClick={() => setShowProfile(true)} className="user-name">
    👤 {user.full_name}
  </button>
  <button onClick={handleLogout} className="btn btn-outline">Logout</button>
</div>
```

Add modal before closing div:
```jsx
{showProfile && (
  <ProfileModal
    user={user}
    token={token}
    onClose={() => setShowProfile(false)}
    onUpdate={(updatedUser) => {
      setUser(updatedUser)
      // Update localStorage
      const authData = JSON.parse(localStorage.getItem('auth-storage'))
      authData.state.user = updatedUser
      localStorage.setItem('auth-storage', JSON.stringify(authData))
    }}
  />
)}
```

This completes Profile Management with update info and password change!
