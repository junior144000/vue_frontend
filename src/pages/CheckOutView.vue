<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h2 class="text-2xl font-semibold mb-6">Checkout</h2>

    <!-- Cart Items -->
    <div v-if="cartItems.length > 0" class="grid gap-6 md:grid-cols-2">
      <div class="space-y-4">
        <div v-for="item in cartItems" :key="item.id" class="flex gap-4 border p-4 rounded shadow-sm">
          <img v-if ="item.images && item.images.length > 0"
          :src="item.images[0].image" 
          alt="Product image" 
          class="w-24 h-24 object-cover rounded" />
          <div>
            <h3 class="font-semibold text-lg">{{ item.name }}</h3>
            <p>Quantity: {{ item.quantity }}</p>
            <p class="text-red-500 font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="p-6 border rounded shadow-md bg-gray-50">
        <h3 class="text-lg font-medium mb-4">Summary</h3>
        <p class="mb-2">Total Items: {{ totalItems }}</p>
        <p class="mb-4 font-semibold">Subtotal: ${{ subtotal.toFixed(2) }}</p>
        <button
          @click="submitOrder"
          :disabled="cartItems.length === 0"
          class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          Place Order
        </button>
      </div>
    </div>

    <!-- If cart is empty -->
    <div v-else class="text-center text-gray-600">
      Your cart is empty.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartstore'
import { useAuthStore } from '../stores/authstore'
import { useRouter } from 'vue-router'

// Get cart and auth
const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const cartItems = computed(() => cartStore.items)

// Totals
const totalItems = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.quantity, 0)
)

const subtotal = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

// Fake order submission
const submitOrder = () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  alert('Order submitted successfully!')
  // TODO: Replace with real backend order call
  cartStore.clearCart()
  router.push('/')
}
console.log('Cart items:', cartItems.image)
console.log('Total items:', totalItems.value)
</script>

<style scoped>
img {
  border: 1px solid #ddd;
}
</style>
