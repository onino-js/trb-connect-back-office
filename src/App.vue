<template>
  <div id="app">
    <Login v-if="!token"/>
    <Home v-if="token"/>
  </div>
</template>

<script>
import Login from "./components/login.vue";
import store from "./stores";
import Home from "./components/home.vue";

export default {
  name: "app",
  store,
  components: {
    Login,
    Home,
  },
  computed: {
    token: {
      get() {
        return store.state.login.token;
      },
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
