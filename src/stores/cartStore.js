import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart') || '[]')
  }),
  actions: {
    addToCart(product) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveCart()
    },
    increaseQty(id) {
      const item = this.items.find((i) => i.id === id)
      if (item) item.quantity += 1
    },

    decreaseQty(id) {
      const item = this.items.find((i) => i.id === id)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else {
        prompt('Cart item quantity cannot be less than 1.')
      }
    },
    removeFromCart(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveCart()
    },
    clearCart() {
      this.items = []
      this.saveCart()
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    }
  },
  getters: {
    subtotal: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  }
})
