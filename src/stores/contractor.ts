import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Contractor } from '../types/contractor'
import { api } from '../services/api'

export const useContractorStore = defineStore('contractor', () => {
    // Estado
    const contractors = ref<Contractor[]>([])
    const currentIndex = ref(0)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const likes = ref<number[]>([])
    const passes = ref<number[]>([])
    const matches = ref<Contractor[]>([])

    // Getters
    const currentContractor = computed(() => {
        if (contractors.value.length === 0 || currentIndex.value >= contractors.value.length) {
            return null
        }
        return contractors.value[currentIndex.value]
    })

    const hasMoreContractors = computed(() => {
        return currentIndex.value < contractors.value.length
    })

    // Actions
    async function fetchContractors() {
        if (loading.value) return

        loading.value = true
        error.value = null

        try {
            const response = await api.get('/contractors')
            const contractorsList = Array.isArray(response)
                ? response.map(item => item as unknown as Contractor)
                : []
            contractors.value = contractorsList.filter((contractor: Contractor) => {
                return !likes.value.includes(contractor.idUserDetails) && !passes.value.includes(contractor.idUserDetails)
            })
            currentIndex.value = 0
        } catch (err: any) {
            error.value = err.message || 'Erro ao buscar contractors'
        } finally {
            loading.value = false
        }
    }

    function likeCurrent() {
        const contractor = currentContractor.value
        if (!contractor) return
        likes.value.push(contractor.idUserDetails)
        nextContractor()
        // Aqui você pode adicionar lógica de match se necessário
    }

    function passCurrent() {
        const contractor = currentContractor.value
        if (!contractor) return
        passes.value.push(contractor.idUserDetails)
        nextContractor()
    }

    function nextContractor() {
        if (currentIndex.value < contractors.value.length - 1) {
            currentIndex.value++
        }
    }

    function reset() {
        contractors.value = []
        currentIndex.value = 0
        likes.value = []
        passes.value = []
        matches.value = []
        error.value = null
        loading.value = false
    }

    return {
        contractors,
        currentIndex,
        loading,
        error,
        likes,
        passes,
        matches,
        currentContractor,
        hasMoreContractors,
        fetchContractors,
        likeCurrent,
        passCurrent,
        nextContractor,
        reset
    }
})
