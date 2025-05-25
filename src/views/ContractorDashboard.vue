<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue'
import { useAuthStore } from '../stores/auth'
import FormInput from '../components/ui/FormInput.vue'

const authStore = useAuthStore()
const notifications = inject('notifications', { add: (msg: string) => {} })

const user = computed(() => authStore.user)
const isEditing = ref(false)
const activeTab = ref('profile') // 'profile', 'photos', 'schedule', 'earnings'

// Form fields
const fantasyName = ref('')
const bio = ref('')
const city = ref('')
const suburb = ref('')
const state = ref('')
const profileImage = ref('')
const imagePreview = ref('')
const hourlyRate = ref('')
const services = ref('')
const availability = ref('')

// Additional photos
const additionalPhotos = ref<string[]>([])
const newPhotoPreview = ref('')

// Statistics
const stats = ref({
  totalViews: 0,
  totalContacts: 0,
  monthlyEarnings: 0,
  rating: 0
})

// Initialize form data
onMounted(() => {
  if (user.value) {
    fantasyName.value = user.value.fantasyName || ''
    bio.value = user.value.bio || ''
    city.value = user.value.city || ''
    suburb.value = user.value.suburb || ''
    state.value = user.value.state || ''
    profileImage.value = user.value.profileImage || ''
    imagePreview.value = user.value.profileImage || ''
    
    // Mock statistics
    stats.value = {
      totalViews: 125,
      totalContacts: 23,
      monthlyEarnings: 4500,
      rating: 4.8
    }
  }
})

function handleImageChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) {
    return
  }
  
  const file = target.files[0]
  imagePreview.value = URL.createObjectURL(file)
  profileImage.value = imagePreview.value
}

function addPhoto(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) {
    return
  }
  
  const file = target.files[0]
  const photoUrl = URL.createObjectURL(file)
  additionalPhotos.value.push(photoUrl)
}

function removePhoto(index: number) {
  additionalPhotos.value.splice(index, 1)
}

function startEditing() {
  isEditing.value = true
}

async function saveProfile() {
  const profileData = {
    fantasyName: fantasyName.value,
    bio: bio.value,
    city: city.value,
    suburb: suburb.value,
    state: state.value,
    profileImage: profileImage.value,
    hourlyRate: hourlyRate.value,
    services: services.value,
    availability: availability.value,
    additionalPhotos: additionalPhotos.value
  }
  
  // In a real app, this would save to the API
  console.log('Saving contractor profile:', profileData)
  
  isEditing.value = false
  notifications.add('Perfil atualizado com sucesso!')
}

function cancelEditing() {
  isEditing.value = false
  // Reset form values
  if (user.value) {
    fantasyName.value = user.value.fantasyName || ''
    bio.value = user.value.bio || ''
    city.value = user.value.city || ''
    suburb.value = user.value.suburb || ''
    state.value = user.value.state || ''
    profileImage.value = user.value.profileImage || ''
    imagePreview.value = user.value.profileImage || ''
  }
}
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Painel do Acompanhante</h1>
      <button 
        v-if="!isEditing" 
        @click="startEditing" 
        class="btn btn-primary"
      >
        Editar Perfil
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                Visualizações
              </dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">
                {{ stats.totalViews }}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="flex h-8 w-8 items-center justify-center rounded-md bg-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                Contatos
              </dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">
                {{ stats.totalContacts }}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                Ganhos (mês)
              </dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">
                R$ {{ stats.monthlyEarnings }}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                Avaliação
              </dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">
                {{ stats.rating.toFixed(1) }}⭐
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mb-6">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button
          @click="activeTab = 'profile'"
          class="whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
          :class="activeTab === 'profile' 
            ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
        >
          Perfil
        </button>
        <button
          @click="activeTab = 'photos'"
          class="whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
          :class="activeTab === 'photos' 
            ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
        >
          Fotos
        </button>
        <button
          @click="activeTab = 'services'"
          class="whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
          :class="activeTab === 'services' 
            ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
        >
          Serviços
        </button>
        <button
          @click="activeTab = 'availability'"
          class="whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
          :class="activeTab === 'availability' 
            ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
        >
          Disponibilidade
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="rounded-lg bg-white shadow-md dark:bg-gray-800">
      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="p-6">
        <div v-if="!isEditing">
          <!-- View Mode -->
          <div class="flex items-center mb-6">
            <img 
              :src="profileImage" 
              :alt="fantasyName" 
              class="mr-6 h-24 w-24 rounded-full object-cover"
            />
            <div>
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ fantasyName || 'Nome Fantasia' }}</h2>
              <p class="text-gray-600 dark:text-gray-400">{{ city }}, {{ state }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ suburb }}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold text-gray-800 dark:text-white">Biografia</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ bio || 'Nenhuma biografia adicionada.' }}</p>
            </div>
          </div>
        </div>

        <div v-else>
          <!-- Edit Mode -->
          <div class="space-y-6">
            <div class="flex items-center">
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
              
              <h2 class="text-xl font-bold text-gray-800 dark:text-white">Editar Perfil Profissional</h2>
            </div>
            
            <FormInput
              v-model="fantasyName"
              label="Nome Fantasia"
              placeholder="Seu nome artístico/profissional"
            />
            
            <div class="grid gap-4 sm:grid-cols-3">
              <FormInput
                v-model="city"
                label="Cidade"
                placeholder="Sua cidade"
              />
              
              <FormInput
                v-model="suburb"
                label="Bairro"
                placeholder="Seu bairro"
              />
              
              <FormInput
                v-model="state"
                label="Estado"
                placeholder="UF"
              />
            </div>
            
            <div>
              <label class="form-label">Biografia Profissional</label>
              <textarea 
                v-model="bio"
                class="form-input h-32 resize-none"
                placeholder="Descreva seus serviços e experiência profissional..."
              ></textarea>
            </div>
            
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

      <!-- Photos Tab -->
      <div v-if="activeTab === 'photos'" class="p-6">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Galeria de Fotos</h3>
          
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Main profile photo -->
            <div class="relative group">
              <img 
                :src="profileImage" 
                alt="Foto principal" 
                class="h-48 w-full rounded-lg object-cover"
              />
              <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span class="text-white text-sm font-medium">Foto Principal</span>
              </div>
            </div>
            
            <!-- Additional photos -->
            <div 
              v-for="(photo, index) in additionalPhotos" 
              :key="index"
              class="relative group"
            >
              <img 
                :src="photo" 
                :alt="`Foto ${index + 1}`" 
                class="h-48 w-full rounded-lg object-cover"
              />
              <button 
                @click="removePhoto(index)"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Add photo button -->
            <label class="h-48 w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class="mt-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Adicionar Foto
                </span>
              </div>
              <input type="file" accept="image/*" class="hidden" @change="addPhoto" />
            </label>
          </div>
        </div>
      </div>

      <!-- Services Tab -->
      <div v-if="activeTab === 'services'" class="p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Configurações de Serviços</h3>
        
        <div class="space-y-6">
          <FormInput
            v-model="hourlyRate"
            label="Valor por Hora (R$)"
            type="number"
            placeholder="200"
          />
          
          <div>
            <label class="form-label">Serviços Oferecidos</label>
            <textarea 
              v-model="services"
              class="form-input h-32 resize-none"
              placeholder="Descreva os serviços que você oferece..."
            ></textarea>
          </div>
          
          <button @click="saveProfile" class="btn btn-primary">
            Salvar Configurações
          </button>
        </div>
      </div>

      <!-- Availability Tab -->
      <div v-if="activeTab === 'availability'" class="p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Disponibilidade</h3>
        
        <div class="space-y-6">
          <div>
            <label class="form-label">Horários Disponíveis</label>
            <textarea 
              v-model="availability"
              class="form-input h-32 resize-none"
              placeholder="Ex: Segunda à Sexta: 18h às 23h&#10;Sábado: 14h às 02h&#10;Domingo: Não disponível"
            ></textarea>
          </div>
          
          <button @click="saveProfile" class="btn btn-primary">
            Salvar Disponibilidade
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 