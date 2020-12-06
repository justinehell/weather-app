<template>
  <div>
    <p>{{ getDayString(dayWeatherData.dt, "short") }}</p>
    <BaseWeatherIcon
      v-for="(el, index) in dayWeatherData.weather"
      :key="index"
      :icon="el.icon"
    />
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

<style lang="scss" scoped></style>
