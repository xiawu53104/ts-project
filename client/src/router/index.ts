import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/userCenter'
  },
  {
    path: '/login',
    // name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/userCenter',
    name: 'userCenter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "userCenter" */ '../views/userCenter/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token: string | null = window.sessionStorage.getItem('token')
  if (token) {
    next()
  } else if (to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
