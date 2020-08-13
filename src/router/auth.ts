import router from './index'
import Cookie from 'js-cookie'
import { User } from '@/api/user'

router.beforeEach((to, from, next) => {
  const userString = Cookie.get('user')
  let user: User = null
  try {
    user = JSON.parse(userString as string)
  } catch (err) {}

  // 未登录不可访问的页面
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user || !user.token) {
      next({ path: '/register' })
    } else {
      next()
    }
  // 登录后不可访问的页面
  } else if (to.matched.some(record => record.meta.noAuth)) {
    if (user && user.token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})
