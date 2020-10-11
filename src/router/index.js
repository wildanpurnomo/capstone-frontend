import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Tambah from '../views/Tambah'
import Hasil from '../views/Hasil';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/tambah_baru',
    name: 'Tambah Baru',
    component: Tambah
  },
  {
    path: '/hasil',
    name: 'Hasil',
    component: Hasil
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
