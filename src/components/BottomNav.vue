<template>
  <nav class="fixed bottom-0 left-0 w-full bg-white border-t shadow z-50 flex justify-around text-xs">
    <!-- Render nav items except "Search" -->
    <template v-for="item in navItems" :key="item.name">
      <RouterLink
        v-if="item && item.name !== 'Search'"
        :to="item.to"
        class="relative flex flex-col items-center py-2 text-gray-500 hover:text-black"
        :class="{ 'text-black': $route.path === item.to }"
      >
        <component :is="item.icon" class="w-6 h-6" />
        <span>{{ item.name }}</span>

        <!-- Cart badge -->
        <span
          v-if="item.name === 'Cart' && cart.items.length > 0"
          class="absolute top-0 right-2 bg-red-500 text-white text-xs rounded-full px-1"
        >
          {{ cart.items.length }}
        </span>
      </RouterLink>
    </template>

    <!-- Search Icon Button -->
    <button
      class="flex flex-col items-center py-2 text-gray-500 hover:text-black"
      @click="showSearch = true"
    >
      <Search class="w-6 h-6" />
      <span>Search</span>
    </button>
  </nav>

  <!-- Search Popup -->
  <transition name="fade">
    <div
      v-if="showSearch"
      class="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-start pt-24"
    >
      <div class="bg-white w-11/12 rounded-lg p-4 shadow-lg relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="w-full border border-gray-300 rounded p-2 focus:outline-none"
        />
        <button
          @click="showSearch = false"
          class="absolute top-2 right-2 text-gray-500 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { Home, Heart, ShoppingCart, User, Search } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

const cart = useCartStore()
const { items } = storeToRefs(cart)

const showSearch = ref(false)
const searchQuery = ref('')

// Define nav items (Search is special trigger, not a route link)
const navItems = [
  { name: 'Home', to: '/', icon: Home },
  { name: 'Wishlist', to: '/wishlist', icon: Heart },
  { name: 'Cart', to: '/cart', icon: ShoppingCart },
  { name: 'Profile', to: '/profile', icon: User },
  { name: 'Search', to: '', icon: Search }, // used only to trigger popup
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
