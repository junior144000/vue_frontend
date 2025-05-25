<template>
  <div class="pb-20">
    <!-- Product Image -->
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-80 object-cover"
    />

    <!-- Product Info -->
    <div class="px-4 py-3 bg-white">
      <div class="flex justify-between items-start">
        <h1 class="text-base font-semibold leading-snug">{{ product.name }}</h1>
        <button @click="toggleWishlist">
          <i
            :class="[
              'fas text-xl',
              product.wishlisted ? 'fa-heart text-red-500' : 'fa-heart text-gray-300'
            ]"
          ></i>
        </button>
      </div>
      <p class="text-red-600 text-lg font-bold mt-1">${{ product.price }}</p>
    </div>

    <!-- Description -->
    <div class="px-4 py-2 bg-white mt-2">
      <h2 class="font-semibold text-sm mb-1">Description</h2>
      <p class="text-sm text-gray-700">{{ product.description }}</p>
    </div>

    <!-- Size Options -->
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

    <!-- Add to Cart -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3">
      <button
        class="w-full py-3 text-white bg-red-500 rounded-full font-semibold text-sm"
        @click="addToCart"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Mock product data (replace later with real backend call)
const product = ref({
  id: route.params.id,
  name: 'Elegant Summer Dress',
  price: 32.99,
  image: 'https://via.placeholder.com/600x600/FF3366/fff?text=Product',
  description:
    'Lightweight summer dress with floral prints. Perfect for casual wear or a summer party.',
  sizes: ['S', 'M', 'L', 'XL'],
  wishlisted: false
})

const selectedSize = ref(null)

const toggleWishlist = () => {
  product.value.wishlisted = !product.value.wishlisted
}

const addToCart = () => {
  alert(`Added ${product.value.name} (Size: ${selectedSize.value}) to cart`)
}
</script>
