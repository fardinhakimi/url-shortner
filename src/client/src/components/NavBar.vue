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
            <router-link :to="item.link" class="nav-link" :class="item.class">{{ item.name }}</router-link>
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

import { LOGOUT_USER_URL, LOGIN_USER_URL } from "../api";

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      brandName: 'Funrang url-shortning',
      navBarItem: [
        {
          /*
          isGuest: this.isUserLoggedIn,
          name: "Login",
          link: LOGIN_ROUTE,
          class: "pull-right" */
        }
      ]
    };
  },

  methods: {
    ...mapGetters["isUserLoggedIn"],
    ...mapActions["updateUser"],

    logOut() {
      this.updateUser(LOGOUT_USER_URL, { isGuest: true })
        .then(data => {
          this.$router.push(LOGIN_USER_URL);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  name: "NavBar"
};
</script>
