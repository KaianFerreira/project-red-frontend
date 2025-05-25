<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGesture } from '@vueuse/gesture'
import { Person } from '../../types/person'
import IconX from '../icons/IconX.vue'
import IconHeart from '../icons/IconHeart.vue'
import IconInfo from '../icons/IconInfo.vue'

const props = defineProps<{
  person: Person
}>()

const emit = defineEmits<{
  (e: 'like'): void
  (e: 'pass'): void
}>()

const cardRef = ref<HTMLElement | null>(null)
const showDetails = ref(false)
const offset = ref({ x: 0, y: 0 })
const startPosition = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const swipeDirection = ref<'left' | 'right' | null>(null)
const swipeOpacity = ref(0)

// Calculate rotation based on horizontal offset
const rotation = computed(() => {
  return (offset.value.x / 10) * 1.5 // Adjust multiplier for more/less rotation
})

// Calculate styles for the card
const cardStyle = computed(() => {
  if (swipeDirection.value) {
    return {
      transform: swipeDirection.value === 'right' 
        ? 'translateX(120%) rotate(30deg)' 
        : 'translateX(-120%) rotate(-30deg)',
      transition: 'transform 0.5s ease'
    }
  }
  
  if (isDragging.value) {
    return {
      transform: `translate(${offset.value.x}px, ${offset.value.y}px) rotate(${rotation.value}deg)`,
      transition: 'none'
    }
  }
  
  return {
    transform: 'translate(0, 0) rotate(0deg)',
    transition: 'transform 0.3s ease'
  }
})

// Setup touch and mouse gestures
onMounted(() => {
  if (!cardRef.value) return
  
  const { onPointerDown, onPointerMove, onPointerUp } = useGesture(cardRef.value, {})
  
  // Handle pointer down
  onPointerDown(({ offsetX, offsetY }) => {
    startPosition.value = { x: offsetX, y: offsetY }
    isDragging.value = true
  })
  
  // Handle pointer move
  onPointerMove(({ offsetX, offsetY }) => {
    if (!isDragging.value) return
    
    offset.value = {
      x: offsetX - startPosition.value.x,
      y: offsetY - startPosition.value.y
    }
    
    // Calculate swipe opacity for like/pass indicators
    if (offset.value.x > 0) {
      swipeOpacity.value = Math.min(Math.abs(offset.value.x) / 100, 1)
    } else if (offset.value.x < 0) {
      swipeOpacity.value = Math.min(Math.abs(offset.value.x) / 100, 1)
    } else {
      swipeOpacity.value = 0
    }
  })
  
  // Handle pointer up
  onPointerUp(() => {
    // Check if it's a significant swipe
    if (Math.abs(offset.value.x) > 100) {
      // Determine swipe direction
      if (offset.value.x > 0) {
        swipeDirection.value = 'right'
        setTimeout(() => emit('like'), 300)
      } else {
        swipeDirection.value = 'left'
        setTimeout(() => emit('pass'), 300)
      }
    } else {
      // Reset position if not a significant swipe
      offset.value = { x: 0, y: 0 }
    }
    
    isDragging.value = false
    swipeOpacity.value = 0
  })
})

// Reset card state when unmounted
onUnmounted(() => {
  offset.value = { x: 0, y: 0 }
  isDragging.value = false
  swipeDirection.value = null
})

// Card actions
function handleLike() {
  swipeDirection.value = 'right'
  setTimeout(() => emit('like'), 300)
}

function handlePass() {
  swipeDirection.value = 'left'
  setTimeout(() => emit('pass'), 300)
}

function toggleDetails() {
  showDetails.value = !showDetails.value
}
</script>

<template>
  <div 
    ref="cardRef"
    class="relative h-[70vh] w-full max-w-sm overflow-hidden rounded-card bg-white shadow-lg dark:bg-gray-800"
    :style="cardStyle"
  >
    <!-- Card image -->
    <div class="relative h-full w-full">
      <img
        :src="person.images[0]"
        :alt="person.name"
        class="h-full w-full object-cover"
      />
      
      <!-- Like indicator -->
      <div 
        class="absolute right-5 top-5 rotate-12 rounded-lg bg-success-500 bg-opacity-80 px-4 py-2 text-white transition-opacity"
        :style="{ opacity: offset.x > 0 ? swipeOpacity : 0 }"
      >
        <span class="text-xl font-bold">LIKE</span>
      </div>
      
      <!-- Pass indicator -->
      <div 
        class="absolute left-5 top-5 -rotate-12 rounded-lg bg-error-500 bg-opacity-80 px-4 py-2 text-white transition-opacity"
        :style="{ opacity: offset.x < 0 ? swipeOpacity : 0 }"
      >
        <span class="text-xl font-bold">PASS</span>
      </div>
      
      <!-- Gradient overlay -->
      <div class="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-black to-transparent opacity-70"></div>
      
      <!-- Card info -->
      <div class="absolute bottom-0 w-full p-4">
        <div class="flex items-end justify-between">
          <div>
            <h2 class="text-2xl font-bold text-white">{{ person.name }}, {{ person.age }}</h2>
            <p class="text-sm text-gray-200">{{ person.distance }} miles away</p>
          </div>
          <button 
            @click.stop="toggleDetails"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-20 text-white backdrop-blur-sm transition-colors hover:bg-opacity-30"
          >
            <IconInfo class="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <!-- Expanded details panel -->
      <div 
        v-if="showDetails"
        class="absolute bottom-0 w-full bg-white bg-opacity-95 p-4 shadow-md backdrop-blur-sm transition-transform dark:bg-gray-800 dark:bg-opacity-95"
        :class="showDetails ? 'translate-y-0' : 'translate-y-full'"
      >
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-xl font-bold dark:text-white">About {{ person.name }}</h3>
          <button 
            @click="toggleDetails"
            class="rounded-full bg-gray-200 p-2 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
          >
            <span class="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <p class="mb-3 text-gray-700 dark:text-gray-300">{{ person.bio }}</p>
        
        <div class="mb-3">
          <h4 class="mb-2 font-medium text-gray-700 dark:text-gray-300">Interests</h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(interest, index) in person.interests" 
              :key="index"
              class="rounded-full bg-primary-100 px-3 py-1 text-xs text-primary-800 dark:bg-primary-900 dark:bg-opacity-30 dark:text-primary-300"
            >
              {{ interest }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Card actions -->
    <div class="absolute bottom-6 left-0 flex w-full justify-center space-x-4">
      <button
        @click="handlePass"
        class="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
      >
        <IconX class="h-8 w-8 text-error-500" />
      </button>
      
      <button
        @click="handleLike"
        class="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
      >
        <IconHeart class="h-8 w-8 text-success-500" />
      </button>
    </div>
  </div>
</template>