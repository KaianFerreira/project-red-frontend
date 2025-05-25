import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Person } from '../types/person'
import { api } from '../services/api'

export const usePeopleStore = defineStore('people', () => {
  // State
  const people = ref<Person[]>([])
  const currentIndex = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const likes = ref<string[]>([])
  const passes = ref<string[]>([])
  const matches = ref<Person[]>([])

  // Getters
  const currentPerson = computed(() => {
    if (people.value.length === 0 || currentIndex.value >= people.value.length) {
      return null
    }
    return people.value[currentIndex.value]
  })

  const hasMorePeople = computed(() => {
    return currentIndex.value < people.value.length
  })

  const matchCount = computed(() => {
    return matches.value.length
  })

  // Actions
  async function fetchPeople() {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      const response = await api.get('/people')
      people.value = response.filter((person: Person) => {
        return !likes.value.includes(person.id) && !passes.value.includes(person.id)
      })
      currentIndex.value = 0
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch people'
    } finally {
      loading.value = false
    }
  }

  async function likePerson(id: string) {
    if (!id) return false

    try {
      await api.post(`/people/${id}/like`)
      likes.value.push(id)
      
      // Simulate a match 70% of the time
      if (Math.random() < 0.7) {
        const matchedPerson = people.value.find(p => p.id === id)
        if (matchedPerson) {
          matches.value.push(matchedPerson)
        }
      }
      
      moveToNextPerson()
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to like person'
      return false
    }
  }

  async function passPerson(id: string) {
    if (!id) return false

    try {
      await api.post(`/people/${id}/pass`)
      passes.value.push(id)
      moveToNextPerson()
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to pass person'
      return false
    }
  }

  function moveToNextPerson() {
    if (currentIndex.value < people.value.length - 1) {
      currentIndex.value++
    } else {
      // If we've gone through all people, fetch more
      fetchPeople()
    }
  }

  function resetState() {
    people.value = []
    currentIndex.value = 0
    likes.value = []
    passes.value = []
    matches.value = []
    error.value = null
  }

  return {
    // State
    people,
    currentIndex,
    loading,
    error,
    likes,
    passes,
    matches,

    // Getters
    currentPerson,
    hasMorePeople,
    matchCount,

    // Actions
    fetchPeople,
    likePerson,
    passPerson,
    moveToNextPerson,
    resetState
  }
}, {
  persist: {
    storage: localStorage,
    paths: ['likes', 'passes', 'matches']
  }
})