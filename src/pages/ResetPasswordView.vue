<template>
  <div class="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow bg-white">
    <h2 class="text-2xl font-semibold mb-4 text-center">🔒 Set New Password</h2>

    <form @submit.prevent="submitNewPassword">
      <label class="block mb-1 font-medium">New Password</label>
      <input
        v-model="password"
        type="password"
        required
        class="w-full p-2 border rounded mb-3"
        placeholder="Enter new password"
      />

      <label class="block mb-1 font-medium">Confirm Password</label>
      <input
        v-model="confirmPassword"
        type="password"
        required
        class="w-full p-2 border rounded mb-4"
        placeholder="Confirm new password"
      />

      <button
        type="submit"
        class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        :disabled="loading"
      >
        {{ loading ? 'Submitting...' : 'Reset Password' }}
      </button>

      <p v-if="message" class="mt-4 text-green-600 text-center">{{ message }}</p>
      <p v-if="error" class="mt-2 text-red-500 text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../services/api'

const route = useRoute()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const message = ref('')
const error = ref('')

const submitNewPassword = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match."
    return
  }

  loading.value = true
  error.value = ''
  message.value = ''

  try {
    const { uid, token } = route.params
    const response = await axios.post(`/auth/reset-password/${uid}/${token}/`, {
      password: password.value
    })

    message.value = "Password reset successful! Redirecting to login..."
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.detail || "Something went wrong."
  } finally {
    loading.value = false
  }
}
</script>
