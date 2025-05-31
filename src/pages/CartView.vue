<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">🛒 Your Cart</h1>

    <div v-if="cart.items.length === 0" class="text-gray-500 text-center py-10">
      <p>Your cart is empty.</p>
    </div>

    <div v-else-if ="cart.items">
      <div
        v-for="item in cart.items"
        :key="item.id"
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 mb-4 bg-white shadow rounded-lg"
      > 
        <img v-if ="item.images && item.images.length > 0"
        :src="item.images[0].image"
        :alt="`${item.name} image`"
        class="w-full h-80 object-cover"
      />
        <img v-else
          src=""
          alt="Placeholder image"
          class="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0"
        />

        <div class="flex-1">
          <p class="text-lg font-semibold text-gray-700">{{ item.name }}</p>
          <p class="text-sm text-gray-500">${{ item.price }} × {{ item.quantity }}</p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="cart.increaseQty(item.id)"
            class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
            title="Increase quantity"
          >+</button>

          <button
            @click="cart.decreaseQty(item.id)"
            class="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
            title="Decrease quantity"
          >-</button>

          <button
            @click="cart.removeFromCart(item.id)"
            class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            title="Remove item"
          >Remove</button>
        </div>
      </div>
      <button
      @click="goToCheckout"
      class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
    >
      Checkout
    </button>

      <p class="text-right mt-6 text-xl font-bold text-gray-800">
        Subtotal: ${{ cart.subtotal.toFixed(2) }}
      </p>
    </div>
  </div>
</template>



<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const subtotal = computed(() => cart.subtotal)
const router = useRouter()

const goToCheckout = () => {
  router.push('/checkout')
}
console.log('🛒 Cart items:', cart.items)
</script>
