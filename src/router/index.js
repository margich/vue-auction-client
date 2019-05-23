import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Home from '@/views/Home'
import Today from '@/views/Today'
import List from '@/views/List'
import Live from '@/views/Live'
import Cart from '@/views/Cart'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Makes from '@/views/Makes'
import Categories from '@/views/Categories'
import About from '@/views/About'
import Support from '@/views/Support'
import Privacy from '@/views/Privacy'
import Terms from '@/views/Terms'
import Dashboard from '@/views/Dashboard'
import Winnings from '@/views/Winnings'
import Edit from '@/views/Edit'
import Password from '@/views/Password'
import Vehicle from '@/views/Vehicle'
Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/today',
    name: 'today',
    component: Today
  },
  {
    path: '/vehicle/:id',
    name: 'vehicle',
    component: Vehicle
  },
  {
    path: '/list/:id',
    name: 'list',
    component: List
  },
  {
    path: '/live/:id',
    name: 'live',
    component: Live
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/makes/:id',
    name: 'makes',
    component: Makes
  },
  {
    path: '/categories/:id',
    name: 'categories',
    component: Categories
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  },
  {
    path: '/terms',
    name: 'terms',
    component: Terms
  },
  {
    path: '/support',
    name: 'support',
    component: Support
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/winnings',
    name: 'winnings',
    component: Winnings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/password',
    name: 'password',
    component: Password,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*', redirect: '/'
  }
  ]
})

/* router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/today', '/list', '/live/:id', '/register', '/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
}) */

router.beforeEach((to, from, next) => {
  store.dispatch('clear')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

/* router.afterEach((to, from, next) => {
  store.dispatch('setMessage', {status: '', message: ''})
}) */
