// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/ContentArea.vue')},
  { path: '/article-list', component: () => import('../views/ArticleList.vue')},
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/admin', component: () => import('../views/Admin.vue') },
  { path: '/article-upload', component: () => import('../views/ArticleUpload.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router