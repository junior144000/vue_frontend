<template>
  <div class="w-full max-w-sm mx-auto">
    <h1 class="text-xl font-semibold mb-6 text-center">Create an Account</h1>
    <p v-if="error" class="text-red-500 text-sm mb-4 text-center">{{ error }}</p>

    <!-- Full Name -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="name">Full Name</label>
      <input v-model="name" id="name" type="text" placeholder="John Doe" class="w-full border rounded px-3 py-2" />
    </div>

    <!-- Email -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="email">Email</label>
      <input v-model="email" id="email" type="email" placeholder="john@example.com" class="w-full border rounded px-3 py-2" />
    </div>

    <!-- Gender -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="gender">Gender</label>
      <select v-model="gender" id="gender" class="w-full border rounded px-3 py-2">
        <option disabled value="">Select gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </select>
    </div>

    <!-- Date of Birth -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="dob">Date of Birth</label>
      <input v-model="dob" id="dob" type="date" class="w-full border rounded px-3 py-2" />
    </div>

    <!-- Password -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="password">Password</label>
      <input v-model="password" id="password" type="password" class="w-full border rounded px-3 py-2" />
    </div>

    <!-- Confirm Password -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1" for="confirmPassword">Confirm Password</label>
      <input v-model="confirmPassword" id="confirmPassword" type="password" class="w-full border rounded px-3 py-2" />
    </div>

    <!-- Terms Checkbox -->
<div class="mb-4 flex items-start gap-2 text-sm">
  <input type="checkbox" id="agree" v-model="agreed" class="mt-1" />
  <label for="agree">
    I agree to the
    <a href="/terms" class="text-red-500 underline">Terms of Service</a>
    and
    <a href="/privacy" class="text-red-500 underline">Privacy Policy</a>.
  </label>
</div>


    <!-- Register Button -->
    <button
      @click="handleRegister"
      :disabled="loading"
      class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
    >
      {{ loading ? 'Creating...' : 'Register' }}
    </button>

    <!-- Link to login -->
    <p class="mt-4 text-center text-sm">
      Already have an account?
      <router-link to="/login" class="text-red-500 font-medium">Sign in</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '../../services/api'

const router = useRouter()

const name = ref('')
const email = ref('')
const gender = ref('')
const dob = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref(null)
const loading = ref(false)
const agreed = ref(false)


// Handles user registration
const handleRegister = async () => {
  error.value = null

  // Basic form validation
  if (!name.value || !email.value || !gender.value || !dob.value) {
    error.value = 'Please fill out all fields.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords don't match."
    return
  }

  if (!agreed.value) {
  error.value = 'You must agree to the terms and privacy policy.'
  return
}


  loading.value = true

  try {
    const response = await registerUser({
      full_name: name.value,
      email: email.value,
      gender: gender.value,
      date_of_birth: dob.value,
      password: password.value
    })

    // Redirect to login after success
    router.push('/login')
  } catch (err) {
    error.value = err.response?.data?.detail || 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
input:focus, select:focus {
  outline: none;
  border-color: #f43f5e;
  box-shadow: 0 0 0 1px #f43f5e;
}
</style>
