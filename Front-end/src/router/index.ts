import { createRouter, createWebHistory } from 'vue-router'
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
          path: 'login',
          name: 'login',
          component: () => import('../views/Login.vue'),
        },

        {
          path: 'home',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue'),
        },
        {
          path: 'tasks',
          name: 'tasks',
          component: () => import ('../views/Tasks.vue'),
        },
        {
          path: 'notifications',
          name:'notifications',
          component: () => import('../views/Notifications.vue'),
        },

        {
          path: 'logout',
          name: 'logout',
          component:() => import('../views/Logout.vue'),
        },
        {
          path: 'register',
          name:'register',
          component:() => import ('../views/Register.vue'),
        },
        {
          path:'settings',
          name:'settings',
          component:() =>('../views/Settings.vue'),
        },
        {
          path:'calendar',
          name:'calendar',
          component:() =>('../views/Calendar.vue'),
        },

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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    }
  ]
})

export default router
