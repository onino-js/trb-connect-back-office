<template>
  <el-container class="container">
    <el-header>
      <el-button class="login-button" v-on:click="logout()">Se deconnecter</el-button>
    </el-header>
    <el-container>
      <el-aside width="300px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo">
          <el-menu-item index="2" v-on:click="goToPage('/users')">
            <i class="el-icon-setting"></i>
            <span>Utilisateurs</span>
          </el-menu-item>
          <el-menu-item index="3"  v-on:click="goToPage('/sites')">
            <i class="el-icon-setting"></i>
            <span>Sites</span>
          </el-menu-item>
          <el-menu-item index="4"  v-on:click="goToPage('/probes')">
            <i class="el-icon-setting"></i>
            <span>Sondes</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view></router-view>
        <el-footer>TRB-connect @0.0.1</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import VueRouter from "vue-router";
import UsersSettings from "./users-settings.vue";
import Vue from "vue";
import SitesSettings from "./sites-settings.vue";
import ProbesSettings from "./probes-settings.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/users",
    component: UsersSettings,
  },
  {
    path: "/sites",
    component: SitesSettings,
  },
  {
    path: "/probes",
    component: ProbesSettings,
  },
  {
    path: "/",
    component: UsersSettings,
  },
];

const router = new VueRouter({
  routes: routes, // short for `routes: routes`
  mode: "history",
});

export default {
  router: router,
  name: "Home",
  methods: {
    goToPage(page) {
      this.$router.push(page);
    },
    logout() {
      this.$store.commit("setToken", false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background-color: #cccccc;
  color: #333;
  line-height: 60px;
  text-align: right;
  font-size: 12px;
}
.el-footer {
  background-color: #cccccc;
  color: #333;
  line-height: 60px;
  text-align: right;
  font-size: 12px;
}

.el-aside {
  background-color: #cccccc;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.el-menu-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
