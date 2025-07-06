<template>
  <div class="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow bg-white">
    <h2 class="text-2xl font-semibold mb-4 text-center">🔑 Reset Your Password</h2>
    
    <form @submit.prevent="requestReset">
      <label class="block mb-2 font-medium">Email Address</label>
      <input
        v-model="email"
        type="email"
        required
        class="w-full p-2 border rounded mb-4"
        placeholder="Enter your email"
      />
      
      <button
        type="submit"
        class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        :disabled="loading"
      >
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </button>
      
      <p v-if="message" class="mt-4 text-green-600 text-sm text-center">{{ message }}</p>
      <p v-if="error" class="mt-2 text-red-500 text-sm text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from '../services/api'

const email = ref('')
const message = ref('')
const error = ref('')
const loading = ref(false)

const requestReset = async () => {
  loading.value = true
  error.value = ''
  message.value = ''

  try {
    const res = await axios.post('/auth/request-reset/', { email: email.value })
    message.value = res.data.detail
  } catch (err) {
    error.value = err.response?.data?.detail || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}
</script>
