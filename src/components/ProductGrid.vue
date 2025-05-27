<template>
    <div>
    <!-- 🛍️ Product Grid -->
    <div class="grid grid-cols-2 gap-2 px-2 py-4">
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        :index="index"
        @toggle-wishlist="toggleWishlist"
      />
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'


import { computed, onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'

const store = useProductStore()

const products = computed(() => store.products)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

onMounted(() => {
  store.fetchProducts()
})

console.log('📦 products (reactive):', products)
setTimeout(() => {
  console.log('⏱️ products after 2s:', products.value)
}, 2000)

function toggleWishlist(index) {
  const product = store.products[index]
  product.wishlisted = !product.wishlisted
}

</script>

