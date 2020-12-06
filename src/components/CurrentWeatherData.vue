<template>
  <div class="current-weather">
    <div class="first-block">
      <h2>{{ currentWeatherData.name }}</h2>
      <p>
        {{ getDayString(currentWeatherData.dt, "long") }}
        {{ getHour(currentWeatherData.dt) }}
      </p>
      <p>
        {{ currentWeatherData.weather[0].description }}
      </p>
    </div>
    <div>
      <BaseWeatherIcon
        :icon="currentWeatherData.weather[0].icon"
        :width="65"
        :height="65"
      />
      <p>{{ Math.ceil(currentWeatherData.main.temp) }} °C</p>
    </div>

    <div class="second-block">
      <p>Humidité : {{ currentWeatherData.main.humidity }}%</p>
      <p>Vent : {{ currentWeatherData.wind.speed }} m/s</p>
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

.first-block {
  background-color: lightgreen;
  width: 50%;
  margin: auto;
}
.second-block {
  background-color: white;
  width: 50%;
  margin: auto;
}
</style>
