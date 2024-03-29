import { createRouter, createWebHistory } from 'vue-router'
import SQLCreate from '../views/SQLCreate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/SQLCreate',
      name: 'SQLCreate',
      component: SQLCreate
    },
    {
      path: '/project',
      name: 'project',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Project.vue')
    },
    {
      path: '/updateinfo',
      name: 'updateinfo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UpdateInfo.vue')
    },
    {
      path: '/sqlcooperation',
      name: 'sqlcooperation',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SQLCooperation.vue')
    }
  ]
})

export default router
