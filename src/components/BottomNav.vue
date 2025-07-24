<template>
  <nav class="fixed bottom-0 left-0 w-full bg-white border-t shadow z-50 flex justify-around text-xs">
    <RouterLink
      v-for="item in navItems"
      :key="item.name"
      :to="item.to"
      class="flex flex-col items-center py-2 text-gray-500 hover:text-black"
      :class="{ 'text-black': $route.path === item.to }"
    >
      <component :is="item.icon" class="w-6 h-6" />
      <span>{{ item.name }}</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { Home, ShoppingBag, Heart, ShoppingCart, User } from 'lucide-vue-next' // or use other icon lib

const navItems = [
  { name: 'Home', to: '/', icon: Home },
  { name: 'Categories', to: '/categories', icon: ShoppingBag },
  { name: 'Wishlist', to: '/wishlist', icon: Heart },
  { name: 'Cart', to: '/cart', icon: ShoppingCart },
  { name: 'Profile', to: '/profile', icon: User },
]
</script>

<style scoped>
nav {
  font-size: 12px;
}
</style>
