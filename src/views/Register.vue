<script setup lang="ts">
import RegisterForm from '../components/auth/RegisterForm.vue'
</script>

<template>
  <div class="mx-auto flex max-w-lg flex-col py-6">
    <h1 class="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">Criar conta</h1>
    
    <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <RegisterForm />
    </div>
  </div>
</template>