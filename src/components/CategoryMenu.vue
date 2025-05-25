<template>
  <div class="overflow-x-auto whitespace-nowrap px-2 py-3 bg-white sticky top-[56px] z-40 shadow-sm">
    <!-- Category items -->
    <button
      v-for="(cat, index) in categories"
      :key="index"
      @click="selectCategory(cat)"
      :class="[
        'inline-block px-4 py-2 mx-1 rounded-full border text-sm font-medium transition',
        selected === cat ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'
      ]"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup>
// List of categories
const categories = ['Women', 'Men', 'Kids', 'Accessories', 'Sale', 'New', 'Shoes', 'Tops', 'Bottoms']

// Track which category is selected
import { ref } from 'vue'
const selected = ref('Women')

// Handle category change
const selectCategory = (cat) => {
  selected.value = cat
  // Later: emit or fetch based on category
}
</script>
