<template>
  <div class="animate-pulse bg-gray-100 rounded-md" :style="style"></div>
</template>

<script setup>
const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '1rem' },
  radius: { type: String, default: '0.25rem' }
})

const style = {
  width: props.width,
  height: props.height,
  borderRadius: props.radius
}
</script>
