<template>
  <div class="container jumbotron">
    <page-title msg="Login with" />

    <div class="col-lg-5 col-md-5 col-xs-10 col-sm-9" style="margin:auto">
      <div>
        <div class="social-login-btns">
          <button
            type="button"
            class="btn btn-block btn-social btn-google"
            v-on:click="loginGoogle"
          >
            <span class="fa fa-google"></span> Login with google
          </button>

          <button
            type="button"
            class="btn btn-block btn-social btn-github"
            v-on:click="loginGithub"
          >
            <span class="fa fa-github"></span> Login with github
          </button>
        </div>
      </div>

      <div class="or-seperator"><b>or</b></div>

      <form @submit="login" method="post">
        <p v-for="error in serverErrors" class="validation-line">{{error}}</p>

        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            aria-describedby="emailHelp"
            placeholder="Email address"
          />

          <p v-for="error in emailErrors" class="validation-line">{{error}}</p>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="password"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            placeholder="Password"
          />
          <p v-for="error in passwordErrors" class="validation-line">{{error}}</p>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" style="width: 100%">Login</button>
        </div>
      </form>
      <div class="pull-left">
        <p>
          Do not have an account
          <router-link :to="registerRoute">Register here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>



<script>
import { REGISTER_ROUTE, PROFILE_ROUTE } from "../router";
import { mapActions, mapGetters } from "vuex";
import api, { LOGIN_USER_URL, USERNAME_UNIQUE_URL } from "../api";
import { required, minLength, email } from "vuelidate/lib/validators";
import queryString from "query-string";
import pageTitle from "../components/PageTitle";
import { constants } from "crypto";
import { UPDATE_USER } from "../mutation-types";

export default {
  components: {
    "page-title": pageTitle
  },

  validations: {
    email: {
      required,
      email
    },
    password: { required, minLength: minLength(8) }
  },

  computed: {
    ...mapGetters(["isUserGuest"]),

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be atleast 8 charcters");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },

    getServerErrors() {
      return this.serverErrors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },

  data() {
    return {
      email: "",
      password: "",
      registerRoute: REGISTER_ROUTE,
      serverErrors: []
    };
  },

  mounted() {
    const parsedQueryString = queryString.parse(window.location.search);

    if (parsedQueryString) {
      if (
        parsedQueryString.login_status !== "undefined" &&
        parsedQueryString.login_status === "SUCCEEDED" &&
        parsedQueryString.token !== "undefined"
      ) {
        this.$store.commit(UPDATE_USER, {
          isGuest: false,
          token: parsedQueryString.token
        });

        if (!this.isUserGuest) {
          this.$router.push(PROFILE_ROUTE);
        }
      }
    }
  },

  methods: {
    ...mapActions(["loginUser"]),

    loginGoogle(event) {
      window.location = "http://127.0.0.1:8080/auth/google";
    },

    loginGithub(event) {
      window.location = "http://127.0.0.1:8080/auth/github";
    },

    login(event) {
      event.preventDefault();

      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      }

      this.loginUser({
        url: LOGIN_USER_URL,
        user: { email: this.email, password: this.password }
      })
        .then(() => {
          this.clear();
          const redirect = this.$route.query.redirect
            ? this.$route.query.redirect
            : PROFILE_ROUTE;
          this.$router.push(redirect);
        })
        .catch(error => {
          this.serverErrors = error;
        });
    },

    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style>
.validation-line {
  color: red;
}

.or-seperator {
    margin: 50px 0 15px;
    text-align: center;
    border-top: 1px solid #e0e0e0;
}

</style>