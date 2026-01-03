// Note: this file is created to silence the router warning in the console by @module-federation/bridge-vue3
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./pages/page-index.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
