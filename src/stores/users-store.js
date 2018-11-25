import { getData, postData } from "../services/rest.service";

const usersStore = {
  state: {
    users: [],
    isLoading: false,
    isLoaded: false,
    selectedUser: false,
    editedUser: false,
    isEditable: false,
    displayUserEdit: false,
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setIsLoaded(state, payload) {
      state.isLoaded = payload;
    },
    setSelectedUser(state, payload) {
      state.selectedUser = state.users[payload];
      state.editedUser = { ...state.users[payload] };
      state.editedUser.sites = state.selectedUser.sites.slice();
    },
    setEditedUser(state, payload) {
      state.editedUser = payload;
    },
    setIsEditable(state, payload) {
      state.isEditable = payload;
    },
    setDisplayUserEdit(state, payload) {
      state.displayUserEdit = payload;
    },
    setHasChanged(state, payload) {
      state.users.find(item => item === payload).hasChanged = true;
    },
    addUser(state, payload) {
      state.users.push({
        firstName: payload,
        lastName: payload,
        email: payload,
      });
    },
    sort(state, payload) {
      state.users.sort(function(a, b) {
        var nameA = a[payload].toUpperCase(); // ignore upper and lowercase
        var nameB = b[payload].toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
  },
  actions: {
    async loadUsers({ commit }) {
      const response = await getData("users/list");
      if (response instanceof Error) {
        return;
      } else if (response.statusCode && response.statusCode === 404) {
        return;
      } else if (response.statusCode && response.statusCode === 406) {
        return;
      } else {
        commit("setUsers", response);
        commit("setSelectedUser", 0);
        commit("setIsLoaded", true);
      }
    },
    async updateUser({ dispatch }, { callback, user }) {
      const response = await postData("users/update", user);
      if (response && response.status === 200) {
        callback({
          message: response.message,
          type: "success",
        });
      }
      dispatch("loadUsers");
    },
    async createUser({ dispatch }, { user, callback }) {
      const response = await postData("users/create", user);
      if (response && response.status === 200) {
        callback({ type: "success", message: response.message });
      } else if (
        (response && response.status === 400) ||
        response.status === 500
      ) {
        callback({ type: "error", message: response.message });
      } else {
        callback({ type: "error", message: "Erreur" });
      }
      dispatch("loadUsers");
    },
    async addUser({ dispatch }, { value, callback }) {
      const body = {
        firstName: value,
        lastName: value,
        email: value,
        password: value,
      };
      const response = await postData("users/create", body);
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
      dispatch("loadUsers");
    },
    async deleteUser({ dispatch }, { callback, userId }) {
      const response = await postData("users/delete", { id: userId });
      if (response && response.status === 200) {
        callback({
          type: "success",
          message: "Utiliisateur supprimé",
        });
      } else if (response && response.status === 500) {
        callback({ type: "error", message: response.message });
      } else {
        callback({ type: "error", message: "Erreur" });
      }
      dispatch("loadUsers");
    },
    // toggleAccess({ commit }, {userId, siteId}) {
    //   this.edit
    // },
  },
};
export default usersStore;
