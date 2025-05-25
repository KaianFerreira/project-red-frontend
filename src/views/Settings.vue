<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'

const authStore = useAuthStore()
const themeStore = useThemeStore()
const router = useRouter()
const notifications = inject('notifications', { add: (msg: string) => {} })

// Settings
const notificationsEnabled = ref(true)
const emailNotifications = ref(true)
const locationEnabled = ref(true)
const distanceUnit = ref('miles')
const language = ref('en')
const showLogoutConfirm = ref(false)

function saveSettings() {
  notifications.add('Configurações salvas com sucesso!', 'success')
}

function confirmLogout() {
  showLogoutConfirm.value = true
}

function cancelLogout() {
  showLogoutConfirm.value = false
}

function logout() {
  authStore.logout()
  router.push('/login')
  notifications.add('Você foi desconectado', 'info')
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <h1 class="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Configurações</h1>
    
    <div class="rounded-lg bg-white shadow-md dark:bg-gray-800">
      <!-- Theme settings -->
      <div class="border-b border-gray-200 p-6 dark:border-gray-700">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Aparência</h2>
        
        <div class="flex items-center justify-between">
          <span class="text-gray-700 dark:text-gray-300">Modo Escuro</span>
          <button 
            @click="themeStore.toggleTheme" 
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none dark:bg-gray-700"
            :class="{ 'bg-primary-500 dark:bg-primary-500': themeStore.isDarkMode }"
            role="switch"
          >
            <span 
              class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              :class="{ 'translate-x-5': themeStore.isDarkMode, 'translate-x-0': !themeStore.isDarkMode }"
            ></span>
          </button>
        </div>
      </div>
      
      <!-- Notifications -->
      <div class="border-b border-gray-200 p-6 dark:border-gray-700">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Notificações</h2>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">Ativar Notificações</span>
            <button 
              @click="notificationsEnabled = !notificationsEnabled" 
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none dark:bg-gray-700"
              :class="{ 'bg-primary-500 dark:bg-primary-500': notificationsEnabled }"
              role="switch"
            >
              <span 
                class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                :class="{ 'translate-x-5': notificationsEnabled, 'translate-x-0': !notificationsEnabled }"
              ></span>
            </button>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">Notificações por E-mail</span>
            <button 
              @click="emailNotifications = !emailNotifications" 
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none dark:bg-gray-700"
              :class="{ 'bg-primary-500 dark:bg-primary-500': emailNotifications }"
              role="switch"
            >
              <span 
                class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                :class="{ 'translate-x-5': emailNotifications, 'translate-x-0': !emailNotifications }"
              ></span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Account actions -->
      <div class="p-6">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Conta</h2>
        
        <div class="space-y-4">

          <button @click="confirmLogout" class="btn btn-outline w-full text-error-600 hover:bg-error-50 hover:text-error-700 dark:text-error-400 dark:hover:bg-error-900 dark:hover:bg-opacity-20 dark:hover:text-error-300">
            Logout
          </button>
        </div>
      </div>
    </div>
    
    <!-- Logout confirmation modal -->
    <div v-if="showLogoutConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <h3 class="mb-4 text-xl font-bold text-gray-800 dark:text-white">Sair</h3>
        <p class="mb-6 text-gray-600 dark:text-gray-400">Você tem certeza que deseja sair da sua conta?</p>
        
        <div class="flex justify-end space-x-4">
          <button @click="cancelLogout" class="btn btn-outline">
            Cancelar
          </button>
          <button @click="logout" class="btn btn-error">
            Sair
          </button>
        </div>
      </div>
    </div>
  </div>
</template>