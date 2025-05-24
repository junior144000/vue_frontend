<template>
  <!-- Swiper container -->
  <Swiper
    :modules="[Autoplay, Pagination]"
    :slides-per-view="1"
    :loop="true"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    pagination
    class="w-full h-52 mt-14"
  >
    <!-- Slide items -->
    <SwiperSlide v-for="(slide, index) in slides" :key="index">
      <img :src="slide" alt="Promo" class="w-full h-full object-cover rounded-md" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'

// Replace with your own image URLs later
const slides = [
  'https://via.placeholder.com/400x200/FF3366/fff?text=Summer+Sale',
  'https://via.placeholder.com/400x200/3333FF/fff?text=New+Arrivals',
  'https://via.placeholder.com/400x200/00CC99/fff?text=Shop+Now'
]
</script>

<style scoped>
/* Optional custom styling */
.swiper-pagination-bullet-active {
  background-color: #ff3366;
}
</style>
