import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue"
import Register from './views/Register.vue'
import Dashboard from './views/Dashboard.vue'

import store from './store'
import { from } from "zen-observable";

Vue.use(Router)

export const  ABOUT_ROUTE = '/about'
export const  HOME_ROUTE = '/'
export const  LOGIN_ROUTE = '/accounts/login'
export const  REGISTER_ROUTE = '/accounts/register'
export const  PROFILE_ROUTE  = '/accounts/profile'

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: HOME_ROUTE,
      name: "home",
      component: Home
    },

    {
      path: LOGIN_ROUTE,
      name: "login",
      component: Login,
      meta: {
        authBanned: true
      }
    },

    {
      path: REGISTER_ROUTE,
      name: "register",
      component: Register,
      meta: {
        authBanned: true
      }
    },
    {
      path: PROFILE_ROUTE,
      name: "profile",
      component: Dashboard,
      meta: {
        authRequired: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {

  const user = store.getters.user

  if (user.token) {
      if(to.meta.authBanned) {
        next({path: from.path})
      }else {
        next()
      }
  } else {

    if(to.meta.authRequired){
      next({path: LOGIN_ROUTE, query: { redirect: to.fullPath}})
    } else {
      next()
    }
  }
})

export default router