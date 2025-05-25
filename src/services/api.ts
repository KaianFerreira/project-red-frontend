import { mockedData } from './mockData'
import { useAuthStore } from '../stores/auth'

// Simulate API delay
const DELAY = 500

// Simulate API response
const simulateResponse = <T>(data: T, error?: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(new Error(error))
      } else {
        resolve(data)
      }
    }, DELAY)
  })
}

// Mock API implementation
export const api = {
  get: async (url: string) => {
    // Check authentication for protected endpoints (except contractors)
    if (url !== '/auth/login' && url !== '/auth/register' && url !== '/contractors') {
      const authStore = useAuthStore()
      if (!authStore.token) {
        return simulateResponse(null, 'Authentication required')
      }
    }

    // Route handling
    switch (url) {
      case '/people':
        return simulateResponse([]) // Array vazio - endpoint não utilizado atualmente
      case '/user/profile':
        return simulateResponse(mockedData.currentUser)
      case '/contractors':
        return simulateResponse(mockedData.contractors)
      default:
        return simulateResponse(null, `API endpoint ${url} not found`)
    }
  },

  post: async (url: string, data?: any) => {
    // Authentication endpoints
    if (url === '/auth/login') {
      const { email, password } = data
      const user = mockedData.users.find(u => u.email === email)
      
      if (user && password === 'password') { // Mock password check
        return simulateResponse({
          user,
          token: 'mock-jwt-token'
        })
      }
      return simulateResponse(null, 'Invalid email or password')
    }

    if (url === '/auth/register') {
      // Check if email already exists
      if (mockedData.users.some(u => u.email === data.email)) {
        return simulateResponse(null, 'Email already in use')
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        bio: data.bio,
        profileImage: data.profileImage || 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800',
        createdAt: new Date().toISOString()
      }

      return simulateResponse({
        user: newUser,
        token: 'mock-jwt-token'
      })
    }

    // Check authentication for protected endpoints
    const authStore = useAuthStore()
    if (!authStore.token) {
      return simulateResponse(null, 'Authentication required')
    }

    // Like/Pass endpoints
    if (url.match(/\/people\/(.+)\/like/)) {
      return simulateResponse({ success: true })
    }
    
    if (url.match(/\/people\/(.+)\/pass/)) {
      return simulateResponse({ success: true })
    }

    return simulateResponse(null, `API endpoint ${url} not found`)
  },

  put: async (url: string, data: any) => {
    // Check authentication
    const authStore = useAuthStore()
    if (!authStore.token) {
      return simulateResponse(null, 'Authentication required')
    }

    if (url === '/user/profile') {
      // Update user profile
      return simulateResponse({
        ...mockedData.currentUser,
        ...data
      })
    }

    return simulateResponse(null, `API endpoint ${url} not found`)
  }
}