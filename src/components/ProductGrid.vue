<template>
  <div class="grid grid-cols-2 gap-2 px-2 py-4">
    <RouterLink :to="`/product/${product.id}`" v-for="(product, index) in products" :key="index">
        <div
      v-for="(product, index) in products"
      :key="index"
      class="bg-white p-2 rounded-lg shadow-sm relative"
    >
      <!-- Product Image -->
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-40 object-cover rounded-md"
      />

      <!-- Product Name -->
      <h3 class="text-sm mt-2 font-medium line-clamp-2">
        {{ product.name }}
      </h3>

      <!-- Price + Wishlist Button -->
      <div class="flex justify-between items-center mt-1">
        <p class="text-red-600 font-semibold text-sm">${{ product.price }}</p>

        <!-- Wishlist Icon -->
        <button @click="toggleWishlist(index)">
          <i
            :class="[
              'fas text-sm',
              product.wishlisted ? 'fa-heart text-red-500' : 'fa-heart text-gray-400'
            ]"
          ></i>
        </button>
      </div>
        </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { reactive } from 'vue'

// 🛍️ Product list with wishlist state
const products = reactive([
  {
    name: 'Red Floral Dress',
    price: 29.99,
    image: 'https://via.placeholder.com/300x300/FF3366/fff?text=Dress',
    wishlisted: false
  },
  {
    name: 'Men\'s Streetwear T-Shirt',
    price: 19.99,
    image: 'https://via.placeholder.com/300x300/3333FF/fff?text=Shirt',
    wishlisted: false
  },
  {
    name: 'Kids Sneakers',
    price: 24.5,
    image: 'https://via.placeholder.com/300x300/00CC99/fff?text=Shoes',
    wishlisted: false
  },
  {
    name: 'Stylish Handbag',
    price: 49.0,
    image: 'https://via.placeholder.com/300x300/FFC107/000?text=Bag',
    wishlisted: false
  }
])

// ❤️ Toggle wishlist state
const toggleWishlist = (index) => {
  products[index].wishlisted = !products[index].wishlisted
}
</script>

<style scoped>
/* Clamp product name text */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
