<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useThemeStore } from '../../stores/theme'
import IconHeart from '../icons/IconHeart.vue'

const menuOpen = ref(false)
const authStore = useAuthStore()
const themeStore = useThemeStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function navigate(path: string) {
  closeMenu()
  router.push(path)
}

function logout() {
  authStore.logout()
  closeMenu()
  router.push('/login')
}
</script>

<template>
  <header class="fixed top-0 z-40 w-full bg-white bg-opacity-95 shadow-sm backdrop-blur dark:bg-gray-900 dark:bg-opacity-90">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
      <!-- Logo -->
      <div class="flex items-center">
        <router-link to="/" class="flex items-center">
          <IconHeart class="h-8 w-8 text-secondary-500" />
          <span class="ml-2 text-xl font-semibold text-gray-800 dark:text-white font-serif">Garota Pink</span>
        </router-link>
      </div>
      
      <!-- Hamburger Menu Button -->
      <button 
        @click="toggleMenu" 
        class="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 text-gray-600 shadow-sm transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        aria-label="Menu"
      >
        <div class="relative h-5 w-6">
          <span 
            class="absolute block h-0.5 w-full rounded-full bg-current transition-transform duration-300"
            :class="menuOpen ? 'top-2 rotate-45' : 'top-0'"
          ></span>
          <span 
            class="absolute top-2 block h-0.5 w-full rounded-full bg-current transition-opacity duration-300"
            :class="menuOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span 
            class="absolute block h-0.5 w-full rounded-full bg-current transition-transform duration-300"
            :class="menuOpen ? 'top-2 -rotate-45' : 'top-4'"
          ></span>
        </div>
      </button>
      
      <!-- Slide-in menu (Full screen overlay) -->
      <div
        class="slide-menu fixed inset-0 z-50 w-full h-full bg-white p-6 shadow-xl transition-transform duration-300 dark:bg-gray-900"
        :class="menuOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="mb-8 mt-4 flex items-center justify-end">
           <button 
            @click="closeMenu"
            class="rounded-full bg-gray-200 p-2 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
          >
            <span class="sr-only">Fechar Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-8 mt-16 flex flex-col">
          <div v-if="isAuthenticated" class="mb-6 flex items-center">
            <img 
              :src="authStore.user?.profileImage" 
              alt="Profile" 
              class="h-12 w-12 rounded-full object-cover"
            />
            <div class="ml-3">
              <h3 class="font-medium text-gray-800 dark:text-white">{{ authStore.user?.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Ver Perfil</p>
            </div>
          </div>
          
          <nav class="space-y-1">
            <template v-if="isAuthenticated">
              <button @click="navigate('/')" class="w-full rounded-lg p-3 text-left font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                Início
              </button>
              <button v-if="authStore.user?.userType === 'contractor'" @click="navigate('/contractor-dashboard')" class="w-full rounded-lg p-3 text-left font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                Painel Profissional
              </button>

              <button @click="navigate('/profile')" class="w-full rounded-lg p-3 text-left font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                Perfil
              </button>
              <button @click="navigate('/settings')" class="w-full rounded-lg p-3 text-left font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                Configurações
              </button>
            </template>
            
            <template v-else>
              <button @click="navigate('/login')" class="w-full rounded-lg p-3 text-left font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                Entrar
              </button>
              <button @click="navigate('/register')" class="w-full rounded-lg p-3 text-left font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                Registrar
              </button>
            </template>
          </nav>
          
          <div class="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
            <button 
              @click="themeStore.toggleTheme()" 
              class="flex w-full items-center rounded-lg p-3 text-left font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span v-if="themeStore.isDarkMode" class="mr-3">🌙</span>
              <span v-else class="mr-3">☀️</span>
              {{ themeStore.isDarkMode ? 'Modo Claro' : 'Modo Escuro' }}
            </button>
          </div>
          
          <div v-if="isAuthenticated" class="mt-4">
            <button @click="logout" class="w-full rounded-lg p-3 text-left font-medium text-error-600 transition-colors hover:bg-gray-100 dark:text-error-400 dark:hover:bg-gray-800">
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.slide-menu {
  position: fixed !important;
  top: 0 !important;
  bottom: 0 !important;
  height: 100vh !important;
  /* left e right já são 0 por causa do inset-0 */
}
</style>