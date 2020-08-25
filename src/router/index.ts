import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('@/views/layout/index.tsx'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.tsx')
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
      },
      {
        path: '/profile/:username',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index.tsx'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/index.tsx'),
        meta: { requiresAuth: true }
      },
      {
        path: '/editor/:slug?',
        name: 'editor',
        component: () => import(/* webpackChunkName: "editor" */ '@/views/editor/index.tsx'),
        meta: { requiresAuth: true }
      },
      {
        path: '/article/:slug',
        name: 'article',
        component: () => import(/* webpackChunkName: "article" */ '@/views/article/index.tsx'),
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
