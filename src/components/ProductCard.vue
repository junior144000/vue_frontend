

<template>
  <div class="bg-white p-2 rounded-lg shadow-sm relative">
     <RouterLink :to="`/product/${product.id}`">
        <!-- Product Image -->
            <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-40 object-cover rounded-md"
             />

                    <!-- Product Name -->
            <h3 class="text-sm mt-2 font-medium line-clamp-2">
                  {{ product.name }}
            </h3>
     </RouterLink> <!-- Product Image -->
      

      <!-- Price + Wishlist Button -->
      <div class="flex justify-between items-center mt-1">
        <p class="text-red-600 font-semibold text-sm">${{ product.price }}</p>

        <!-- Wishlist Icon -->
        <button @click.stop="$emit('toggle-wishlist', index)">
          <i
            :class="[
              'fas text-sm',
              product.wishlisted ? 'fa-heart text-red-500' : 'fa-heart text-gray-400'
            ]"
          ></i>
        </button>
      </div>
    </div>
</template>


<style scoped>
/* Clamp product name text */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<script setup>
defineProps({ product: Object, index: Number })

</script>

