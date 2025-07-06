<template>
  <div class="overflow-x-auto whitespace-nowrap px-2 py-3 bg-white sticky top-[56px] z-40 shadow-sm">
    <!-- Category items -->
    <button
      v-for="(cat, index) in categories"
      :key="index"
      @click="selectCategory(cat)"
      :class="[
        'inline-block px-4 py-2 mx-1 rounded-full border text-sm font-medium transition',
        selected === cat ? 'bg-cyan-700 text-white' : 'bg-gray-100 text-gray-700'
      ]"
    >
      {{ cat.name }}
    </button>
  </div>
</template>

<script setup>
import api from '../services/api' 
import { onMounted, ref } from 'vue'

// List of categories
const categories = ref([])

// Track which category is selected
const selected = ref('men')

// Handle category change
const selectCategory = (cat) => {
  selected.value = cat
  // Later: emit or fetch based on category
}

onMounted(async () => {
  try {
        const res = await api.get('/store/collections/')
        categories.value = res.data
      } catch (err) {
        console.error('🚨 Error fetching categories:', err)
      }
})

console.log('📦 categories (reactive):', categories)
</script>
