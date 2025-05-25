<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import FormInput from '../ui/FormInput.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const dateOfBirth = ref('')
const bio = ref('')
const profileImage = ref('')
const imagePreview = ref('')
const userType = ref('regular') // 'regular' ou 'contractor'
const isLoading = ref(false)
const formError = ref('')

// Contractor specific fields
const fantasyName = ref('')
const city = ref('')
const suburb = ref('')
const state = ref('')

const authStore = useAuthStore()
const router = useRouter()
const notifications = inject('notifications', { add: (msg: string) => {} })

// Validation
const nameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const dateOfBirthError = ref('')
const fantasyNameError = ref('')

function validateName() {
  nameError.value = name.value.length < 2 ? 'O nome deve ter pelo menos 2 caracteres' : ''
  return !nameError.value
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = !emailRegex.test(email.value) ? 'Por favor, insira um endereço de e-mail válido' : ''
  return !emailError.value
}

function validatePassword() {
  passwordError.value = password.value.length < 6 ? 'A senha deve ter pelo menos 6 caracteres' : ''
  return !passwordError.value
}

function validateConfirmPassword() {
  confirmPasswordError.value = password.value !== confirmPassword.value ? 'As senhas não coincidem' : ''
  return !confirmPasswordError.value
}

function validateDateOfBirth() {
  if (!dateOfBirth.value) {
    dateOfBirthError.value = 'A data de nascimento é obrigatória'
    return false
  }
  
  const birthDate = new Date(dateOfBirth.value)
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()
  
  if (age < 18) {
    dateOfBirthError.value = 'Você deve ter pelo menos 18 anos'
    return false
  }
  
  dateOfBirthError.value = ''
  return true
}

function validateFantasyName() {
  if (userType.value === 'contractor') {
    fantasyNameError.value = fantasyName.value.length < 2 ? 'O nome fantasia deve ter pelo menos 2 caracteres' : ''
    return !fantasyNameError.value
  }
  return true
}

function handleImageChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) {
    profileImage.value = ''
    imagePreview.value = ''
    return
  }
  
  // In a real app, this would upload to a server
  // For demo, we'll just show a preview
  const file = target.files[0]
  
  // Create a fake URL for the image preview
  imagePreview.value = URL.createObjectURL(file)
  
  // In a real app, we'd upload the file and get a URL back
  // For demo, we'll use a placeholder
  profileImage.value = imagePreview.value
}

async function handleSubmit() {
  formError.value = ''
  
  // Validate all fields
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  const isConfirmPasswordValid = validateConfirmPassword()
  const isDateOfBirthValid = validateDateOfBirth()
  const isFantasyNameValid = validateFantasyName()
  
  if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isDateOfBirthValid || !isFantasyNameValid) {
    formError.value = 'Por favor, corrija os erros no formulário'
    return
  }
  
  isLoading.value = true
  
  try {
    const userData = {
      name: name.value,
      email: email.value,
      password: password.value,
      dateOfBirth: dateOfBirth.value,
      bio: bio.value,
      profileImage: profileImage.value || 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=800',
      userType: userType.value as 'regular' | 'contractor',
      fantasyName: fantasyName.value,
      city: city.value,
      suburb: suburb.value,
      state: state.value
    }
    
    const success = await authStore.register(userData)
    
    if (success) {
      if (userType.value === 'contractor') {
        notifications.add('Conta de acompanhante criada com sucesso!')
        router.push('/contractor-dashboard')
      } else {
        notifications.add('Registro realizado com sucesso!')
        router.push('/')
      }
    } else {
      formError.value = authStore.error || 'Falha no registro'
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
    
    <!-- User Type Selector -->
    <div class="space-y-2">
      <label class="form-label">Tipo de Usuário</label>
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all"
               :class="userType === 'regular' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20' : 'border-gray-200 dark:border-gray-700'"
        >
          <input type="radio" v-model="userType" value="regular" class="sr-only" />
          <div class="flex items-center">
            <div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full"
                 :class="userType === 'regular' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-800 dark:text-white">Usuário Regular</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Para encontrar acompanhantes</p>
            </div>
          </div>
        </label>
        
        <label class="flex cursor-pointer items-center rounded-lg border-2 p-4 transition-all"
               :class="userType === 'contractor' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20' : 'border-gray-200 dark:border-gray-700'"
        >
          <input type="radio" v-model="userType" value="contractor" class="sr-only" />
          <div class="flex items-center">
            <div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full"
                 :class="userType === 'contractor' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.4" />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-800 dark:text-white">Acompanhante</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Para oferecer serviços</p>
            </div>
          </div>
        </label>
      </div>
    </div>
    
    <FormInput
      v-model="name"
      label="Nome Completo"
      type="text"
      placeholder="Seu Nome"
      required
      :error="nameError"
      @blur="validateName"
    />
    
    <!-- Contractor specific fields -->
    <div v-if="userType === 'contractor'" class="space-y-4 rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-900 dark:bg-opacity-20">
      <h3 class="font-medium text-primary-800 dark:text-primary-200">Informações Profissionais</h3>
      
      <FormInput
        v-model="fantasyName"
        label="Nome Fantasia"
        type="text"
        placeholder="Nome artístico/profissional"
        required
        :error="fantasyNameError"
        @blur="validateFantasyName"
      />
      
      <div class="grid gap-4 sm:grid-cols-2">
        <FormInput
          v-model="city"
          label="Cidade"
          type="text"
          placeholder="Sua cidade"
          required
        />
        
        <FormInput
          v-model="suburb"
          label="Bairro"
          type="text"
          placeholder="Seu bairro"
        />
      </div>
      
      <FormInput
        v-model="state"
        label="Estado"
        type="text"
        placeholder="UF (ex: SP, RJ)"
        required
      />
    </div>
    
    <FormInput
      v-model="email"
      label="E-mail"
      type="email"
      placeholder="seu@email.com"
      required
      :error="emailError"
      @blur="validateEmail"
    />
    
    <div class="grid gap-4 sm:grid-cols-2">
      <FormInput
        v-model="password"
        label="Senha"
        type="password"
        placeholder="••••••••"
        required
        :error="passwordError"
        @blur="validatePassword"
      />
      
      <FormInput
        v-model="confirmPassword"
        label="Confirmar Senha"
        type="password"
        placeholder="••••••••"
        required
        :error="confirmPasswordError"
        @blur="validateConfirmPassword"
      />
    </div>
    
    <FormInput
      v-model="dateOfBirth"
      label="Data de Nascimento"
      type="date"
      required
      :error="dateOfBirthError"
      @blur="validateDateOfBirth"
    />
    
    <div class="space-y-2">
      <label class="form-label">Imagem de Perfil</label>
      
      <div class="flex items-center space-x-4">
        <div class="h-20 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <img 
            v-if="imagePreview" 
            :src="imagePreview" 
            alt="Prévia do perfil" 
            class="h-full w-full object-cover"
          />
          <div v-else class="flex h-full w-full items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        
        <div>
          <label class="btn btn-outline cursor-pointer">
            <span>Enviar Foto</span>
            <input 
              type="file" 
              accept="image/*" 
              class="hidden" 
              @change="handleImageChange"
            />
          </label>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">JPG, PNG. Máx 2MB.</p>
        </div>
      </div>
    </div>
    
    <div>
      <label class="form-label">Biografia</label>
      <textarea 
        v-model="bio"
        class="form-input h-24 resize-none"
        placeholder="Conte-nos sobre você..."
      ></textarea>
    </div>
    
    <div>
      <button 
        type="submit" 
        class="btn btn-primary w-full"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        {{ isLoading ? 'Criando Conta...' : 'Criar Conta' }}
      </button>
    </div>
    
    <div class="text-center">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Já tem uma conta? 
        <router-link to="/login" class="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
          Entrar
        </router-link>
      </p>
    </div>
  </form>
</template>