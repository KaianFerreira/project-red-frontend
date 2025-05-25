<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.go(-1)
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
    <h1 class="mb-2 text-6xl font-bold text-gray-800 dark:text-white">404</h1>
    <h2 class="mb-6 text-2xl font-semibold text-gray-600 dark:text-gray-300">Page Not Found</h2>
    <p class="mb-8 max-w-md text-gray-500 dark:text-gray-400">The page you are looking for doesn't exist or has been moved.</p>
    
    <div class="flex space-x-4">
      <button @click="goBack" class="btn btn-outline">
        Go Back
      </button>
      <button @click="goHome" class="btn btn-primary">
        Go Home
      </button>
    </div>
  </div>
</template>