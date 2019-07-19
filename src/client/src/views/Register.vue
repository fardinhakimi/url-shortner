<template>
  <div class="container jumbotron">
    <page-title msg="Register and start shortening those urls!" />

    <div class="col-lg-5 col-md-5 col-xs-10 col-sm-8" style="margin:auto">
      <form @submit="register" method="post">
        <div class="form-group">
          <input placeholder="Email address" type="email" v-model="email" class="form-control" />
        </div>
        <div class="form-group">
          <input placeholder="Password" type="password" v-model="password" class="form-control" />
        </div>
        <div class="form-group">
          <input placeholder="Confirm password" type="password" v-model="password2" class="form-control" />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" style="width: 100%">Register</button>
        </div>
      </form>
      <div>
        <p>
          Already have an account <router-link :to="loginRoute">Login here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN_ROUTE } from "../router";

import pageTitle from "../components/PageTitle";

export default {
  components: {
    "page-title": pageTitle
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
      loginRoute: LOGIN_ROUTE
    };
  },
  methods: {
    register(event) {

      event.preventDefault();

      const user = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.$store
        .dispatch("signup", user)
        .then(() => this.$router.push("/login"));
    }
  }
};
</script>
