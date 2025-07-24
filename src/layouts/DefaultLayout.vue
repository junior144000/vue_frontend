<template>
    <!-- Header -->
    <header>
      <Navbar />
    </header>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>

    <!-- Footer -->
    <footer>
      
    </footer>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import BottomNav from '../components/BottomNav.vue';
</script>

<style scoped>
</style>
