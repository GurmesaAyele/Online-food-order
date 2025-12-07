import { create } from 'zustand'
import api from '../api/axios'

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('admin_user')) || null,
  token: localStorage.getItem('admin_token') || null,

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const { access_token, user } = response.data
    
    if (user.role !== 'admin') {
      throw new Error('Access denied. Admin credentials required.')
    }
    
    localStorage.setItem('admin_token', access_token)
    localStorage.setItem('admin_user', JSON.stringify(user))
    set({ user, token: access_token })
    return response.data
  },

  logout: () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    set({ user: null, token: null })
  },
}))
