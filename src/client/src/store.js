import Vue from "vue";
import Vuex from "vuex";
import api from './api'

Vue.use(Vuex);


import { REGISTER_USER, LOGIN_USER, UPDATE_USER } from './mutation-types';
import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({

  plugins: [createPersistedState()],
  state: {
    user: {
      isGuest: true,
      token: '',
      profile: {
      }
    }
  },

  getters: {
    user(state) {
      return state.user
    },
    isUserLoggedIn(state){
      return state.user.isGuest
    }
  },

  mutations: {

    [UPDATE_USER](state, { user }) {
      state.user = {...user, user}
    },

  },
  actions: {

    async updateUser({ commit }, { url, user }) {

      return new Promise(async (resolve, reject) => {

        try{

          const response = await api.postResource(url, user)
          commit(UPDATE_USER, { user: response.data })
          resolve(true)
  
        }catch(err){
          reject(err)
        }
      })
    }
  }
})