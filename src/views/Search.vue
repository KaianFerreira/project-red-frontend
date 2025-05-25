<template>
  <div class="search-container">
    <div class="filters-section">
      <!-- Filtros móveis otimizados -->
      <div class="mobile-filters">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>
              Filtros
              <template v-slot:actions>
                <v-icon>mdi-filter</v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- Filtro de Localização -->
              <v-text-field
                v-model="filters.location"
                label="Localização"
                prepend-icon="mdi-map-marker"
                clearable
              ></v-text-field>

              <!-- Filtro de Especialidade -->
              <v-select
                v-model="filters.specialty"
                :items="specialties"
                label="Especialidade"
                prepend-icon="mdi-briefcase"
                clearable
              ></v-select>

              <!-- Filtro de Avaliação -->
              <v-rating
                v-model="filters.rating"
                color="amber"
                density="compact"
                half-increments
                hover
              ></v-rating>

              <!-- Filtro de Preço -->
              <v-range-slider
                v-model="filters.priceRange"
                :min="0"
                :max="1000"
                :step="10"
                label="Faixa de Preço"
                thumb-label
              ></v-range-slider>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>

    <!-- Lista de Resultados -->
    <div class="results-section">
      <v-list>
        <v-list-item
          v-for="contractor in filteredContractors"
          :key="contractor.id"
          :to="`/contractor/${contractor.id}`"
        >
          <v-list-item-title>{{ contractor.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ contractor.specialty }} - {{ contractor.location }}
          </v-list-item-subtitle>
          <template v-slot:append>
            <v-rating
              :model-value="contractor.rating"
              readonly
              density="compact"
              size="small"
            ></v-rating>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchView',
  data() {
    return {
      filters: {
        location: '',
        specialty: null,
        rating: 0,
        priceRange: [0, 1000]
      },
      specialties: [
        'Desenvolvimento Web',
        'Design Gráfico',
        'Marketing Digital',
        'Redação',
        'Tradução'
      ],
      contractors: [] // Será preenchido com dados da API
    }
  },
  computed: {
    filteredContractors() {
      return this.contractors.filter(contractor => {
        const locationMatch = !this.filters.location || 
          contractor.location.toLowerCase().includes(this.filters.location.toLowerCase())
        
        const specialtyMatch = !this.filters.specialty || 
          contractor.specialty === this.filters.specialty
        
        const ratingMatch = contractor.rating >= this.filters.rating
        
        const priceMatch = contractor.price >= this.filters.priceRange[0] && 
          contractor.price <= this.filters.priceRange[1]
        
        return locationMatch && specialtyMatch && ratingMatch && priceMatch
      })
    }
  },
  methods: {
    async fetchContractors() {
      // Implementar chamada à API para buscar contractors
      // this.contractors = await api.getContractors()
    }
  },
  mounted() {
    this.fetchContractors()
  }
}
</script>

<style scoped>
.search-container {
  padding: 16px;
}

.filters-section {
  margin-bottom: 24px;
}

.mobile-filters {
  width: 100%;
}

.results-section {
  margin-top: 16px;
}

@media (min-width: 600px) {
  .search-container {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 24px;
  }
}
</style>
