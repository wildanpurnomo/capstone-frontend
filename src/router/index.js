import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthRoutes from '../router/authRouter'
import MainRoutes from '../router/mainRouter'

Vue.use(VueRouter)

var allRoutes = []

allRoutes = allRoutes.concat(AuthRoutes, MainRoutes)

const routes = allRoutes

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
