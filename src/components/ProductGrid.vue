<template>
  <div class="grid grid-cols-2 gap-2 px-2 py-4">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="bg-white p-2 rounded-lg shadow-sm"
    >
      <!-- Image -->
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-40 object-cover rounded-md"
      />

      <!-- Name -->
      <h3 class="text-sm mt-2 font-medium line-clamp-2">
        {{ product.name }}
      </h3>

      <!-- Price + Wishlist -->
      <div class="flex justify-between items-center mt-1">
        <p class="text-red-600 font-semibold text-sm">${{ product.price }}</p>
        <i class="fas fa-heart text-gray-400 text-sm"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
// Sample product data (replace with backend data later)
const products = [
  {
    name: 'Red Floral Dress',
    price: 29.99,
    image: 'https://via.placeholder.com/300x300/FF3366/fff?text=Dress'
  },
  {
    name: 'Men\'s Streetwear T-Shirt',
    price: 19.99,
    image: 'https://via.placeholder.com/300x300/3333FF/fff?text=Shirt'
  },
  {
    name: 'Kids Sneakers',
    price: 24.5,
    image: 'https://via.placeholder.com/300x300/00CC99/fff?text=Shoes'
  },
  {
    name: 'Stylish Handbag',
    price: 49.0,
    image: 'https://via.placeholder.com/300x300/FFC107/000?text=Bag'
  }
]
</script>

<style scoped>
/* Clamp text to 2 lines */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
