<template>
  <div>
    <Navbar />
    <Hero />
    <h2 class="text-center mt-16 text-xl font-bold">Welcome to Style&Fashion</h2>
    <CategoryMenu />
    

  </div>
</template>

<script setup>
import CategoryMenu from '../components/CategoryMenu.vue';
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
</script>
