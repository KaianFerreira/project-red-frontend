<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from './stores/theme'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import Notifications from './components/ui/Notifications.vue'

// Store
const themeStore = useThemeStore()

// Refs
const isPageLoading = ref(true)
const route = useRoute()

// Apply theme on mount
onMounted(() => {
  // Apply saved theme
  themeStore.applyTheme()
  
  // Simulate loading
  setTimeout(() => {
    isPageLoading.value = false
  }, 1000)
})

// Provide notification context
const notifications = ref<Array<{ id: number; message: string; type: string }>>([])
let notificationId = 0

const addNotification = (message: string, type = 'info') => {
  const id = notificationId++
  notifications.value.push({ id, message, type })
  setTimeout(() => {
    removeNotification(id)
  }, 3000)
}

const removeNotification = (id: number) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index !== -1) {
    notifications.value.splice(index, 1)
  }
}

provide('notifications', {
  add: addNotification,
  remove: removeNotification,
  list: notifications
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Loading screen -->
    <div v-if="isPageLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div class="text-center">
        <div class="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
        <p class="text-lg font-medium text-gray-600 dark:text-gray-300">Carregando...</p>
      </div>
    </div>

    <!-- Application header -->
    <AppHeader />
    
    <!-- Main content area -->
    <main class="flex-1 px-4 pb-20 pt-16 sm:px-6 lg:px-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- Application footer -->
    <AppFooter />
    
    <!-- Notifications -->
    <Notifications />
  </div>
</template>