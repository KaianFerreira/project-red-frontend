<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { mockedData } from '../services/mockData'
import { Conversation } from '../types/chat'
import { format } from 'date-fns'

// In a real app, this would come from a store or API
const conversations = ref<Conversation[]>(mockedData.conversations)
const selectedConversation = ref<Conversation | null>(null)
const newMessage = ref('')

const sortedConversations = computed(() => {
  return [...conversations.value].sort((a, b) => {
    return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
  })
})

function selectConversation(conversation: Conversation) {
  selectedConversation.value = conversation
  
  // Mark all messages as read
  conversation.unreadCount = 0
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  const today = new Date()
  
  // If it's today, just show the time
  if (date.toDateString() === today.toDateString()) {
    return format(date, 'h:mm a')
  }
  
  // If it's this year, show month and day
  if (date.getFullYear() === today.getFullYear()) {
    return format(date, 'MMM d')
  }
  
  // Otherwise show full date
  return format(date, 'MMM d, yyyy')
}

function sendMessage() {
  if (!newMessage.value.trim() || !selectedConversation.value) return
  
  const message = {
    id: `msg-new-${Date.now()}`,
    senderId: 'current-user',
    text: newMessage.value.trim(),
    timestamp: new Date().toISOString(),
    read: true
  }
  
  selectedConversation.value.messages.push(message)
  selectedConversation.value.lastMessageTime = message.timestamp
  newMessage.value = ''
  
  // Simulate a reply after a random delay
  setTimeout(() => {
    if (!selectedConversation.value) return
    
    const replies = [
      'Isso parece ótimo!',
      'Adoraria nos encontrarmos algum dia.',
      'O que você vai fazer neste fim de semana?',
      'Gostei muito da nossa conversa.',
      'Me conte mais sobre você!'
    ]
    
    const reply = {
      id: `msg-reply-${Date.now()}`,
      senderId: selectedConversation.value.participantId,
      text: replies[Math.floor(Math.random() * replies.length)],
      timestamp: new Date().toISOString(),
      read: true
    }
    
    selectedConversation.value.messages.push(reply)
    selectedConversation.value.lastMessageTime = reply.timestamp
  }, 1000 + Math.random() * 2000)
}

onMounted(() => {
  // Select the first conversation by default if one exists
  if (conversations.value.length > 0) {
    selectConversation(conversations.value[0])
  }
})
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <h1 class="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Mensagens</h1>
    
    <!-- Empty state -->
    <div v-if="!conversations.length" class="my-10 rounded-lg bg-white p-8 text-center shadow-md dark:bg-gray-800">
      <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <h2 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">Nenhuma mensagem ainda</h2>
      <p class="mb-6 text-gray-500 dark:text-gray-400">Quando você fizer match com alguém, poderá iniciar uma conversa aqui.</p>
      <router-link to="/" class="btn btn-primary">Começar a Deslizar</router-link>
    </div>
    
    <!-- Chat interface -->
    <div v-else class="flex h-[70vh] overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
      <!-- Conversation list -->
      <div class="w-full border-r border-gray-200 dark:border-gray-700 sm:w-1/3">
        <div class="h-full overflow-y-auto">
          <div 
            v-for="conversation in sortedConversations" 
            :key="conversation.id"
            class="cursor-pointer border-b border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            :class="{ 'bg-gray-50 dark:bg-gray-700': selectedConversation?.id === conversation.id }"
            @click="selectConversation(conversation)"
          >
            <div class="flex items-center">
              <div class="relative mr-3 h-12 w-12 flex-shrink-0">
                <img 
                  :src="conversation.participantImage" 
                  :alt="conversation.participantName"
                  class="h-full w-full rounded-full object-cover"
                />
                <div 
                  v-if="conversation.unreadCount > 0"
                  class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white"
                >
                  {{ conversation.unreadCount }}
                </div>
              </div>
              
              <div class="min-w-0 flex-1">
                <div class="flex justify-between">
                  <h3 class="truncate font-semibold text-gray-800 dark:text-white">
                    {{ conversation.participantName }}
                  </h3>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatTime(conversation.lastMessageTime) }}
                  </span>
                </div>
                
                <p class="truncate text-sm text-gray-500 dark:text-gray-400">
                  {{ conversation.messages[conversation.messages.length - 1]?.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Chat window -->
      <div v-if="selectedConversation" class="hidden w-2/3 flex-col sm:flex">
        <!-- Chat header -->
        <div class="border-b border-gray-200 p-4 dark:border-gray-700">
          <div class="flex items-center">
            <img 
              :src="selectedConversation.participantImage" 
              :alt="selectedConversation.participantName"
              class="mr-3 h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 class="font-semibold text-gray-800 dark:text-white">
                {{ selectedConversation.participantName }}
              </h3>
            </div>
          </div>
        </div>
        
        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4">
          <div 
            v-for="message in selectedConversation.messages" 
            :key="message.id"
            class="mb-4 flex"
            :class="message.senderId === 'current-user' ? 'justify-end' : 'justify-start'"
          >
            <div 
              class="max-w-[75%] rounded-lg px-4 py-2"
              :class="message.senderId === 'current-user' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white'"
            >
              <p>{{ message.text }}</p>
              <p class="mt-1 text-right text-xs opacity-70">
                {{ formatTime(message.timestamp) }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Message input -->
        <div class="border-t border-gray-200 p-4 dark:border-gray-700">
          <form @submit.prevent="sendMessage" class="flex items-center">
            <input 
              v-model="newMessage"
              type="text"
              placeholder="Digite uma mensagem..."
              class="form-input flex-1"
            />
            <button 
              type="submit"
              class="btn btn-primary ml-2"
              :disabled="!newMessage.trim()"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      
      <!-- No conversation selected -->
      <div v-else class="hidden w-2/3 items-center justify-center sm:flex">
        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p class="mt-4 text-gray-500 dark:text-gray-400">Selecione uma conversa para começar a conversar</p>
        </div>
      </div>
    </div>
  </div>
</template>