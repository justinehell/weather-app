import Vue from "vue";
import Vuex from "vuex";

import WeatherService from "../services/WeatherService";

Vue.use(Vuex);

// root state object.
const state = {
  search: null,
};

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  SET_SEARCH(state, search) {
    state.search = search;
  },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  searchWeather({ commit }, city) {
    commit("SET_SEARCH", null);
    Promise.all([
      WeatherService.getWeather(city),
      WeatherService.getNextFiveDaysWeather(city),
    ])
      .then((responses) => {
        commit("SET_SEARCH", {
          current: responses[0].data,
          forecast: responses[1].data,
        });
      })
      .catch((error) => {
        console.log(
          "There was an error while fetching weather data:" + error.response
        );
      });
  },
};

// A Vuex instance is created by combining the state, mutations, actions, and getters.
export default new Vuex.Store({
  state,
  actions,
  mutations,
});
