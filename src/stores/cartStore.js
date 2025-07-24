import { defineStore } from 'pinia'
import api from '../services/api'

let guestId = localStorage.getItem('guest_id')
if (!guestId) {
  guestId = crypto.randomUUID()
  localStorage.setItem('guest_id', guestId)
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  actions: {
    async loadCart() {
  try {
    const res = await api.get('/store/cart/', {
      params: {
        guest_id: guestId
      }
    })
    this.items = res.data.items
  } catch (err) {
    console.error('Failed to load cart:', err)
  }
},

  async addToCart(product, sizeId) {
  try {
    await api.post('/store/cart/add/', {
      product: product.id,
      size: sizeId,
      quantity: 1,
     guest_id: guestId,
    })
    await this.loadCart()
  } catch (err) {
    console.error('Add to cart failed:', err)
  }
},



    async updateQuantity(itemId, quantity) {
  try {
    const params = {}
    if (!localStorage.getItem('accessToken')) {
      params.guest_id = guestId
    }
    await api.put(`/store/cart/items/${itemId}/update/`, { quantity }, { params })
    await this.loadCart()
  } catch (err) {
    console.error('Update quantity failed:', err)
  }
},

async removeItem(itemId) {
  try {
    const config = {}
    if (!localStorage.getItem('accessToken')) {
      config.params = { guest_id: guestId }
    }
    await api.delete(`/store/cart/items/${itemId}/`, config)
    await this.loadCart()
  } catch (err) {
    console.error('Remove item failed:', err)
  }
},

    async clearCart() {
      const promises = this.items.map(item =>
        api.delete(`/store/cart/items/${item.id}/`)
      )
      await Promise.all(promises)
      this.items = []
    }
  },

  getters: {
    subtotal: (state) => {
      return state.items.reduce((sum, item) => {
        const price = parseFloat(item.product.price || 0)
        return sum + price * item.quantity
      }, 0)
    }
  }
})
