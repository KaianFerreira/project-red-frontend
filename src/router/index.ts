import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Lazy-loaded route components
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Matches = () => import('../views/Matches.vue')
const Chat = () => import('../views/Chat.vue')
const Profile = () => import('../views/Profile.vue')
const Search = () => import('../views/Search.vue')
const Settings = () => import('../views/Settings.vue')
const ContractorDashboard = () => import('../views/ContractorDashboard.vue')
const ContractorDetails = () => import('../views/ContractorDetails.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestOnly: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guestOnly: false }
  },
  {
    path: '/matches',
    name: 'Matches',
    component: Matches,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/contractor-dashboard',
    name: 'ContractorDashboard',
    component: ContractorDashboard,
    meta: { requiresAuth: true, contractorOnly: true }
  },
  {
    path: '/contractor/:id',
    name: 'ContractorDetails',
    component: ContractorDetails,
    meta: { requiresAuth: false }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: import.meta.env.PROD ? createWebHashHistory() : createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isAuthenticated
  
  // Routes that require authentication
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
    return
  }
  
  // Routes for guests only (like login, register) - but only redirect if already logged in and coming from a protected route
  if (to.meta.guestOnly && isLoggedIn && from.meta.requiresAuth) {
    next({ name: 'Home' })
    return
  }
  
  next()
})

export default router