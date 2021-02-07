<template>
  <div>
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <h2 class="font-weight-bold primary--text">
          {{ currentWeatherData.name }}
        </h2>
        <!-- v-text : inject the value via innerText -->
        <div v-text="date" class="secondary--text"></div>
        <div v-text="weatherDescription" class="secondary--text"></div>
      </div>

      <button @click="toggleFavorite">
        {{
          $store.getters.isFavorite
            ? "Supprimer des favoris"
            : "Ajouter aux favoris"
        }}
      </button>
    </div>

    <hr />
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <BaseWeatherIcon
          :icon="currentWeatherData.weather[0].icon"
          :width="96"
          :height="96"
        />
        <span class="primary--text" style="font-size:72px">{{
          Math.ceil(currentWeatherData.main.temp)
        }}</span>
        <span class="align-self-start mt-3">°C</span>
      </div>

      <div class="d-flex flex-column align-items-center justify-content-center">
        <p class="mb-4">Humidité : {{ currentWeatherData.main.humidity }}%</p>
        <p class="mb-0">Vent : {{ currentWeatherData.wind.speed }} m/s</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getDayString, getHour } from "../utils";

export default {
  props: {
    currentWeatherData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleFavorite() {
      if (this.$store.getters.isFavorite) {
        this.$store.dispatch("deleteFavorite", this.currentWeatherData.id);
      } else {
        this.$store.dispatch("addFavorite", {
          id: this.currentWeatherData.id,
          name: this.currentWeatherData.name,
        });
      }
    },
  },
  computed: {
    date() {
      return (
        getDayString(this.currentWeatherData.dt, "long") +
        " " +
        getHour(this.currentWeatherData.dt)
      );
    },
    weatherDescription() {
      return this.currentWeatherData.weather[0].description;
    },
  },
};
</script>
<style scoped>
.data-wrapper {
  display: flex;
}
</style>
