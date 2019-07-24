import Vue from "vue";
import Vuex from "vuex";
import api from './api'
import httpStatus from 'http-status-codes'

Vue.use(Vuex);


import { REGISTER_USER, LOGIN_USER, UPDATE_USER } from './mutation-types';
import createPersistedState from 'vuex-persistedstate'


const userInitialState = {
  email: '',
  isGuest: true,
  token: ''
}

export default new Vuex.Store({

  plugins: [createPersistedState()],
  state: {
    user: userInitialState
  },

  getters: {
    user(state) {
      return state.user
    },
    isUserGuest(state) {
      return state.user.isGuest
    }
  },

  mutations: {

    [UPDATE_USER](state, user) {
      state.user = { ...state.user, ...user }
    }
  },

  actions: {

    async updateUser({ commit }, { url, user }) {

      return new Promise(async (resolve, reject) => {

        try {

          const response = await api.postResource(url, user)
          if (parseInt(response.status) === httpStatus.OK) {
            commit(UPDATE_USER, response.data.user)
            resolve(response)
          } else {
            reject(response.data.errors)
          }

        } catch (error) {
          reject(error.response.data.errors)
        }
      })
    },

    async loginUser({ commit }, { url, user }) {

      return new Promise(async (resolve, reject) => {

        try {

          const response = await api.postResource(url, user)

          if (parseInt(response.status) === httpStatus.OK) {
            console.log(response.data.user)
            commit(UPDATE_USER, response.data.user)
            console.log('mutated state')
            resolve(response)
          } else {
            reject(response.data.errors)
          }

        } catch (error) {
          reject(error.response.data.errors)
        }
      })
    },
    logOutUser({ commit }) {

      return new Promise((resolve, reject) => {
        commit(UPDATE_USER, userInitialState)
        resolve(true)
      })
    }
  }
})