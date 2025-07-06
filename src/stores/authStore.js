// src/stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { loginUser } from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken
  },
  actions: {
    async login(credentials) {
      const response = await loginUser(credentials)
      this.accessToken = response.data.access
      localStorage.setItem('accessToken', response.data.access)


      

      // Optional: fetch user profile here if needed
    },
    logout() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
    },
    initialize() {
      const token = localStorage.getItem('accessToken')
      if (token) {
        this.accessToken = token
      }
    }
  }
})
