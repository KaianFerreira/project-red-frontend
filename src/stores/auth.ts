import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { User } from '../types/user'
import { api } from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  
  // Actions
  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/login', { email, password })
      user.value = response.user
      token.value = response.token
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to login'
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function register(userData: Partial<User> & { password: string }) {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/auth/register', userData)
      user.value = response.user
      token.value = response.token
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to register'
      return false
    } finally {
      loading.value = false
    }
  }
  
  function logout() {
    user.value = null
    token.value = null
    // We don't need to call the API for logout in this mock implementation
  }
  
  async function fetchUserProfile() {
    if (!token.value) return null
    
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get('/user/profile')
      user.value = response
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch profile'
      return null
    } finally {
      loading.value = false
    }
  }
  
  async function updateUserProfile(profileData: Partial<User>) {
    if (!token.value) return false
    
    loading.value = true
    error.value = null
    
    try {
      const response = await api.put('/user/profile', profileData)
      user.value = { ...user.value, ...response }
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to update profile'
      return false
    } finally {
      loading.value = false
    }
  }
  
  return {
    // State
    user,
    token,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    
    // Actions
    login,
    register,
    logout,
    fetchUserProfile,
    updateUserProfile
  }
}, {
  persist: {
    storage: localStorage,
    paths: ['token', 'user']
  }
})