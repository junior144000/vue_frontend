import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 👈 your Django API base URL
  withCredentials: true // for sessions or cookies, if using authentication
})


// Register user
export function registerUser(data) {
  return api.post('/auth/register/', data)
}

// You can add more later:
export function loginUser(data) {
  return api.post('/auth/login/', data)
}


// Add access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export default api
