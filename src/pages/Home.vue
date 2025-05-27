<template>
  <div>

    <Hero />
    <h2 class="text-center mt-2 text-xl font-bold">Welcome to Style&Fashion</h2>
    <p class="text-center text-gray-600 mb-4">Discover the latest trends and styles</p>
    <CategoryMenu />
    <SearchBar />
    <ProductGrid />
    

  </div>
</template>

<script setup>
import CategoryMenu from '../components/CategoryMenu.vue';
import Hero from '../components/Hero.vue'
import ProductGrid from '../components/ProductGrid.vue';
import SearchBar from '../components/SearchBar.vue';
</script>
