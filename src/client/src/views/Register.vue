<template>
  <div class="container jumbotron">
    <page-title msg="Register to start shortening those urls!" />

    <div v-if="confirmationMessage !== '' " class="alert alert-success" role="alert">
      <p>{{confirmationMessage}}</p>
    </div>

    <div class="col-lg-5 col-md-5 col-xs-10 col-sm-8" style="margin:auto">
      <form @submit="register" method="post">
        <div class="form-group">
          <input
            placeholder="Name"
            type="text"
            v-model="name"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            class="form-control"
          />
        </div>
        <p v-for="error in nameErrors" class="validation-line">{{error}}</p>

        <div class="form-group">
          <input
            placeholder="Email address"
            type="email"
            v-model="email"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            class="form-control"
          />
        </div>
        <p v-for="error in emailErrors" class="validation-line">{{error}}</p>

        <div class="form-group">
          <input
            placeholder="Password"
            type="password"
            v-model="password"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            class="form-control"
          />
        </div>
        <p v-for="error in passwordErrors" class="validation-line">{{error}}</p>

        <div class="form-group">
          <input
            placeholder="Confirm password"
            type="password"
            v-model="confirmPassword"
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
            class="form-control"
          />
        </div>
        <p v-for="error in confirmPasswordErrors" class="validation-line">{{error}}</p>

        <div class="form-group">
          <button type="submit" class="btn btn-primary" style="width: 100%">Register</button>
        </div>
      </form>
      <div>
        <p>
          Already have an account
          <router-link :to="loginRoute">Login here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN_ROUTE } from "../router";
import { mapActions } from "vuex";
import api, {
  LOGIN_USER_URL,
  USERNAME_UNIQUE_URL,
  REGISTER_USER_URL
} from "../api";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import httpStatus from "http-status-codes";
import pageTitle from "../components/PageTitle";

export default {
  components: {
    "page-title": pageTitle
  },

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
    confirmPassword: {
      sameAsPassword: sameAs("password")
    },
    name: {
      required,
      minLength: minLength(3)
    }
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationMessage: "",
      serverErrors: [],
      loginRoute: LOGIN_ROUTE
    };
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

    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) {
        return errors;
      }
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Passwords must match");

      return errors;
    },
    nameErrors() {
      const errors = [];

      if (!this.$v.name.$dirty) {
        return errors;
      }

      !this.$v.name.minLength &&
        errors.push("Name must be minimum 3 chars in length");
      !this.$v.name.required && errors.push("Name is required");

      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      this.$v.email.required && this.$v.email.email && this.isUsernameUnique(this.email)
        .then(data => {

        })
        .catch(err => {
          errors.push(err)
        })

      return errors;
    }
  },
  methods: {
    ...mapActions(["registerUser"]),

    isUsernameUnique(email) {
      return new Promise((resolve, reject) => {
        api
          .postResource(USERNAME_UNIQUE_URL, { email })
          .then(response => {
            if (response.data.is_username_unique) {
              resolve(true)
            }
              reject("This username is already taken")
          })
          .catch(err => {
            reject("Something went wrong. Please try again");
          });
      });
    },

    async register(event) {
      event.preventDefault();

      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      }

      try {
        const response = await api.postResource(REGISTER_USER_URL, {
          name: this.name,
          email: this.email,
          password: this.password
        });

        if (parseInt(response.status) === httpStatus.CREATED) {
          this.confirmationMessage =
            "Your account is sucessfully created. you will be redirected to the login page shortly.";

          setTimeout(() => {
            this.$router.push(LOGIN_ROUTE);
          }, 4000);
        }
      } catch (error) {
        this.serverErrors = error;
      }
    }
  }
};
</script>
