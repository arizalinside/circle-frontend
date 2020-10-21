import Vue from 'vue'
import VueRouter from 'vue-router'
import registerPage from '../views/registerPage.vue'
import loginPage from '../views/loginPage.vue'
import homePage from '../views/homePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'registerPage',
    component: registerPage
  },
  {
    path: '/login',
    name: 'loginPage',
    component: loginPage
  },
  {
    path: '/home',
    name: 'homePage',
    component: homePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
