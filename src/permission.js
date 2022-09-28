import router from '@/router'
import store from '@/store'
const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
  if (store.getters.token) {
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    // 如果有token 继续判断是不是去登录页
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
