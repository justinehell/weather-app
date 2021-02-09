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
      <button @click="toggleFavorite" aria-label="favoris">
        <i
          :class="[
            $store.getters.isFavorite ? 'bi bi-star-fill' : 'bi bi-star',
          ]"
          style="color: gold; font-size: 1.5rem"
          width="24px"
          height="24px"
          alt="ajouter aux favoris"
          name="favoris"
        >
          <span class="info">{{
            $store.getters.isFavorite
              ? "Supprimer des favoris"
              : "Ajouter aux favoris"
          }}</span>
        </i>
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
        this.$store.dispatch("deleteFavorite", {
          id: this.currentWeatherData.id,
          name: this.currentWeatherData.name,
        });
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
button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
i span {
  position: absolute;
  margin-left: -50px;
  color: white;
  background: #09c;
  padding: 4px 5px;
  font-size: 1rem;
  border-radius: 3px;
  opacity: 0;
  transform: translate3d(-90%, 5px, 0px);
}
i:hover span.info {
  opacity: 1;
  visibility: visible;
}
span.info::before {
  position: absolute;
  width: 6px;
  height: 6px;
  transform: rotate(45deg);
  background-color: #09c;
  content: " ";
  right: 0px;
  top: 45%;
  margin-right: -2px;
  margin-top: -2px;
  z-index: -2;
}
</style>
