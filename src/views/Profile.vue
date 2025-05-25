<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue'
import { useAuthStore } from '../stores/auth'
import FormInput from '../components/ui/FormInput.vue'

const authStore = useAuthStore()
const notifications = inject('notifications', { add: (msg: string) => {} })

const user = computed(() => authStore.user)
const isEditing = ref(false)

// Form fields
const name = ref('')
const bio = ref('')
const location = ref('')
const profileImage = ref('')
const imagePreview = ref('')
const interestsString = ref('')

// Validation
const nameError = ref('')

// Initialize form data
onMounted(() => {
  if (user.value) {
    name.value = user.value.name
    bio.value = user.value.bio || ''
    location.value = user.value.location || ''
    profileImage.value = user.value.profileImage
    imagePreview.value = user.value.profileImage
    interestsString.value = user.value.interests?.join(', ') || ''
  }
})

function validateName() {
  nameError.value = name.value.length < 2 ? 'O nome deve ter pelo menos 2 caracteres' : ''
  return !nameError.value
}

function handleImageChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) {
    return
  }
  
  // Create a preview URL for the image
  const file = target.files[0]
  imagePreview.value = URL.createObjectURL(file)
  
  // In a real app, this would upload to a server
  // For demo, we'll just use the preview URL
  profileImage.value = imagePreview.value
}

function startEditing() {
  isEditing.value = true
}

async function saveProfile() {
  if (!validateName()) {
    notifications.add('Por favor, corrija os erros no formulário', 'error')
    return
  }
  
  const interests = interestsString.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag)
  
  const profileData = {
    name: name.value,
    bio: bio.value,
    location: location.value,
    profileImage: profileImage.value,
    interests
  }
  
  const success = await authStore.updateUserProfile(profileData)
  
  if (success) {
    notifications.add('Perfil atualizado com sucesso!', 'success')
    isEditing.value = false
  } else {
    notifications.add('Falha ao atualizar perfil', 'error')
  }
}

function cancelEditing() {
  // Reset form values
  if (user.value) {
    name.value = user.value.name
    bio.value = user.value.bio || ''
    location.value = user.value.location || ''
    profileImage.value = user.value.profileImage
    imagePreview.value = user.value.profileImage
    interestsString.value = user.value.interests?.join(', ') || ''
  }
  
  isEditing.value = false
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <h1 class="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Seu Perfil</h1>
    
    <div class="rounded-lg bg-white shadow-md dark:bg-gray-800">
      <!-- Profile view mode -->
      <div v-if="!isEditing" class="p-6">
        <div class="flex flex-col items-center justify-between sm:flex-row">
          <div class="mb-4 flex items-center sm:mb-0">
            <img 
              :src="user?.profileImage" 
              :alt="user?.name" 
              class="mr-6 h-24 w-24 rounded-full object-cover"
            />
            
            <div>
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ user?.name }}</h2>
              <p class="text-gray-600 dark:text-gray-400">{{ user?.location || 'Localização não definida' }}</p>
            </div>
          </div>
          
          <button @click="startEditing" class="btn btn-primary">
            Editar Perfil
          </button>
        </div>
        
        <div class="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <h3 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white">Sobre</h3>
          <p class="text-gray-600 dark:text-gray-400">{{ user?.bio || 'Nenhuma biografia adicionada ainda.' }}</p>
        </div>
        
        <div v-if="user?.interests?.length" class="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
          <h3 class="mb-3 text-lg font-semibold text-gray-800 dark:text-white">Interesses</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(interest, index) in user.interests" 
              :key="index"
              class="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-800 dark:bg-primary-900 dark:bg-opacity-30 dark:text-primary-300"
            >
              {{ interest }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Profile edit mode -->
      <div v-else class="p-6">
        <div class="mb-6 flex items-center">
          <div class="relative mr-6">
            <div class="h-24 w-24 overflow-hidden rounded-full">
              <img 
                :src="imagePreview" 
                alt="Prévia do perfil" 
                class="h-full w-full object-cover"
              />
            </div>
            
            <label class="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white shadow-md hover:bg-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="file" 
                accept="image/*" 
                class="hidden" 
                @change="handleImageChange"
              />
            </label>
          </div>
          
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Editar Seu Perfil</h2>
        </div>
        
        <div class="space-y-6">
          <FormInput
            v-model="name"
            label="Nome"
            placeholder="Seu nome"
            :error="nameError"
            @blur="validateName"
          />
          
          <FormInput
            v-model="location"
            label="Localização"
            placeholder="Cidade, País"
          />
          
          <div>
            <label class="form-label">Biografia</label>
            <textarea 
              v-model="bio"
              class="form-input h-24 resize-none"
              placeholder="Conte aos outros sobre você..."
            ></textarea>
          </div>
          
          <FormInput
            v-model="interestsString"
            label="Interesses"
            placeholder="caminhada, fotografia, viagem, etc. (separados por vírgula)"
          />
          
          <div class="flex justify-end space-x-4">
            <button @click="cancelEditing" class="btn btn-outline">
              Cancelar
            </button>
            <button @click="saveProfile" class="btn btn-primary">
              Salvar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>