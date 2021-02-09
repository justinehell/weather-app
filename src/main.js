import Vue from "vue";
import App from "./App.vue";
import BaseWeatherIcon from "./components/Base/BaseWeatherIcon.vue";
import store from "./store";

import "bootstrap-icons/font/bootstrap-icons.css";

// globally register the BaseIcon Component
Vue.component("BaseWeatherIcon", BaseWeatherIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
