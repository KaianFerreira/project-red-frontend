<script setup lang="ts">
import LoginForm from '../components/auth/LoginForm.vue'
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col py-8">
    <h1 class="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-white">Bem vindo de volta</h1>
    
    <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <LoginForm />
    </div>
  </div>
</template>