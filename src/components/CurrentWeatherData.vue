<template>
  <div class="current-weather">
    <div class="">
      <h2>{{ currentWeatherData.name }}</h2>
      <!-- v-text : inject the value via innerText -->
      <p v-text="date"></p>
      <p v-text="weatherDescription"></p>
    </div>
    <div>
      <div>
        <BaseWeatherIcon
          :icon="currentWeatherData.weather[0].icon"
          :width="65"
          :height="65"
        />
        <p>{{ Math.ceil(currentWeatherData.main.temp) }} °C</p>
      </div>

      <div class="">
        <p>Humidité : {{ currentWeatherData.main.humidity }}%</p>
        <p>Vent : {{ currentWeatherData.wind.speed }} m/s</p>
      </div>
    </div>
  </div>
</template>

<script>
import mixinFunctions from "../utils/functions";

export default {
  props: {
    currentWeatherData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    date() {
      return (
        this.getDayString(this.currentWeatherData.dt, "long") +
        " " +
        this.getHour(this.currentWeatherData.dt)
      );
    },
    weatherDescription() {
      return this.currentWeatherData.weather[0].description;
    },
  },
  methods: {},
  mixins: [mixinFunctions],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.current-weather {
  background-color: #e69f2f;
  width: 70%;
  margin: auto;
}
</style>
