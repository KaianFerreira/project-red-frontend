import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const darkMode = ref(false)
  
  // Getters
  const isDarkMode = computed(() => darkMode.value)
  
  // Actions
  function toggleTheme() {
    darkMode.value = !darkMode.value
    applyTheme()
  }
  
  function applyTheme() {
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  return {
    // State
    darkMode,
    
    // Getters
    isDarkMode,
    
    // Actions
    toggleTheme,
    applyTheme
  }
}, {
  persist: {
    storage: localStorage
  }
})