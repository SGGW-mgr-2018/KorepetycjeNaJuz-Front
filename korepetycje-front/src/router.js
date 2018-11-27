import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// import authenticated from './middleware/authenticated'
// import notAuthenticated from './middleware/notAuthenticated'
import log from './middleware/log'
// import notAuthenticated from './middleware/notAuthenticated'
import { nextFactory } from './assets/js/routerUtils'

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
      // meta: {
      //   middleware: notAuthenticated
      // }
    },
    {
      path: '/rejestracja',
      name: 'rejestracja',
      component: () => import(/* webpackChunkName: "register" */ './views/Register')
      // meta: {
      //   middleware: notAuthenticated
      // }
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})

export default router
