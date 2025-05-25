<template>
  <div class="pb-20">
    <!-- 🖼️ Product Image -->
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-80 object-cover"
    />

    <!-- 📝 Product Info Section -->
    <div class="px-4 py-3 bg-white">
      <div class="flex justify-between items-start">
        <!-- Product Name -->
        <h1 class="text-base font-semibold leading-snug">{{ product.name }}</h1>

        <!-- Wishlist Button (mock for now) -->
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
        @click="addToCart"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup>
// Imports (Vue core + router)
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// 🧭 Grab route param to simulate product page per ID
const route = useRoute()

// 🔧 Mock product data — will be replaced with backend later
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

// 📦 Track selected size
const selectedSize = ref(null)

// 💖 Wishlist toggle (mock for now)
const toggleWishlist = () => {
  product.value.wishlisted = !product.value.wishlisted
}

// ➕ Add to cart (mock for now)
const addToCart = () => {
  if (!selectedSize.value) {
    alert('Please select a size before adding to cart.')
    return
  }

  alert(`Added ${product.value.name} (Size: ${selectedSize.value}) to cart`)
}
</script>
