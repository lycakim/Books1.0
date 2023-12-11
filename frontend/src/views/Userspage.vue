<template>
  <div>
    <div class="sidebar">
      <div><h1 class="text-3xl py-10 font-semibold">EBooks</h1></div>
      <router-link to="/user/dashboard">Dashboard</router-link>
      <router-link to="/user/your-books">Books</router-link>
      <router-link to="/user/your-shared-books">Share your books</router-link>
      <a href="javascript:void(0)" @click="logout">Logout</a>
      <!-- <a
        class="active"
        href="javascript:void(0)"
        @click="redirect('user/dashboard')"
        >Home</a
      >
      <a href="javascript:void(0)" @click="redirect('user/dashboard')">News</a>
      <a href="javascript:void(0)" @click="redirect('user/dashboard')"
        >Contact</a
      >
      <a href="javascript:void(0)" @click="redirect('user/dashboard')">About</a> -->
    </div>
    <div class="content">
      <div class="content2">
        <router-view />
      </div>
    </div>
  </div>
</template>
                        
<script>
export default {
  name: "Userspage",
  components: {},
  data: () => ({
    //
  }),
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("vuex");
      localStorage.removeItem("_secure__ls__metadata");
      this.$store.dispatch("setEmail", null);
      this.$store.dispatch("setIsAuthenticated", 0);
      this.$router.replace("/");
      window.location.reload();
    },
  },
};
</script>
<style scoped>
div.content {
  margin-left: 240px;
  margin-right: 50%;
  padding: 1px 16px;
  position: fixed;
  height: 110%;
  margin-bottom: 10%;
  width: 100%;
  background-color: rgb(226, 226, 226);
}

.content2 {
  max-height: 100%;
  overflow-y: auto;
}

.sidebar a.router-link-exact-active {
  background-color: #04aa6d;
  color: white;
  margin-left: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.sidebar a:hover:not(.router-link-exact-active) {
  background-color: #555;
  color: white;
  margin-left: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.sidebar {
  margin: -10px 0 0 -10px;
  padding: 0;
  width: 250px;
  background-color: #f1f1f1;
  position: fixed;
  height: 110%;
  overflow: auto;
}
a {
  margin-top: 3px;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  padding-left: 18%;
  margin-left: 20px;
  text-decoration: none;
  text-align: left;
}

.sidebar a.active {
  background-color: #04aa6d;
  color: white;
}

/* .sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
} */

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>
                        