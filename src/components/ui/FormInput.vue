<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const inputId = computed(() => {
  return `input-${Math.random().toString(36).substring(2, 9)}`
})

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleBlur() {
  emit('blur')
}
</script>

<template>
  <div class="space-y-1">
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-error-500">*</span>
    </label>
    
    <input
      :id="inputId"
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="form-input"
      :class="{ 'border-error-500 focus:border-error-500 focus:ring-error-200': error }"
      @input="updateValue"
      @blur="handleBlur"
    />
    
    <p v-if="error" class="mt-1 text-sm text-error-600 dark:text-error-400">{{ error }}</p>
  </div>
</template>