<template>
  <div class="max-w-xl mx-auto py-8 px-4">
    <h2 class="text-2xl font-bold mb-6">Delivery Address</h2>

    <form @submit.prevent="saveAddress" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Full Name</label>
        <input v-model="form.full_name" type="text" class="input" required />
      </div>

      <div>
        <label class="block text-sm font-medium">Address Line 1</label>
        <input v-model="form.address_line_1" type="text" class="input" required />
      </div>

      <div>
        <label class="block text-sm font-medium">Address Line 2</label>
        <input v-model="form.address_line_2" type="text" class="input" />
      </div>

      <div>
        <label class="block text-sm font-medium">Village</label>
        <input v-model="form.village" type="text" class="input" required />
      </div>

      <div>
        <label class="block text-sm font-medium">Region</label>
        <select v-model="form.region" class="input" required>
          <option value="">Select a region</option>
          <option v-for="n in 10" :key="n" :value="`Region ${n}`">Region {{ n }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium">Phone Number</label>
        <input v-model="form.phone_number" type="text" class="input" required />
      </div>

      <button
        type="submit"
        class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        :disabled="!formChanged"
      >
        Save Address
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import api from '../services/api'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

if (!authStore.isAuthenticated) router.push('/login')

const form = reactive({
  full_name: '',
  address_line_1: '',
  address_line_2: '',
  village: '',
  region: '',
  phone_number: ''
})

let originalData = {}

const fetchAddress = async () => {
  try {
    const res = await api.get('/auth/addresses/')
    if (res.data.length > 0) {
        Object.assign(form, res.data[0])
        originalData = { ...res.data[0] }
    }
  } catch (err) {
    if (err.response?.status !== 404) {
      alert('Failed to load address')
    }
  }
}

const formChanged = computed(() => {
  return JSON.stringify(form) !== JSON.stringify(originalData)
})

const saveAddress = async () => {
  try {
    if (originalData.id) {
      await api.patch(`/auth/addresses/${originalData.id}/`, form)
    } else {
      await api.post(`/auth/addresses/`, form)
    }
    alert('✅ Address saved!')
    originalData = { ...form }
  } catch (err) {
    alert('❌ Failed to save address')
  }
}

onMounted(fetchAddress)
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  margin-top: 0.25rem;
}
</style>
