import Vue from 'vue'
import Router from 'vue-router'
import repairOrder from './modules/repairOrder'
import location from './modules/location'
import equipment from './modules/equipment'
import personnel from './modules/personnel'
import goods from './modules/goods'
import strategy from './modules/strategy'
import order from './modules/order'
import reconciliation from './modules/reconciliation'
const asyncRoutes = [
  repairOrder,
  location,
  equipment,
  personnel,
  goods,
  strategy,
  order,
  reconciliation
]
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '帝可得', icon: 'dashboard' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
