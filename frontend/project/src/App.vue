<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link v-if="!$store.state.token" to="/login">Login</router-link>
    <a v-if="$store.state.token" @click="logout" class="link-pointer">Logout</a> |
    <router-link to="/overview">Overview</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.link-pointer {
  cursor: pointer;
}
</style>

<script>
export default {
  mounted() {
    this.$store.commit('initialiseStoreToken');
    this.$store.commit('initialiseStoreUsername')
  },
  methods: {
    logout() {
      this.$store.commit('clearToken')
      this.$store.commit('clearUsername')
      this.$router.push('/login');
    }

  },
}
</script>
