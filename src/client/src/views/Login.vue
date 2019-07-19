<template>
  <div class="container jumbotron">

    <page-title msg= "Login to continue" />

    <div class="col-lg-5 col-md-5 col-xs-10 col-sm-9" style="margin:auto">

      <div>

      </div>
      <form @submit="login" method="post">
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
        <div class="form-group pull-left">
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
import { REGISTER_ROUTE } from "../router"
import {mapActions} from 'vuex';
import api, { LOGIN_USER_URL, USERNAME_UNIQUE_URL } from '../api'
import { required, minLength, email} from "vuelidate/lib/validators";

import pageTitle from '../components/PageTitle'

export default {

  components: {
    'page-title': pageTitle
  },

  validations: {
    email: {
      required,
      email
    },
    password: { required, minLength: minLength(8) }
  },

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be atleast 8 charcters");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");

     this.isUsernameUnique(this.email).then((data) => {
     }).catch((err) => {
       errors.push(err)
     })

      return errors;
    }
  },

  data() {
    return {
      email: "",
      password: "",
      registerRoute: REGISTER_ROUTE
    };
  },
  methods: {

    ...mapActions(['updateUser']),

    isUsernameUnique(username){

      return new Promise((resolve, reject) => {
        api.postResource(USERNAME_UNIQUE_URL, {username}).then((data) => {
          if(!data.is_unique){
            reject('Username is already taken')
          }
            resolve(true)
        }).catch((err) => {
          reject('Something went wrong. Please try again')
        })
      })
    },

    login(event) {

      event.preventDefault();

      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      }

      this.updateUser(LOGIN_USER_URL, { email: this.email, password: this.password })
          .then(()     => this.$router.push("/accounts/profile"))
          .catch((err) => console.log(err))
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

.validation-line{
  color:red;
}

</style>