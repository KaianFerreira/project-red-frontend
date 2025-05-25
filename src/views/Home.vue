<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useContractorStore } from '../stores/contractor'
import { useAuthStore } from '../stores/auth'
import ContractorCard from '../components/contractor/ContractorCard.vue'

const contractorStore = useContractorStore()
const authStore = useAuthStore()
const isLoading = ref(true)

const isAuthenticated = computed(() => authStore.isAuthenticated)

onMounted(async () => {
  isLoading.value = true
  await contractorStore.fetchContractors()
  isLoading.value = false
})


</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Loading state -->
    <div v-if="isLoading" class="my-10 flex flex-col items-center">
      <div class="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
      <p class="text-lg font-medium text-gray-600 dark:text-gray-300">Encontrando pessoas próximas a você...</p>
    </div>

    <!-- Person card -->
    <div v-else class="w-full h-full flex flex-col items-center sm:p-6 lg:p-8">
      <!-- Grid estilo Airbnb -->
      <div class="w-full max-w-7xl mx-auto mt-8 sm:mt-16 lg:mt-20">
        <!-- Filtros estilo Airbnb -->
        <div class="mb-4">
          <!-- Filtros com scroll horizontal no mobile -->
          <div class="flex items-center justify-between mb-3">
            <div class="overflow-x-auto flex-1 mr-3 sm:mr-4">
              <div class="flex items-center space-x-2 sm:space-x-3 pb-2 min-w-max">
                <button class="rounded-full border border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:border-gray-900 transition-colors whitespace-nowrap dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400">
                  Todas
                </button>
                <button class="rounded-full border border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:border-gray-900 transition-colors whitespace-nowrap dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400">
                  Perto de você
                </button>
                <button class="rounded-full border border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:border-gray-900 transition-colors whitespace-nowrap dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400">
                  Online agora
                </button>
                <button class="rounded-full border border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:border-gray-900 transition-colors whitespace-nowrap dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400">
                  Novatas
                </button>
                <button class="rounded-full border border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:border-gray-900 transition-colors whitespace-nowrap dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400">
                  VIP
                </button>
              </div>
            </div>
            
            <!-- Botão de filtros -->
            <button class="flex items-center space-x-1 sm:space-x-2 rounded-lg border border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:border-gray-900 transition-colors flex-shrink-0 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              <span class="hidden sm:inline">Filtros</span>
            </button>
          </div>
          
          <!-- Indicador de scroll no mobile -->
          <div class="sm:hidden text-center mb-2">
            <p class="text-xs text-gray-400 dark:text-gray-500">← Deslize para ver mais filtros →</p>
          </div>
        </div>
        
        <!-- Header -->
        <div class="mb-4">
          <!-- Mensagem para visitantes -->
          <div v-if="!isAuthenticated" class="mb-4 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-4 text-center">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Bem-vindo(a) ao Garota Pink! 👋
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Navegue livremente e descubra perfis incríveis. Para entrar em contato, faça seu login ou cadastro gratuito.
            </p>
            <div class="flex justify-center space-x-3">
              <router-link 
                to="/login" 
                class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Fazer Login
              </router-link>
              <router-link 
                to="/register" 
                class="border border-primary-600 text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Cadastrar Grátis
              </router-link>
            </div>
          </div>
          
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
            Acompanhantes próximas a você
          </h1>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Descubra perfis verificados na sua região
          </p>
        </div>
        
        <!-- Grid responsivo estilo Airbnb -->
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6">
          <ContractorCard
            v-for="contractor in contractorStore.contractors"
            :key="contractor.idUserDetails"
            :contractor="contractor"
          />
        </div>
      </div>
    </div>
  </div>
</template>