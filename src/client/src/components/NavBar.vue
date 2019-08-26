<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
      <a class="navbar-brand" href="/">{{brandName}}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li v-for="item in navBarItem" class="nav-item">
            <router-link v-if="item.type === 'href' && isUserGuest" :to="item.link" :class="item.class">{{ item.name }}</router-link>
            <button v-else-if="item.type === 'button' && !isUserGuest" 
                    type="button" 
                    class="btn btn-primary" 
                    v-on:click="logOut">{{item.name}}</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style>

#nav {
  margin-bottom: 30px;
}

#nav .navbar{
  width: inherit;
}

</style>

<script>
import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  PROFILE_ROUTE
} from "../router.js";

import { LOGOUT_USER_URL} from "../api"
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      brandName: 'Funrang url-shortning',
      navBarItem: [
        {
          name: "Login",
          link: LOGIN_ROUTE,
          type: 'href',
          class: "pull-right btn btn-primary"
        },

        {
          name: "Logout",
          type: 'button',
          class: "pull-right"
        },
      ]
    }
  },

  computed: {
    ...mapGetters(['user', 'isUserGuest'])
  },

  methods: {
    ...mapActions(['logOutUser']),
    async logOut(){
      try{

        await this.logOutUser()
        this.$router.push(LOGIN_ROUTE)

      }catch(error){
        console.log(error)
      }
    }
  },
  name: "NavBar"
}
</script>
