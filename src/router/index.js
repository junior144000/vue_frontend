import DefaultLayout from '../layouts/DefaultLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ProductView from '../pages/ProductView.vue'


const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children:[
        {
             path: '/',
             name: 'Home',
             component: Home
        },
       {
             path: '/product/:id',
             name: 'ProductView',
             component: ProductView
        }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
