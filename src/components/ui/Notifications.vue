<script setup lang="ts">
import { inject, Ref } from 'vue'

const { list } = inject('notifications', {
  list: [] as Ref<Array<{ id: number; message: string; type: string }>>
})
</script>

<template>
  <div class="fixed bottom-20 right-4 z-50 flex flex-col items-end space-y-2">
    <transition-group name="fade">
      <div 
        v-for="notification in list" 
        :key="notification.id"
        class="mb-2 w-72 max-w-full rounded-lg p-4 shadow-lg"
        :class="{
          'bg-success-500 text-white': notification.type === 'success',
          'bg-error-500 text-white': notification.type === 'error',
          'bg-warning-500 text-white': notification.type === 'warning',
          'bg-primary-500 text-white': notification.type === 'info'
        }"
      >
        <p>{{ notification.message }}</p>
      </div>
    </transition-group>
  </div>
</template>