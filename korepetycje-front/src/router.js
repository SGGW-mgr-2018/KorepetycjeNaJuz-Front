import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        middleware: log
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/logowanie',
      name: 'logowanie',
      component: () => import(/* webpackChunkName: "login" */ './views/Login')
    },
    {
      path: '/rejestracja',
      name: 'rejestracja',
      component: () => import(/* webpackChunkName: "register" */ './views/Register')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import(/* webpackChunkName: "mapView" */ './views/MapView')
    },
    {
      path: '/moje-konto',
      name: 'moje-konto',
      component: () => import(/* webpackChunkName: "myAccount" */ './views/MyAccount')
    },
    {
      path: '/nowa-lekcja',
      name: 'nowa-lekcja',
      component: () => import(/* webpackChunkName: "newLesson" */ './views/AddNewLesson')
    }
  ]
})

export default router
