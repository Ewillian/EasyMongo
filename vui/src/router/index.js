import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/HelloWorld.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/getone',
    name: 'GetOne',
    component: () => import('../components/GetOne.vue')
  },

  {
    path: '/getall',
    name: 'GetAll',
    component: () => import('../components/GetAll.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
