// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: '/', component: () => import('../components/ContentArea.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router