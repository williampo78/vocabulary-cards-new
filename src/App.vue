<template>
  <div id="app">
    <Header />
    <div id="nav">
      <router-link to="/">單字添加</router-link> |
      <router-link to="/learn">單字學習</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
}
#app {
  width: 100%;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  background: #f7f5f5;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #79a3ca;
    text-decoration: none;

    &.router-link-exact-active {
      color: #2e5386;
    }
  }
}
</style>
