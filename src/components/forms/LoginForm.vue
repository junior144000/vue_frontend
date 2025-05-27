<template>
  <div class="w-full max-w-sm mx-auto">
    <h1 class="text-xl font-semibold mb-6 text-center">Sign In to Your Account</h1>

    <!-- Error message display -->
    <p v-if="error" class="text-red-500 text-sm mb-4 text-center">{{ error }}</p>

    <!-- Email Input -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="email">Email</label>
      <input
        v-model="email"
        id="email"
        type="email"
        placeholder="Enter your email"
        class="w-full border rounded px-3 py-2"
      />
    </div>

    <!-- Password Input -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="password">Password</label>
      <div class="relative">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          placeholder="Enter your password"
          class="w-full border rounded px-3 py-2 pr-10"
        />
        <button
          type="button"
          class="absolute right-2 top-2 text-sm text-gray-600"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      @click="handleLogin"
      :disabled="loading"
      class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
    >
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>

    <!-- Link to register -->
    <p class="mt-4 text-center text-sm">
      Don't have an account?
      <router-link to="/register" class="text-red-500 font-medium">Sign up</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref(null)

const router = useRouter()

const handleLogin = async () => {
  error.value = null

  // Basic front-end validation
  if (!email.value || !password.value) {
    error.value = 'Please enter both email and password.'
    return
  }

  loading.value = true
  try {
    // Replace URL with your Django backend login endpoint
    const response = await axios.post('http://localhost:8000/api/auth/login/', {
      email: email.value,
      password: password.value
    })

    // Store JWT tokens in localStorage
    localStorage.setItem('accessToken', response.data.access)
    localStorage.setItem('refreshToken', response.data.refresh)

    // Redirect to home page after login
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.detail || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #f43f5e;
  box-shadow: 0 0 0 1px #f43f5e;
}
</style>
