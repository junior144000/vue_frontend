<template>

    <!-- 🛍️ Product Grid -->
    
        <div class="grid grid-cols-2 gap-2 px-2 py-4">
            <ProductCard
             v-for="(product, index) in products"
             :key="index"
             :product="product"
             :index="index"
             @toggle-wishlist="toggleWishlist"
             />
         </div>
    
    
  
</template>

<script setup>
import { reactive } from 'vue'
import ProductCard from './ProductCard.vue'


// 🛍️ Product list with wishlist state
const products = reactive([
  {
    name: 'Red Floral Dress',
    price: 29.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRYMNRdZILSvgwV5Kj_F6szhhV1wDr7Q7YMw&s',
    wishlisted: false
  },
  {
    name: 'Men\'s Streetwear T-Shirt',
    price: 19.99,
    image: 'https://via.placeholder.com/300x300/3333FF/fff?text=Shirt',
    wishlisted: false
  },
  {
    name: 'Kids Sneakers',
    price: 24.5,
    image: 'https://via.placeholder.com/300x300/00CC99/fff?text=Shoes',
    wishlisted: false
  },
  {
    name: 'Stylish Handbag',
    price: 49.0,
    image: 'https://via.placeholder.com/300x300/FFC107/000?text=Bag',
    wishlisted: false
  }
])


</script>

