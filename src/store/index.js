import Vue from "vue";
import Vuex from "vuex";

import WeatherService from "../services/WeatherService";

Vue.use(Vuex);

// root state object.
const state = {
  search: null,
  favorites: JSON.parse(localStorage.getItem("favorite")) || {},
  searchLoading: false,
  notification: null,
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
  SET_NOTIFICATION(state, notification) {
    state.notification = notification;
  },
  REMOVE_NOTIFICATION(state, notification) {
    state.notification = notification;
  },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  searchWeather({ commit }, city) {
    commit("SET_SEARCH", null);
    commit("SET_LOADING", true);
    commit("SET_NOTIFICATION", null);
    Promise.all([
      WeatherService.getWeather(city),
      WeatherService.getNextFiveDaysWeather(city),
    ])
      .then((responses) => {
        commit("SET_SEARCH", {
          current: responses[0],
          forecast: responses[1],
        });
      })
      .catch((err) => {
        console.log(err);
        commit("SET_NOTIFICATION", {
          type: "danger",
          message: `La ville "${city}" n'existe pas ! (Attention aux fautes de frappes)`,
        });
      })
      .finally(() => commit("SET_LOADING", false));
  },
  addFavorite({ commit }, favorite) {
    commit("ADD_FAVORITE", favorite);
    commit("SET_NOTIFICATION", {
      type: "success",
      message: `La ville "${favorite.name}" a bien été enregistrée dans vos favoris`,
    });
    localStorage.setItem("favorite", JSON.stringify(state.favorites));
  },
  deleteFavorite({ commit }, favorite) {
    commit("DELETE_FAVORITE", favorite.id);
    commit("SET_NOTIFICATION", {
      type: "warning",
      message: `La ville "${favorite.name}" a bien été supprimée de vos favoris`,
    });
    localStorage.setItem("favorite", JSON.stringify(state.favorites));
  },
  removeNotification({ commit }) {
    commit("REMOVE_NOTIFICATION");
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
