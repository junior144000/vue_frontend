<template>
  <div class="pb-20">
    <div v-if="product" class="pb-20">
      <!-- ✅ Main Image Preview -->
      <img
        :src="selectedImage"
        :alt="`${product.name} preview image`"
        class="w-full h-80 object-cover"
      />

      <!-- ✅ Clickable Thumbnails -->
      <div
        v-if="product.images.length > 1"
        class="flex gap-2 overflow-x-auto px-4 py-2 bg-white"
      >
        <img
          v-for="img in product.images"
          :key="img.id"
          :src="img.image"
          :alt="`${product.name} thumbnail`"
          class="w-20 h-20 object-cover border rounded cursor-pointer"
          :class="{ 'ring-2 ring-red-500': img.image === selectedImage }"
          @click="selectedImage = img.image"
        />
      </div>

      <!-- 📝 Product Info -->
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

        <!-- 💸 Price Display -->
        <div class="text-sm mt-1">
          <span
            v-if="product.original_price && product.original_price > product.price"
            class="line-through text-gray-400 mr-2"
          >
            ${{ product.original_price }}
          </span>
          <span class="text-red-600 font-semibold">${{ product.price }}</span>
        </div>

        <!-- 🏷️ Tags -->
        <div class="flex flex-wrap mt-2 gap-1">
          <span
            v-for="tag in product.tags"
            :key="tag.id"
            class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
          >
            {{ tag.name }}
          </span>
        </div>
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
            :key="size.id"
            class="px-4 py-1 border rounded-full text-sm"
            :class="{ 'bg-black text-white': selectedSize?.id === size.id }"
            @click="selectedSize = size"
          >
            {{ size.size }}
          </button>

        </div>
        <p v-if="sizeError" class="text-red-500 text-xs mt-1">Please select a size</p>
      </div>

      <!-- 🛒 Add to Cart Button -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3">
        <button
          class="w-full py-3 text-white bg-red-500 rounded-full font-semibold text-sm"
          @click="handleAddToCart"
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'
import { useCartStore } from '../stores/cartStore'
import { useProductStore } from '../stores/productStore'

const route = useRoute()
const cart = useCartStore()
const store = useProductStore()

const product = ref(null)
const selectedSize = ref(null)
const selectedImage = ref('') // ✅ Tracks the main display image
const sizeError = ref(false) // ❗ Shows error if no size selected

onMounted(async () => {
  const { id } = route.params
  const res = await api.get(`/store/products/${id}/`)
  product.value = res.data

  selectedImage.value = product.value.images.length
    ? product.value.images[0].image
    : ''
})

// 💖 Wishlist toggle
const toggleWishlist = () => {
  if (product.value) {
    product.value.wishlisted = !product.value.wishlisted
  }
}

// ✅ Add to cart handler with size check
const handleAddToCart = async () => {
  if (!selectedSize.value) {
    sizeError.value = true
    return
  }
  sizeError.value = false

   await cart.addToCart(product.value, selectedSize.value.id)

}
</script>
