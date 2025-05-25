<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import FormInput from '../ui/FormInput.vue'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const formError = ref('')

const authStore = useAuthStore()
const router = useRouter()
const notifications = inject('notifications', { add: (msg: string) => {} })

async function handleSubmit() {
  formError.value = ''
  
  if (!email.value || !password.value) {
    formError.value = 'E-mail e senha são obrigatórios'
    return
  }
  
  isLoading.value = true
  
  try {
    const success = await authStore.login(email.value, password.value)
    
    if (success) {
      notifications.add('Login realizado com sucesso!', 'success')
      router.push('/')
    } else {
      formError.value = authStore.error || 'E-mail ou senha inválidos'
    }
  } catch (error) {
    formError.value = 'Ocorreu um erro inesperado'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

function handleSocialLogin() {
  notifications.add('Login social não está disponível nesta demonstração', 'info')
}

function handleForgotPassword() {
  notifications.add('Redefinição de senha não está disponível nesta demonstração', 'info')
}

async function loginAsContractorDemo() {
  isLoading.value = true
  
  try {
    // Login com dados do contractor de demonstração
    const success = await authStore.login('isabella@example.com', 'demo123')
    
    if (success) {
      notifications.add('Login como acompanhante realizado com sucesso!')
      router.push('/contractor-dashboard')
    } else {
      formError.value = 'Erro ao fazer login de demonstração'
    }
  } catch (error) {
    formError.value = 'Ocorreu um erro inesperado'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div v-if="formError" class="rounded-lg bg-error-100 p-4 text-error-700 dark:bg-error-900 dark:bg-opacity-20 dark:text-error-300">
      {{ formError }}
    </div>
    
    <FormInput
      v-model="email"
      label="E-mail"
      type="email"
      placeholder="seu@email.com"
      required
    />
    
    <div>
      <FormInput
        v-model="password"
        label="Senha"
        type="password"
        placeholder="••••••••"
        required
      />
      <div class="mt-1 text-right">
        <button 
          type="button" 
          @click="handleForgotPassword"
          class="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Esqueceu a senha?
        </button>
      </div>
    </div>
    
    <div>
      <button 
        type="submit" 
        class="btn btn-primary w-full"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        {{ isLoading ? 'Entrando...' : 'Entrar' }}
      </button>
    </div>
    
    <div class="relative flex items-center py-2">
      <div class="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      <span class="mx-4 flex-shrink text-gray-500 dark:text-gray-400">ou</span>
      <div class="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
    </div>
    
    <button 
      type="button" 
      @click="handleSocialLogin"
      class="btn btn-outline w-full"
    >
      <svg class="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>
      Entrar com Google
    </button>
    
    <!-- Demo contractor login -->
    <div class="relative flex items-center py-2">
      <div class="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      <span class="mx-4 flex-shrink text-gray-500 dark:text-gray-400">demonstração</span>
      <div class="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
    </div>
    
    <button 
      type="button" 
      @click="loginAsContractorDemo"
      :disabled="isLoading"
      class="btn btn-secondary w-full"
    >
      <span v-if="isLoading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      🌟 Login como Acompanhante (Demo)
    </button>
    
    <div class="text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Não tem uma conta? 
        <router-link to="/register" class="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
          Criar uma
        </router-link>
      </p>
    </div>
  </form>
</template>