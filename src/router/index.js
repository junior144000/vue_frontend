import DefaultLayout from '../layouts/DefaultLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ProductView from '../pages/ProductView.vue'
import CartView from '../pages/CartView.vue'
import LoginView from '../pages/LoginView.vue'
import RegisterView from '../pages/RegisterView.vue'


const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children:[
        {
             path: '/', name: 'Home',component: Home
        },
       {
             path: '/product/:id', name: 'ProductView', component: ProductView
        },
        {
             path: '/cart', name: 'Cart',component: CartView
        }
    ]
  },
   { path: '/login', name: 'login', component: LoginView },
   { path: '/register', name: 'register', component: RegisterView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
