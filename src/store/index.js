import Vue from "vue";
import Vuex from "vuex";

import WeatherService from "../services/WeatherService";

Vue.use(Vuex);

// root state object.
const state = {
  search: null,
  favorites: JSON.parse(localStorage.getItem("favorite")) || {},
  searchLoading: false,
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
  ADD_FAVORITE(state, favorite) {
    // make a copy of the state and add the new favorite item
    // see https://vuejs.org/v2/guide/reactivity.html#For-Objects
    state.favorites = { ...state.favorites, [favorite.id]: favorite.name };
  },
  DELETE_FAVORITE(state, id) {
    const newFavorites = { ...state.favorites };
    delete newFavorites[id];
    state.favorites = newFavorites;
  },
  SET_LOADING(state, bool) {
    state.searchLoading = bool;
  },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  searchWeather({ commit }, city) {
    commit("SET_SEARCH", null);
    commit("SET_LOADING", true);
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
          "There was an error while fetching weather data : " + error
        );
      })
      .finally(() => commit("SET_LOADING", false));
  },
  addFavorite({ commit }, favorite) {
    commit("ADD_FAVORITE", favorite);
    localStorage.setItem("favorite", JSON.stringify(state.favorites));
  },
  deleteFavorite({ commit }, id) {
    commit("DELETE_FAVORITE", id);
    localStorage.setItem("favorite", JSON.stringify(state.favorites));
  },
};

const getters = {
  isFavorite: (state) => {
    if (!state.search) return false;
    const id = state.search.current.id;
    return !!state.favorites[id];
  },
};

// A Vuex instance is created by combining the state, mutations, actions, and getters.
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
