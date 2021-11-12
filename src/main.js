import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
