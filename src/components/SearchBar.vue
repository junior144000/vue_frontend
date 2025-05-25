<template>
  <div class="px-3 py-2 bg-white sticky top-[120px] z-30 flex items-center gap-2 shadow-sm">
    <!-- Search Input -->
    <div class="flex-1 relative">
      <input
        type="text"
        v-model="search"
        placeholder="Search for items"
        class="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black"
      />
      <!-- Search Icon -->
      <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
    </div>

    <!-- Filter Button -->
    <button
      class="px-3 py-2 rounded-full border border-gray-300 text-sm text-gray-700"
      @click="openFilter"
    >
      <i class="fas fa-sliders-h"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')

const openFilter = () => {
  alert('Filter popup coming soon!')
}
</script>
