import { getData, postData } from "../services/rest.service";

const sitesStore = {
  state: {
    sites: [],
    isLoading: false,
    isLoaded: false,
    selectedSite: false,
    isEditable: false,
    displaySiteEdit: false,
  },
  mutations: {
    setSites(state, payload) {
      state.sites = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setIsLoaded(state, payload) {
      state.isLoaded = payload;
    },
    setSelectedSite(state, payload) {
      state.selectedSite = state.sites[payload];
    },
    setSelectedSiteFromId(state, siteId) {
      state.selectedSite = state.sites.find(site => site.id === siteId);
    },
    setIsEditable(state, payload) {
      state.isEditable = payload;
    },
    setDisplaySiteEdit(state, payload) {
      state.displaySiteEdit = payload;
    },
    setHasChanged(state, payload) {
      state.sites.find(item => item === payload).hasChanged = true;
    },
    addSite(state, payload) {
      state.sites.push({
        firstName: payload,
        lastName: payload,
        email: payload,
        hasChanged: true,
      });
    },
  },
  actions: {
    async loadSites({ commit }) {
      const response = await getData("sites/list");
      if (response instanceof Error) {
        return;
      } else if (response.statusCode && response.statusCode === 404) {
        return;
      } else if (response.statusCode && response.statusCode === 406) {
        return;
      } else {
        commit("setSites", response);
        commit("setSelectedSite", 0);
        commit("setIsLoaded", true);
      }
    },
    async updateSite({ dispatch }, { callback, site }) {
      const response = await postData("sites/update", site);
      if (response && response.status === 200) {
        callback({
          message: response.message,
          type: "success",
        });
      }
      dispatch("loadSites");
    },
    async addSite({ dispatch }, { value, callback }) {
      const site = {
        name: value,
      };
      const response = await postData("sites/create", site);
      if (response && response.status === 200) {
        callback({
          type: "success",
          message: response.message,
        });
      } else if (
        (response && response.status === 400) ||
        response.status === 500
      ) {
        callback({ type: "error", message: response.message });
      } else {
        callback({ type: "error", message: "Erreur" });
      }
      dispatch("loadSites");
    },
    async deleteSite({ dispatch }, { callback, siteId }) {
      const response = await postData("sites/delete", { id: siteId });
      if (response && response.status === 200) {
        callback({
          type: "success",
          message: "Site supprimé",
        });
      } else if (response && response.status === 500) {
        callback({ type: "error", message: response.message });
      } else {
        callback({ type: "error", message: "Erreur" });
      }
      dispatch("loadSites");
    },
  },
};
export default sitesStore;
