<template>
  <!-- Mobile-first navbar, similar to Shein -->
  <header class="bg-white fixed top-0 w-full shadow z-50">
    <div class="flex items-center justify-between px-4 py-3">
      
      <!-- ☰ Menu toggle (left) -->
      <button @click="toggleMenu" class="text-xl text-cyan-700 md:hidden">
        <i class="fas fa-bars"></i>
      </button>

      <!-- 🧢 Brand Logo (center) -->
       <RouterLink :to="`/`">
         <h1 class="text-lg text-2xl md:text-4xl font-bold">Style&Fashion</h1>
       </RouterLink>

      <!-- 🔍 ❤️ 🛒 Icons (right) -->
      <div class= "flex items-center gap-4 text-xl text-cyan-700">
        <i class="fas fa-search"></i>
        <i class="fas fa-heart"></i>
        <div class="relative">
          <RouterLink :to="`/cart`">
            <i class="fas fa-shopping-cart"></i>
          </RouterLink>
          <span v-if="cart.items.length > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {{ cart.items.length }}
          </span>
        </div>
      </div>
    </div>

    <!-- Dropdown menu -->
    <div v-if="menuOpen" class="bg-white border-t">
      <ul class="flex flex-col text-center">
        <li class="py-2 border-b">Women</li>
        <li class="py-2 border-b">Men</li>
        <li class="py-2 border-b">Kids</li>
        <li class="py-2 border-b">Sale</li>
         <RouterLink :to="`/login`">
            <li class="py-2 border-b">Login/Signup</li>
         </RouterLink>
         <button v-if="authStore.isAuthenticated" 
         @click="authStore.logout" class="text-sm text-red-500">Logout
        </button>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'

const cart = useCartStore()

const authStore = useAuthStore()

// Tracks if the menu is open (for mobile dropdown)
const menuOpen = ref(false)

// Toggles the mobile menu on/off
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>
