import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000//api', // 👈 your Django API base URL
  withCredentials: true // for sessions or cookies, if using authentication
})

export default api
