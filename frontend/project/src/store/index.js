import { createStore } from 'vuex'

export default createStore({
  state: {
    token: "",
    username: "",
  },
  getters: {
    getToken() {
      return this.token;
    },
    getUsername() {
      return this.username;
    }
  },
  mutations: {
    saveToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      alert('Logged in');
    },
    saveUsername(state, username) {
      state.username = username;
      localStorage.setItem('username', username);
    },
    clearToken(state) {
      state.token = "";
      localStorage.removeItem('token');

      alert('Logged out');
    },
    clearUsername(state) {
      state.username = "";
      localStorage.removeItem('username');
    },
    initialiseStoreToken(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token');
      }
    },
    initialiseStoreUsername(state) {
      if (localStorage.getItem('username')) {
        state.username = localStorage.getItem('username');
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
