import Vue from 'vue'
import VueRouter from 'vue-router'
import { landingRouter } from './landingRouter'
import { authRouter } from './authRouter'
import { mainRouter } from './mainRouter'
import { fallbackRouter } from './404Router'

Vue.use(VueRouter)

const routes = [
  landingRouter,
  authRouter,
  mainRouter,
  fallbackRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
