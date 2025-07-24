

<template>
  <div v-if="product" class="bg-white p-2 rounded-lg shadow-sm relative">
     <RouterLink :to="`/product/${product.id}`">
        <!-- Product Image -->
        <img
        v-if="product.images.length > 0"
        :src="`${product.images[0].image}`"
        alt="Product image"
        class="w-full h-40 object-cover rounded-md"
        />


                    <!-- Product Name -->
            <h3 class="text-sm mt-2 font-medium line-clamp-2">
                  {{ product.name }}
            </h3>
     </RouterLink> <!-- Product Image -->
      

      <!-- Price + Wishlist Button -->
      <div class="flex justify-between items-center mt-1">

        <!-- 💸 Price display -->
        <div class="text-sm mt-1">
          <span v-if="product.original_price && product.original_price > product.price" class="line-through text-gray-400 mr-2">
            ${{ product.original_price }}
          </span>
          <span class="text-red-600 font-semibold">${{ product.price }}</span>
        </div>

            <!-- 🏷️ Tags -->
        <div class="flex flex-wrap mt-2 gap-1">
          <span
            v-for="tag in product.tags"
            :key="tag.id"
            class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
          >
            {{ tag.name }}
          </span>
        </div>

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
     <!-- Optional fallback if product is not ready -->
  <div v-else class="p-2 text-sm text-gray-400">Loading product...</div>
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
    // ✅ Define props properly
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

// ✅ Destructure for clean access
const { product, index } = props
</script>

