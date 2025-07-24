<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h2 class="text-2xl font-semibold mb-6">Checkout</h2>

    <div v-if="cartItems.length > 0" class="grid gap-6 md:grid-cols-2">
      <!-- 🛍️ Cart Items -->
      <div class="space-y-4">
        <div
          v-for="item in cartItems"
          :key="`${item.product.id}-${item.size}`"
          class="flex gap-4 border p-4 rounded shadow-sm bg-white"
        >
          <img
            v-if="item.product.images && item.product.images.length > 0"
            :src="item.product.images[0].image"
            alt="Product image"
            class="w-24 h-24 object-cover rounded"
          />
          <div class="flex flex-col justify-between">
            <div>
              <h3 class="font-semibold text-lg">{{ item.product.name }}</h3>
              <p class="text-sm text-gray-600">Size: {{ item.size }}</p>
              <p class="text-sm text-gray-600">Quantity: {{ item.quantity }}</p>
            </div>
            <p class="text-red-500 font-semibold">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <!-- 📦 Summary & Delivery -->
      <div class="p-6 border rounded shadow-md bg-gray-50 space-y-4">
        <h3 class="text-lg font-medium mb-4">Summary</h3>
        <p>Total Items: {{ totalItems }}</p>
        <p class="font-semibold">Subtotal: ${{ subtotal.toFixed(2) }}</p>

        <!-- 📞 Phone Number -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="text"
            v-model="phone"
            placeholder="e.g., +592-600-1234"
            class="w-full border rounded px-3 py-2"
          />
        </div>

        <!-- 📍 Delivery Address -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
          <textarea
            v-model="location"
            placeholder="e.g., Lot 12, Lamaha Street, Georgetown"
            class="w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        <!-- 🛒 Submit Button -->
        <button
          @click="submitOrder"
          :disabled="isSubmitting || !formIsValid"
          class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {{ isSubmitting ? 'Placing Order...' : 'Place Order' }}
        </button>
      </div>
    </div>

    <!-- 🧺 Empty Cart -->
    <div v-else class="text-center text-gray-600">Your cart is empty.</div>
  </div>
</template>


<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import api from '../services/api'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const phone = ref('')
const location = ref('')
const isSubmitting = ref(false)

const cartItems = computed(() => cartStore.items)
const totalItems = computed(() =>
  cartStore.items.reduce((sum, item) => sum + item.quantity, 0)
)

const subtotal = computed(() =>
  cartStore.items.reduce((sum, item) => {
    const price = parseFloat(item.product.price || 0)
    return sum + price * item.quantity
  }, 0)
)

const formIsValid = computed(() => phone.value && location.value)

const submitOrder = async () => {
  isSubmitting.value = true
  try {
    const response = await api.post('/store/orders/create/', {
      phone_number: phone.value,
      location: location.value
    })

   await cartStore.loadCart()  // ✅ refresh from server
    router.push('/success')
  } catch (err) {
    console.error('Order failed:', err.response?.data || err.message)
  } finally {
    isSubmitting.value = false
  }
}


</script>
