// stores/product.js
import { defineStore } from 'pinia'
import api from '../services/api' // Adjust the path to your API module

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],       // List of products
    loading: false,
    error: null
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/api/store/products/')
        this.products = res.data
      } catch (err) {
        this.error = 'Failed to load products.'
      } finally {
        this.loading = false
      }
    }
  }
})
