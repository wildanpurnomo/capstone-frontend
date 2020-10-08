import Vue from 'vue'
import VueRouter from 'vue-router'
import { authRouter } from './authRouter'
import { mainRouter } from './mainRouter'

Vue.use(VueRouter)

const routes = [
  authRouter,
  mainRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
