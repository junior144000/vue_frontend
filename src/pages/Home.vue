<template>
  <div>

    <Hero />
    <h2 class="text-center mt-2 text-xl font-bold">Welcome to Selocia</h2>
    <h3 class="text-center text-gray-600 mb-4">
      Your local marketplace that delivers to your doorstep.
    </h3>
    <CategoryMenu />
    <SearchBar />
    <ProductGrid />
    <BottomNav/>

  </div>
</template>

<script setup>
import CategoryMenu from '../components/CategoryMenu.vue';
import Hero from '../components/Hero.vue'
import ProductGrid from '../components/ProductGrid.vue';
import SearchBar from '../components/SearchBar.vue';
import BottomNav from '../components/BottomNav.vue';
</script>
