import Vue from 'vue'
import VueRouter from 'vue-router'
import registerPage from '../views/registerPage.vue'
import loginPage from '../views/loginPage.vue'
import homePage from '../views/homePage.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'registerPage',
    component: registerPage,
    meta: { requiresVisitor: true }
  },
  {
    path: '/login',
    name: 'loginPage',
    component: loginPage,
    meta: { requiresVisitor: true }
  },
  {
    path: '/',
    name: 'homePage',
    component: homePage,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLogin) {
      next({
        path: '/login'
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
