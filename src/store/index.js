import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import JwtService from '@/service/jwt';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: null,
    user: {},
    isAuthenticated: !!JwtService.getToken()
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    }
  },
  mutations: {
    setUser(state, user) {
      state.isAuthenticated = true;
      state.user = user;
      state.errors = {};
      JwtService.saveToken(state.user.token);
    },
    setError(state, error) {
      state.errors = error;
    }
  },
  actions: {
    login(context, credentials) {
      return new Promise(resolve => {
        axios
          .post('https://conduit.productionready.io/api/users/login', {
            user: credentials
          })
          .then(({ data }) => {
            context.commit('setUser', data.user);
            resolve(data);
          })
          .catch(({ response }) => {
            context.commit('setError', response.data.errors);
          });
      });
    }
  },
  modules: {}
});
