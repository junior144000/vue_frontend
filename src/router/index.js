import DefaultLayout from '../layouts/DefaultLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ProductView from '../pages/ProductView.vue'
import CartView from '../pages/CartView.vue'
import LoginView from '../pages/LoginView.vue'
import RegisterView from '../pages/RegisterView.vue'
import CheckOutView from '../pages/CheckOutView.vue'
import { useAuthStore } from '../stores/authStore.js'
import RequestResetView from '../pages/RequestResetView.vue'
import ResetPasswordView from '../pages/ResetPasswordView.vue'
import DeliveryAddressView from '../pages/DeliveryAddressView.vue' 
import SuccessView from '../pages/SuccessView.vue'


const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children:[
        {path: '/', name: 'Home',component: Home},
        {path: '/product/:id', name: 'ProductView', component: ProductView},
        {path: '/cart', name: 'Cart',component: CartView},
        {path: '/request-reset',name: 'RequestReset',component: RequestResetView},
        {path: '/reset-password/:uid/:token',name: 'ResetPassword',component: ResetPasswordView},
        {path: '/address', name: 'DeliveryAddress', component: DeliveryAddressView, meta: { requiresAuth: true } },
        {path: '/success',name: 'Success',component: SuccessView}
        

    ]
  },
   { path: '/login', name: 'login', component: LoginView },
   { path: '/register', name: 'register', component: RegisterView },
   { path: '/checkout', component: CheckOutView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// ✅ Route guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login') // redirect to login if not authenticated
  } else {
    next() // proceed to route
  }
})




export default router
