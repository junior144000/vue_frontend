<template>
  <div class="w-full max-w-sm mx-auto">
    <h1 class="text-xl font-semibold mb-6 text-center">Sign In</h1>

    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-sm mb-4 text-center">{{ error }}</p>

    <!-- Email Input -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="email">Email</label>
      <input
        v-model="email"
        id="email"
        type="email"
        placeholder="john@example.com"
        class="w-full border rounded px-3 py-2"
      />
    </div>

    <!-- Password Input -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="password">Password</label>
      <input
        v-model="password"
        id="password"
        type="password"
        placeholder="••••••••"
        class="w-full border rounded px-3 py-2"
      />
    </div>

    <!-- Login Button -->
    <button
      @click="handleLogin"
      :disabled="loading"
      class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
    >
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>

    <!-- Link to Register -->
    <p class="mt-4 text-center text-sm">
      Don't have an account?
      <router-link to="/register" class="text-red-500 font-medium">Sign up</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  error.value = null

  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password.'
    return
  }

  loading.value = true

  try {
    await auth.login({ email: email.value, password: password.value })
    router.push('/')
  } catch (err) {
    error.value =
      Object.values(err.response?.data || {}).join(' ') || 'Invalid credentials'
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
