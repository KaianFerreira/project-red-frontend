<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePeopleStore } from '../stores/people'

const peopleStore = usePeopleStore()
const router = useRouter()

const matches = computed(() => peopleStore.matches)

onMounted(() => {
  // In a real app, we would fetch matches from the API
  // For this demo, we're using the mock data already loaded
})

function goToChat(matchId: string) {
  router.push('/chat')
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <h1 class="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Seus Matches</h1>
    
    <!-- Empty state -->
    <div v-if="!matches.length" class="my-10 rounded-lg bg-white p-8 text-center shadow-md dark:bg-gray-800">
      <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">Nenhum match ainda</h2>
      <p class="mb-6 text-gray-500 dark:text-gray-400">Comece a deslizar para encontrar seus matches!</p>
      <router-link to="/" class="btn btn-primary">Começar a Deslizar</router-link>
    </div>
    
    <!-- Matches list -->
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div 
        v-for="match in matches" 
        :key="match.id"
        class="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105 dark:bg-gray-800"
      >
        <div class="relative h-60 w-full">
          <img :src="match.images[0]" :alt="match.name" class="h-full w-full object-cover" />
          <div class="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
            <h3 class="text-lg font-semibold text-white">{{ match.name }}, {{ match.age }}</h3>
          </div>
        </div>
        
        <div class="p-4">
          <p class="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{{ match.bio }}</p>
          
          <div class="flex gap-2">
            <button 
              @click="goToChat(match.id)"
              class="btn btn-primary flex-1"
            >
              Mensagem
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>