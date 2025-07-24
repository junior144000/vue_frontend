<template>
  <div class="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
    <div class="text-green-500 text-5xl mb-4">
      <i class="fas fa-check-circle"></i>
    </div>

    <h1 class="text-2xl font-semibold mb-2">Thank you for your order!</h1>
    <p class="text-gray-600 mb-6">
      Your order has been placed successfully. We’ll contact you soon to confirm delivery.
    </p>

    <div class="flex gap-4">
      <button
        @click="goToOrders"
        class="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
      >
        View Orders
      </button>
      <button
        @click="goToHome"
        class="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToHome = () => router.push('/')
const goToOrders = () => router.push('/account/orders')
</script>
