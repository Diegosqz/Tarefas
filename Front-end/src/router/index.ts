import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    {
      path:'/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
},
    {
	path: '/login',
	name: 'login',
	component:() => import('../views/Login.vue'),
  
}]})

export default router
