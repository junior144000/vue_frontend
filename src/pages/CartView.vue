<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">🛒 Your Cart</h1>

    <!-- ✅ Empty Cart -->
    <div v-if="cart.items.length === 0" class="text-gray-500 text-center py-10">
      <p>Your cart is empty.</p>
    </div>

    <!-- ✅ Cart Items -->
    <div v-else>
      <div
        v-for="item in cart.items"
        :key="`${item.product.id}-${item.size}`"
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 mb-4 bg-white shadow rounded-lg"
      >
        <img
          v-if="item.product.images && item.product.images.length > 0"
          :src="item.product.images[0].image"
          :alt="`${item.product.name} image`"
          class="w-full sm:w-32 h-32 object-cover rounded"
        />

        <div class="flex-1">
          <p class="text-lg font-semibold text-gray-700">{{ item.product.name }}</p>
          <p class="text-sm text-gray-500">Size: {{ item.size }}</p>
          <p class="text-sm text-gray-500">Price: ${{ item.product.price }}</p>
          <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="cart.updateQuantity(item.id, item.quantity + 1)"
            class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
            title="Increase quantity"
          >+</button>

          <button
            @click="cart.updateQuantity(item.id, item.quantity - 1)"
            class="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
            title="Decrease quantity"
          >-</button>

          <button
            @click="cart.removeItem(item.id)"
            class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            title="Remove item"
          >Remove</button>
        </div>
      </div>

      <!-- ✅ Subtotal & Checkout -->
      <div class="flex justify-between items-center mt-6">
        <p class="text-xl font-bold text-gray-800">
          Subtotal: ${{ subtotal.toFixed(2) }}
        </p>
        <button
          @click="goToCheckout"
          class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
onMounted(() => {
  cart.loadCart()
})


const cart = useCartStore()
const subtotal = computed(() => cart.subtotal || 0)
const router = useRouter()


function goToCheckout() {
  router.push('/checkout')
}
</script>
