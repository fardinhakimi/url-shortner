<template>
  <div class="jumbotron">
    <p> you are logged in {{user.email}}</p>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: "dashboard",
  data() {
    return {
    }
  },
  computed: {
      ...mapGetters(['user'])
  }
}
</script>

<style>
</style>

