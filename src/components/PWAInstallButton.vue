<template>
  <div v-if="showInstall" class="fixed bottom-4 right-4 z-50">
    <button
      @click="installApp"
      class="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-2xl shadow-lg"
    >
      📲 Install Celosia App
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showInstall = ref(false)
let deferredPrompt = null

onMounted(() => {
  // Listen for the browser's install event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    showInstall.value = true
  })

  // If app is already installed, don't show button
  window.addEventListener('appinstalled', () => {
    console.log('Celosia installed!')
    showInstall.value = false
  })
})

const installApp = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
      console.log('User accepted install prompt')
    } else {
      console.log('User dismissed install prompt')
    }
    deferredPrompt = null
    showInstall.value = false
  }
}
</script>
