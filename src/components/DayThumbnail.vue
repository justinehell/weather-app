<template>
  <div class="container">
    <p>{{ getDayString(dayWeatherData.dt, "short") }}</p>
    <BaseWeatherIcon :icon="dayWeatherData.weather[0].icon" />
    <div>
      <span>{{ Math.ceil(dayWeatherData.main.temp_max) }} °C</span>
      /
      <span>{{ Math.ceil(dayWeatherData.main.temp_min) }}°C</span>
    </div>
  </div>
</template>

<script>
import mixinFunctions from "../utils/functions";

export default {
  props: {
    dayWeatherData: {
      type: Object,
      required: true,
    },
  },
  mixins: [mixinFunctions],
  methods: {},
};
</script>

<style scoped>
.container {
  background-color: pink;
  width: 50%;
  margin: auto;
}
</style>
