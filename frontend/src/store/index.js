import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { EncryptStorage } from 'encrypt-storage';
export const encryptStorage = new EncryptStorage(process.env.VUE_APP_LOCAL_STORAGE_ENCRYPT, {
  storageType: 'localStorage',

});

export default createStore({
  state: {
    user: {
      user_username: null,
      user_password: null,
      user_fname: null,
      user_lname: null,
      user_id: null,
      user_isValidated: 0,
      expiryDate: new Date()
    },
    countdown: 120,
  },
  getters: {
    isExpired(state) {
      return new Date(state.expiryDate) < new Date();
    },
    getIsValidated(state) {
      return state.user.user_isValidated;
    },
    getUserId(state) {
      return state.user.user_id
    },
    getUsername(state) {
      return state.user.user_username
    },
    getUserFirstName(state) {
      return state.user.user_fname
    },
    getUserMidName(state) {
      return state.user.user_mname
    },
    getUserLastName(state) {
      return state.user.user_lname
    },
    getCountDown(state) {
      return state.countdown
    },
  },
  mutations: {
    setExpiryDate(state) {
      // expiry time set to 1day
      const date = new Date();
      date.setDate(date.getDate() + 1);
      state.expiryDate = date;
    },
    setIsValidated(state, value) {
      state.user.user_isValidated = value;
    },
    setUserID(state, value) {
      state.user.user_id = value;
    },
    setUsername(state, value) {
      state.user.user_username = value;
    },
    setUserFirstName(state, value) {
      state.user.user_fname = value;
    },
    setUserMidName(state, value) {
      state.user.user_mname = value;
    },
    setUserLastName(state, value) {
      state.user.user_lname = value;
    },
    setCountDown(state) {
      state.countdown = 120
    },
    decrement(state) {
      state.countdown--
    }
  },
  actions: {
    setFirstNameAction(context, payload) {

      context.commit('setUserFirstName', payload)
    },
    setMidNameAction(context, payload) {

      context.commit('setUserMidName', payload)
    },
    setLastNameAction(context, payload) {

      context.commit('setUserLastName', payload)
    },
    decrement(context) {

      context.commit('decrement')
    }
  },
  modules: {
  },
  plugins: [createPersistedState({

    storage: {
      getItem: (key) => encryptStorage.getItem(key),
      setItem: (key, state) => encryptStorage.setItem(key, state),
      removeItem: (key) => encryptStorage.removeItem(key)
    },
  }

  )],
})
