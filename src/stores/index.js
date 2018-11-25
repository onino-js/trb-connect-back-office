import Vuex from "vuex";
import Vue from "vue";
import loginStore from "./login-store";
import homeStore from "./home-store";
import usersStore from "./users-store";
import sitesStore from "./sites-store";
import uiStore from "./ui-store";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    login: loginStore,
    home: homeStore,
    users: usersStore,
    sites: sitesStore,
    ui: uiStore,
  },
});

export default store;
