import { postData, setToken } from "../services/rest.service";

const loginStore = {
  state: {
    count: 299,
    email: "",
    password: "",
    token: false,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async logout({ commit }) {
      commit("setToken", false);
    },
    async loginRequest({ commit }, { callback, cred }) {
      const response = await postData("auth/login", cred);
      if (response instanceof Error) {
        callback({
          showClose: true,
          message: "Impossible de se conncter au serveur",
          type: "error",
        });
      } else if (response.statusCode && response.statusCode === 404) {
        callback({
          showClose: true,
          message: "Utilisateur non trouvé",
          type: "error",
        });
      } else if (response.statusCode && response.statusCode === 406) {
        callback({
          showClose: true,
          message: "Mauvais mot de passe",
          type: "error",
        });
        return;
      } else {
        commit("setToken", response.accessToken);
        setToken(response.accessToken);
      }
    },
  },
};
export default loginStore;
