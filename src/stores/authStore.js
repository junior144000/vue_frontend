// src/stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'
import { loginUser } from '../services/api'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    user: null // 🆕 Store user info from /auth/me/
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken
  },
  actions: {
    async login(credentials) {
      const response = await loginUser(credentials)
      this.accessToken = response.data.access
      localStorage.setItem('accessToken', response.data.access)

      await this.fetchUser() // 🆕 Fetch user profile after login
    },
    logout() {
      this.accessToken = null
      this.user = null // 🆕 Clear user on logout
      localStorage.removeItem('accessToken')
    },
    async fetchUser() {
      // 🆕 Call the Django endpoint /auth/me/ to get user data
      try {
        const res = await api.get('/auth/me/')
        this.user = res.data
      } catch (err) {
        console.error('Failed to fetch user:', err)
        this.logout() // 🆕 Auto-logout if token is invalid
      }
    },
    async initialize() {
      const token = localStorage.getItem('accessToken')
      if (token) {
        this.accessToken = token
        await this.fetchUser() // 🆕 Fetch user on app init
      }
    }
  }
})
