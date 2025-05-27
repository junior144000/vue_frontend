<template>
  <div class="pb-20">
    <div v-if="product " class="pb-20">
      <!-- ✅ Product Image -->
      <img v-if ="product.images.length > 0"
        :src="product.images[0].image"
        :alt="`${product.name} image`"
        class="w-full h-80 object-cover"
      />
     <img v-else 
        src=""
        alt="`${product.name} image`"
        class="w-full h-80 object-cover"
      />
  
      

      <!-- 📝 Product Info Section -->
      <div class="px-4 py-3 bg-white">
        <div class="flex justify-between items-start">
          <h1 class="text-base font-semibold leading-snug">{{ product.name }}</h1>
          <button @click="toggleWishlist">
            <i
              :class="[ 'fas text-xl', product.wishlisted ? 'fa-heart text-red-500' : 'fa-heart text-gray-300' ]"
            ></i>
          </button>
        </div>
        <p class="text-red-600 text-lg font-bold mt-1">${{ product.price }}</p>
      </div>

      <!-- 📄 Description -->
      <div class="px-4 py-2 bg-white mt-2">
        <h2 class="font-semibold text-sm mb-1">Description</h2>
        <p class="text-sm text-gray-700">{{ product.description }}</p>
      </div>

      <!-- 📏 Size Selection -->
      <div class="px-4 py-2 bg-white mt-2">
        <h2 class="font-semibold text-sm mb-2">Select Size</h2>
        <div class="flex gap-2">
          <button
            v-for="size in product.sizes"
            :key="size"
            class="px-4 py-1 border rounded-full text-sm"
            :class="{ 'bg-black text-white': selectedSize === size }"
            @click="selectedSize = size"
          >
            {{ size }}
          </button>
        </div>
      </div>

      <!-- 🛒 Add to Cart Button -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3">
        <button
          class="w-full py-3 text-white bg-red-500 rounded-full font-semibold text-sm"
          @click="cart.addToCart(product)"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <!-- 🔄 Loading Placeholder -->
    <div v-else class="text-center py-10">
      <p>Loading product...</p>
    </div>
  </div>
</template>


<script setup>
// Imports (Vue core + router)
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'  // Adjust path to your API utility
import { useCartStore } from '../stores/cartStore'
import {  onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'

// 🧭 Grab route param to simulate product page per ID
const route = useRoute()
const store = useProductStore()

const product = ref(null)

onMounted(async () => {
  const { id } = route.params
  const res = await api.get(`/store/products/${id}/`)  // your Django endpoint
  product.value = res.data
  console.log(product.value?.name, 'loaded with ID:', route.params.id)
})

// 🛒 Import cart store for managing cart state
const cart = useCartStore()

// 📦 Track selected size
const selectedSize = ref(null)

// 💖 Wishlist toggle (mock for now)
const toggleWishlist = () => {
  if (product.value) {
    product.value.wishlisted = !product.value.wishlisted
  }
}

</script>
