<template>
  <div class="jumbotron">
    <h1 class="display-4">Hi!</h1>
    <p
      class="lead">{{leadMessage}}</p>
    <hr class="my-4" />
    <p>Click below to start the fun</p>
    <p class="lead">
      <a class="btn btn-primary btn-lg" :href="getUrl" role="button">Go</a>
    </p>
  </div>
</template>

<script>

import { REGISTER_ROUTE } from '../router'

export default {
  name: "home",
  data() {
    return {
      leadMessage: "This is your very own url shortner service",
      registerRoute: REGISTER_ROUTE
    };
  },

  computed: {
    getUrl(){
      return REGISTER_ROUTE;
    }
  },

  methods: {
  },
};
</script>

<style>

.jumbotron {

  background: transparent;
}
</style>

