<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import type { Contractor } from '../../types/contractor'

const props = defineProps<{
  contractor: Contractor
}>()

const router = useRouter()
const authStore = useAuthStore()
const isHovered = ref(false)
const isFavorited = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)

// Simular avaliação como no Airbnb (valor fixo para não mudar a cada render)
const rating = computed(() => {
  // Usa o ID para gerar um valor consistente
  const seed = parseInt(props.contractor.idUserDetails.toString()) || 1
  return (4.2 + (seed % 8) * 0.1).toFixed(1)
})

const reviewCount = computed(() => {
  const seed = parseInt(props.contractor.idUserDetails.toString()) || 1
  return Math.floor(20 + (seed % 180))
})

const pricePerHour = computed(() => {
  const seed = parseInt(props.contractor.idUserDetails.toString()) || 1
  return Math.floor(200 + (seed % 300))
})

function toggleFavorite() {
  if (!isAuthenticated.value) {
    router.push({ name: 'Login' })
  } else {
    isFavorited.value = !isFavorited.value
  }
}

function goToDetails() {
  router.push({ name: 'ContractorDetails', params: { id: props.contractor.idUserDetails.toString() } })
}

// Status online aleatório baseado no ID
const isOnline = computed(() => {
  const seed = parseInt(props.contractor.idUserDetails.toString()) || 1
  return seed % 3 === 0 // Aproximadamente 1/3 online
})
</script>

<template>
  <div 
    class="group cursor-pointer"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="goToDetails"
  >
    <!-- Imagem principal com proporção do Airbnb -->
    <div class="relative mb-3 overflow-hidden rounded-xl">
      <div class="aspect-square">
        <img 
          :src="contractor.avatar" 
          :alt="contractor.fantasyName" 
          class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      
      <!-- Heart icon como no Airbnb -->
      <button 
        @click.stop="toggleFavorite"
        class="absolute top-2 sm:top-3 right-2 sm:right-3 rounded-full bg-white/80 p-1.5 sm:p-2 shadow-sm backdrop-blur-sm hover:bg-white/90 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-3 w-3 sm:h-4 sm:w-4 transition-colors" 
          :class="isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-700'"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <!-- Online indicator -->
      <div v-if="isOnline" class="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
        <div class="flex items-center rounded-full bg-white/90 px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-medium shadow-sm backdrop-blur-sm">
          <div class="mr-1 sm:mr-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500"></div>
          <span class="hidden sm:inline">Online</span>
        </div>
      </div>
      
      <!-- Offline indicator -->
      <div v-else class="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
        <div class="flex items-center rounded-full bg-white/90 px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-medium shadow-sm backdrop-blur-sm">
          <div class="mr-1 sm:mr-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-gray-400"></div>
          <span class="hidden sm:inline">Offline</span>
        </div>
      </div>
    </div>

    <!-- Informações do card estilo Airbnb -->
    <div class="space-y-1">
      <!-- Primeira linha: Nome e avaliação -->
      <div class="flex items-center justify-between">
        <h3 class="truncate text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
          {{ contractor.fantasyName }}
        </h3>
        <div class="flex items-center text-xs sm:text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-900 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span class="ml-0.5 sm:ml-1 font-medium text-gray-900 dark:text-white">{{ rating }}</span>
          <span class="ml-0.5 sm:ml-1 text-gray-500 dark:text-gray-400 hidden xs:inline">({{ reviewCount }})</span>
        </div>
      </div>
      
      <!-- Segunda linha: Localização -->
      <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
        {{ contractor.suburb }}, {{ contractor.city }}
      </p>
      
      <!-- Terceira linha: Idade e status -->
      <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        {{ contractor.age }} anos • Acompanhante
      </p>
      
      <!-- Quarta linha: Preço -->
      <div class="flex items-baseline space-x-1 pt-0.5 sm:pt-1">
        <span class="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">R$ {{ pricePerHour }}</span>
        <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">por hora</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Adiciona um efeito de elevação sutil no hover como o Airbnb */
.group:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}
</style>
