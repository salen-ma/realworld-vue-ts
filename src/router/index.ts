import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.tsx'),
        props: { isLogin: true },
        meta: { noAuth: true }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/login/index.tsx'),
        props: { isLogin: false },
        meta: { noAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
