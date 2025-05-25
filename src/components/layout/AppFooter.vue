<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import IconHeart from '../icons/IconHeart.vue'
import IconSettings from '../icons/IconSettings.vue'
import IconSearch from '../icons/IconSearch.vue'
import IconProfile from '../icons/IconProfile.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)

function navigate(path: string) {
  router.push(path)
}
</script>

<template>
  <footer v-if="isAuthenticated" class="fixed bottom-0 z-30 w-full bg-white shadow-md dark:bg-gray-900">
    <div class="mx-auto flex h-16 max-w-md items-center justify-around px-4">
      <button 
        @click="navigate('/')" 
        class="flex flex-col items-center justify-center px-4 py-2 transition-colors"
        :class="route.path === '/' ? 'text-primary-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
      >
        <IconHeart class="h-6 w-6" />
        <span class="mt-1 text-xs">Home</span>
      </button>
      
      <!-- <button 
        @click="navigate('/matches')" 
        class="flex flex-col items-center justify-center px-4 py-2 transition-colors"
        :class="route.path === '/matches' ? 'text-primary-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
      >
        <IconHeart class="h-6 w-6" />
        <span class="mt-1 text-xs">Matches</span>
      </button> -->
      
      <!-- <button 
        @click="navigate('/chat')" 
        class="flex flex-col items-center justify-center px-4 py-2 transition-colors"
        :class="route.path === '/chat' ? 'text-primary-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
      >
        <IconChat class="h-6 w-6" />
        <span class="mt-1 text-xs">Chat</span>
      </button>
       -->
      <button 
        @click="navigate('/profile')" 
        class="flex flex-col items-center justify-center px-4 py-2 transition-colors"
        :class="route.path === '/profile' ? 'text-primary-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
      >
        <IconProfile class="h-6 w-6" />
        <span class="mt-1 text-xs">Perfil</span>
      </button>
      
      <button 
        @click="navigate('/settings')" 
        class="flex flex-col items-center justify-center px-4 py-2 transition-colors"
        :class="route.path === '/settings' ? 'text-primary-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
      >
        <IconSettings class="h-6 w-6" />
        <span class="mt-1 text-xs">Configurações</span>
      </button>
    </div>
  </footer>
</template>