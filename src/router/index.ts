import { createRouter, createWebHistory } from 'vue-router'
import SessionsView from '../views/SessionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SessionsView,
    },
  ],
})

export default router
