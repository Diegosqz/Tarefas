import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthenticatedLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue'),
        }
      ]
    },
    {
      path: '/auth',
      component: GuestLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/Login.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/Register.vue'),
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    }
  ]
})

export default router
