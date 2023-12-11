<template>
  <div class="container flex justify-center">
    <form class="innerContainer" method="POST" @submit.prevent>
      <div>
        <h1 class="text-2xl font-bold mt-5">EBooks | Login</h1>
        <div class="form">
          <div class="formGroup">
            <label for="username" class="inputLabel font-semibold"
              >Username
              <span v-if="isUsernameErr" class="err">{{
                usernameErrText
              }}</span></label
            >
            <input
              type="text"
              class="py-2.5 px-6 rounded-full"
              v-model="username"
              name="username"
              autocomplete="off"
              placeholder="Enter username"
            />
          </div>
          <div class="formGroup">
            <label for="psword" class="inputLabel font-semibold"
              >Password
              <span v-if="isPasswordErr" class="err">{{
                passwordErrText
              }}</span></label
            >
            <input
              v-model="password"
              type="password"
              class="py-2.5 px-6 rounded-full"
              name="psword"
              autocomplete="off"
              placeholder="Enter password"
            />
          </div>
          <div class="formGroup">
            <button class="submitBtn" @click="signIn">Login</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";
export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      isLoading: false,
      isUsernameErr: false,
      isPasswordErr: false,
      usernameErrText: null,
      passwordErrText: null,
    };
  },
  methods: {
    signIn() {
      const toast = useToast();
      if (
        (this.password == null || this.password == "") &&
        (this.username == null || this.username == "")
      ) {
        this.isUsernameErr = true;
        this.isPasswordErr = true;
        this.usernameErrText = "Please put your username";
        this.passwordErrText = "Please put your password";
      } else {
        this.isPasswordErr = false;
        this.isUsernameErr = false;
      }

      if (!this.isUsernameErr && !this.isPasswordErr) {
        this.isLoading = true;
        const fd = {
          username: this.username,
          password: this.password,
        };

        axios.post(process.env.VUE_APP_API_SERVER + "/auth/login", fd).then(
          (response) => {
            if (response.data.status == 202) {
              if (response.data.user.isValidated == 0) {
                this.$store.commit("setExpiryDate");
                this.$store.commit("setUsername", response.data.user.username);
                this.$store.commit("setUserID", response.data.user.id);
                this.$store.commit(
                  "setUserFirstName",
                  response.data.user.firstname
                );
                this.$store.commit(
                  "setUserMidName",
                  response.data.user.middlename
                );
                this.$store.commit(
                  "setUserLastName",
                  response.data.user.lastname
                );
                this.$router.push("/");
              } else {
                this.$store.commit("setIsValidated", true);
                this.$store.commit("setExpiryDate");
                this.$store.commit("setUsername", response.data.user.username);
                this.$store.commit("setUserID", response.data.user.id);
                this.$store.commit(
                  "setUserFirstName",
                  response.data.user.firstname
                );
                this.$store.commit(
                  "setUserMidName",
                  response.data.user.middlename
                );
                this.$store.commit(
                  "setUserLastName",
                  response.data.user.lastname
                );
                this.$router.push("/user/dashboard");
              }
            } else if (response.data.status == 400) {
              toast.error("Invalid username/password.", {
                position: "top-right",
                timeout: 3000,
                closeOnClick: true,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: false,
                closeButton: "button",
                icon: true,
                rtl: false,
              });
            } else if (response.data.status == 500) {
              toast.error("Invalid username/password.", {
                position: "top-right",
                timeout: 3000,
                closeOnClick: true,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: false,
                closeButton: "button",
                icon: true,
                rtl: false,
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
};
</script>
<style scoped>
.border-red {
  border: 1px solid red;
}
.err {
  color: red;
  font-size: 12px;
  padding-left: 10px;
}
.innerContainer {
  width: 35%;
  margin: 50px 0 0 0;
  padding: 20px 10px 20px 10px;
  border-radius: 25px;
  box-shadow: #5ffbf1;
  height: 25em;
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
}

.submitBtn {
  margin-top: 10px;
  background-color: green;
  padding: 10px;
  color: white;
  border-radius: 5px;
  border: none;
}
.form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.formGroup {
  gap: 5px;
  margin: 10px 0 10px 0;
  padding: 0 5% 0 5%;
  display: grid;
}

hr {
  margin-top: 30px;
  width: 88%;
}

.inputField {
  padding: 12px;
  border-radius: 25px;
  border: none;
  padding-left: 10px;
}

.inputLabel {
  padding-left: 15px;
}
</style>