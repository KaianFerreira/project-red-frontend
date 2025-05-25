<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContractorStore } from '../stores/contractor'
import { useAuthStore } from '../stores/auth'
import type { Contractor } from '../types/contractor'

const route = useRoute()
const router = useRouter()
const contractorStore = useContractorStore()
const authStore = useAuthStore()

const contractor = ref<Contractor | null>(null)
const isLoading = ref(true)
const isFavorited = ref(false)
const selectedPhoto = ref(0)

const isAuthenticated = computed(() => authStore.isAuthenticated)

// Buscar dados da acompanhante
onMounted(async () => {
  const id = parseInt(route.params.id as string)
  if (id) {
    await contractorStore.fetchContractors()
    contractor.value = contractorStore.contractors.find(c => c.idUserDetails === id) || null
    if (!contractor.value) {
      router.push({ name: 'Home' })
    }
  }
  isLoading.value = false
})

// Dados simulados como no card
const rating = computed(() => {
  if (!contractor.value) return '0.0'
  const seed = contractor.value.idUserDetails || 1
  return (4.2 + (seed % 8) * 0.1).toFixed(1)
})

const reviewCount = computed(() => {
  if (!contractor.value) return 0
  const seed = contractor.value.idUserDetails || 1
  return Math.floor(20 + (seed % 180))
})

const pricePerHour = computed(() => {
  if (!contractor.value) return 0
  const seed = contractor.value.idUserDetails || 1
  return Math.floor(200 + (seed % 300))
})

const isOnline = computed(() => {
  if (!contractor.value) return false
  const seed = contractor.value.idUserDetails || 1
  return seed % 3 === 0
})

function toggleFavorite() {
  isFavorited.value = !isFavorited.value
}

function goBack() {
  router.back()
}

function selectPhoto(index: number) {
  selectedPhoto.value = index
}

function nextPhoto() {
  if (contractor.value && contractor.value.photos) {
    selectedPhoto.value = (selectedPhoto.value + 1) % contractor.value.photos.length
  }
}

function prevPhoto() {
  if (contractor.value && contractor.value.photos) {
    selectedPhoto.value = selectedPhoto.value === 0 ? contractor.value.photos.length - 1 : selectedPhoto.value - 1
  }
}

function handleContact() {
  if (!isAuthenticated.value) {
    router.push({ name: 'Login' })
  } else {
    // Lógica de contato para usuários logados
    console.log('Iniciando contato...')
  }
}

function handleScheduling() {
  if (!isAuthenticated.value) {
    router.push({ name: 'Login' })
  } else {
    // Lógica de agendamento para usuários logados
    console.log('Iniciando agendamento...')
  }
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
    </div>

    <!-- Conteúdo -->
    <div v-else-if="contractor" class="max-w-6xl mx-auto">
      <!-- Header com botão voltar -->
      <div class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between p-4">
          <button @click="goBack" class="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white">{{ contractor.fantasyName }}</h1>
          
          <button @click="toggleFavorite" class="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors" 
                 :class="isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-400'"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Galeria de fotos -->
      <div class="relative">
        <div class="aspect-[4/3] md:aspect-[16/9] overflow-hidden">
          <img 
            :src="contractor.photos && contractor.photos.length > 0 ? contractor.photos[selectedPhoto] : contractor.avatar" 
            :alt="contractor.fantasyName"
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- Navegação da galeria -->
        <div v-if="contractor.photos && contractor.photos.length > 1" class="absolute inset-0 flex items-center justify-between p-4">
          <button @click="prevPhoto" class="rounded-full bg-white/80 p-2 shadow-lg hover:bg-white/90 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button @click="nextPhoto" class="rounded-full bg-white/80 p-2 shadow-lg hover:bg-white/90 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Status online -->
        <div class="absolute top-4 left-4">
          <div v-if="isOnline" class="flex items-center rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium shadow-lg backdrop-blur-sm">
            <div class="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
            Online agora
          </div>
          <div v-else class="flex items-center rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium shadow-lg backdrop-blur-sm">
            <div class="mr-2 h-2 w-2 rounded-full bg-gray-400"></div>
            Offline
          </div>
        </div>

        <!-- Thumbnails -->
        <div v-if="contractor.photos && contractor.photos.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div class="flex space-x-2">
            <button 
              v-for="(photo, index) in contractor.photos" 
              :key="index"
              @click="selectPhoto(index)"
              class="w-2 h-2 rounded-full transition-colors"
              :class="selectedPhoto === index ? 'bg-white' : 'bg-white/50'"
            ></button>
          </div>
        </div>
      </div>

      <!-- Informações principais -->
      <div class="p-4 sm:p-6">
        <div class="grid md:grid-cols-3 gap-6 md:gap-8">
          <!-- Coluna principal -->
          <div class="md:col-span-2 space-y-4 sm:space-y-6">
            <!-- Cabeçalho -->
            <div>
              <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {{ contractor.fantasyName }}
              </h1>
              
              <!-- Avaliação em linha separada -->
              <div class="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-900 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span class="font-medium text-gray-900 dark:text-white">{{ rating }}</span>
                <span class="ml-1 text-gray-600 dark:text-gray-400">({{ reviewCount }} avaliações)</span>
              </div>
              
              <!-- Informações pessoais em linha separada -->
              <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                <span>{{ contractor.age }} anos</span>
                <span>•</span>
                <span>{{ contractor.city }}, {{ contractor.state }}</span>
              </div>
            </div>

            <!-- Biografia -->
            <div v-if="contractor.bio || contractor.biography">
              <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Sobre mim</h2>
              <div class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                <p v-for="paragraph in (contractor.bio || contractor.biography).split('\n\n')" 
                   :key="paragraph" 
                   class="text-gray-700 dark:text-gray-300">
                  {{ paragraph }}
                </p>
              </div>
            </div>

            <!-- Serviços -->
            <div v-if="contractor.services && contractor.services.length > 0">
              <h2 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">Serviços</h2>
              <div class="grid gap-3 sm:gap-4">
                <div v-for="service in contractor.services" :key="service.id" 
                     class="border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4">
                  <h3 class="font-medium text-gray-900 dark:text-white mb-1 text-sm sm:text-base">{{ service.name }}</h3>
                  <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">{{ service.description }}</p>
                  <p class="text-base sm:text-lg font-semibold text-primary-600 dark:text-primary-400">
                    R$ {{ service.hourlyRate }}/hora
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-4 sm:space-y-6">
            <!-- Card de contato -->
            <div class="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 sticky top-24">
              <div class="text-center mb-4 sm:mb-6">
                <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">R$ {{ pricePerHour }}</p>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">por hora</p>
              </div>
              
              <!-- Mensagem para usuários não logados -->
              <div v-if="!isAuthenticated" class="mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 text-center">
                <p class="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                  Para entrar em contato, faça login ou registre-se gratuitamente
                </p>
              </div>
              
              <div class="space-y-2 sm:space-y-3">
                <button class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors text-sm sm:text-base" @click="handleContact">
                  {{ isAuthenticated ? 'Entrar em contato' : 'Fazer login para contatar' }}
                </button>
                <button class="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors text-sm sm:text-base" @click="handleScheduling">
                  {{ isAuthenticated ? 'Solicitar agendamento' : 'Fazer login para agendar' }}
                </button>
              </div>
              
              <div class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Perfil verificado
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Adiciona smooth scroll */
html {
  scroll-behavior: smooth;
}
</style> 