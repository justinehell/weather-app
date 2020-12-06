import Vue from "vue";
import App from "./App.vue";
import BaseWeatherIcon from "./components/Base/BaseWeatherIcon.vue";

// globally register the BaseIcon Component
Vue.component("BaseWeatherIcon", BaseWeatherIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
