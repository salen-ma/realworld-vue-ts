import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
