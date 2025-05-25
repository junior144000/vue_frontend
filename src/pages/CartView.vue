<template>
  <div class="pb-24">
    <!-- Cart Header -->
    <div class="px-4 py-3 bg-white shadow text-lg font-bold">
      My Bag ({{ cart.length }})
    </div>

    <!-- Cart Items -->
    <div v-if="cart.length" class="divide-y">
      <div
        v-for="(item, index) in cart"
        :key="index"
        class="flex items-start gap-3 p-4 bg-white"
      >
        <img
          :src="item.image"
          alt="Product"
          class="w-20 h-20 object-cover rounded-md"
        />
        <div class="flex-1">
          <h3 class="text-sm font-medium leading-tight">{{ item.name }}</h3>
          <p class="text-xs text-gray-500 mt-1">Size: {{ item.size }}</p>

          <div class="flex justify-between items-center mt-2">
            <!-- Quantity Controls -->
            <div class="flex items-center gap-2">
              <button @click="decreaseQty(index)" class="px-2 py-1 border rounded text-sm">-</button>
              <span class="text-sm">{{ item.quantity }}</span>
              <button @click="increaseQty(index)" class="px-2 py-1 border rounded text-sm">+</button>
            </div>

            <!-- Item Price -->
            <p class="text-red-500 font-semibold text-sm">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>
        <button @click="removeItem(index)" class="text-gray-400 text-lg ml-1">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="text-center mt-20 text-gray-500 text-sm">
      Your bag is empty.
    </div>

    <!-- Checkout Bar -->
    <div v-if="cart.length" class="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3">
      <div class="flex justify-between items-center mb-2">
        <p class="text-sm text-gray-700">Subtotal</p>
        <p class="font-semibold text-red-500">${{ total.toFixed(2) }}</p>
      </div>
      <button class="w-full py-3 bg-red-500 text-white text-sm rounded-full font-semibold">
        Checkout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 🛒 Mock cart data (replace with Vuex or backend later)
const cart = ref([
  {
    name: 'Elegant Summer Dress',
    price: 32.99,
    size: 'M',
    image: 'https://via.placeholder.com/600x600/FF3366/fff?text=Dress',
    quantity: 1
  },
  {
    name: 'Stylish Sneakers',
    price: 45.5,
    size: '42',
    image: 'https://via.placeholder.com/600x600/3333FF/fff?text=Sneakers',
    quantity: 2
  }
])

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const increaseQty = (index) => {
  cart.value[index].quantity++
}

const decreaseQty = (index) => {
  if (cart.value[index].quantity > 1) cart.value[index].quantity--
}

const removeItem = (index) => {
  cart.value.splice(index, 1)
}
</script>
