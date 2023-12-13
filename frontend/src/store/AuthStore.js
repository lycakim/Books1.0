import { defineStore } from 'pinia'
import { EncryptStorage } from 'encrypt-storage';
export const encryptStorage = new EncryptStorage(process.env.VUE_APP_LOCAL_STORAGE_ENCRYPT, {
              storageType: 'localStorage',

});

export const userAuthStore = defineStore('authStore', {
              state: () => ({
                            user: {
                                          username: null,
                                          password: null,
                                          fname: null,
                                          lname: null,
                                          id: null,
                                          isValidated: 0,
                                          expiryDate: new Date()
                            },
                            countdown: 120,

              }),
              persist: {
                            storage: sessionStorage,
                            key: process.env.VUE_APP_LOCAL_STORAGE_ENCRYPT,
                            paths: ['user', 'countdown'],
              },
              getters: {
                            isExpired: (state) => {
                                          return new Date(state.expiryDate) < new Date();
                            },
                            getIsValidated: (state) => {
                                          return state.user.isValidated;
                            },
                            getUserId: (state) => {
                                          return state.user.id;
                            },
                            getUsername: (state) => {
                                          return state.user.username;
                            },
                            getUserFirstName: (state) => {

                                          return state.user.fname;
                            },
                            getUserLastName: (state) => {
                                          return state.user.lname;
                            },
                            getCountDown: (state) => {
                                          return state.countdown;
                            }
                            // isExpired(state) {
                            //               return new Date(state.expiryDate) < new Date();
                            // },
                            // getIsValidated(state) {
                            //               return state.user.isValidated;
                            // },
                            // getUserId(state) {
                            //               return state.user.id
                            // },
                            // getUsername(state) {
                            //               return state.user.username
                            // },
                            // getUserFirstName(state) {
                            //               return state.user.fname
                            // },
                            // getUserLastName(state) {
                            //               return state.user.lname
                            // },
                            // getCountDown(state) {
                            //               return state.countdown
                            // },
              },
              actions: {
                            setUserDetails(data) {
                                          // alert(data.username)

                                          const date = new Date();
                                          date.setDate(date.getDate() + 1);
                                          this.user.expiryDate = date;
                                          this.user.fname = data.fname;
                                          this.user.lname = data.lname;
                                          this.user.isValidated = data.isValidated;
                                          this.user.username = data.username;
                                          this.user.id = data.id;
                                          this.user.countdown--;

                                          localStorage.setItem('piniaState', JSON.stringify(this.state))
                            },
                            $reset() {
                                          this.user.fname = null;
                                          this.user.lname = null;
                                          this.user.username = null;
                                          this.user.isValidated = 0;
                                          this.user.id = null;
                            },

              },


})