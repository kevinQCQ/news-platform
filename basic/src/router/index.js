// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/ContentArea.vue'),meta:{showBar:true}},
  { path: '/article-list', component: () => import('../views/ArticleList.vue'),meta:{showBar:true}},
  { path: '/login', component: () => import('../views/Login.vue') ,meta:{showBar:false}},
  { path: '/admin', component: () => import('../views/Admin.vue') ,meta:{showBar:true}},
  { path: '/article-upload', component: () => import('../views/ArticleUpload.vue') ,meta:{showBar:true}},
  { path: '/special-topic/:topicId', component: () => import('../views/SpecialTopic.vue') ,meta:{showBar:true}},
  { path: '/learning-center', component: () => import('../views/LearningCenter.vue') ,meta:{showBar:true}},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router