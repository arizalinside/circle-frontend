<template>
  <div id="app">
    <div id="nav"></div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created() {
    // console.log('hello')
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
