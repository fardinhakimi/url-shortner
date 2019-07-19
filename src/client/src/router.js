import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue"
import Register from './views/Register.vue'

Vue.use(Router)

export const  ABOUT_ROUTE = '/about'
export const  HOME_ROUTE = '/'
export const  LOGIN_ROUTE = '/accounts/login'
export const  REGISTER_ROUTE = '/accounts/register'
export const  PROFILE_ROUTE  = '/accounts/profile'

export default new Router({
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
      component: Login
    },

    {
      path: REGISTER_ROUTE,
      name: "register",
      component: Register
    },
    {
      path: PROFILE_ROUTE,
      name: "profile",
      component: Register
    }
  ]
})