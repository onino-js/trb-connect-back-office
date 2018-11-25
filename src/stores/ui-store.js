const uiStore = {
  state: {
    displayCreateUser: false,
    displayUserSitesEdit: false,
    displayProbeList: false,
  },
  mutations: {
    setDisplayCreateUser(state, payload) {
      state.displayCreateUser = payload;
    },
    setDisplayUserSitesEdit(state, payload) {
      state.displayUserSitesEdit = payload;
    },
    setDisplayProbeList(state, payload) {
      state.displayProbeList = payload;
    },
  },
};
export default uiStore;
