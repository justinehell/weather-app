<template>
  <div class="main">
    <h1>Bienvenue sur votre App Météo Favorite !</h1>
    <section v-if="currentWeatherData">
      <h2>{{ currentWeatherData.name }}</h2>
      <p>
        {{ getDayString(currentWeatherData.dt, "long") }}
        {{ getHour(currentWeatherData.dt) }}
      </p>
      <p v-for="el in currentWeatherData.weather" :key="el.id">
        {{ el.description }}
        <BaseWeatherIcon :icon="el.icon" />
      </p>

      <p>{{ Math.ceil(currentWeatherData.main.temp) }} °C</p>
      <p>Humidité : {{ currentWeatherData.main.humidity }}%</p>
      <p>Vent : {{ currentWeatherData.wind.speed }} m/s</p>
      <DayThumbnail :dayWeatherData="currentWeatherData" />
    </section>
  </div>
</template>

<script>
import DayThumbnail from "./DayThumbnail";
import WeatherService from "../services/WeatherService";
import mixinFunctions from "../utils/functions";

export default {
  data() {
    return {
      currentWeatherData: null,
    };
  },
  components: {
    DayThumbnail,
  },
  methods: {},
  created() {
    WeatherService.getWeather()
      .then((response) => {
        this.currentWeatherData = response.data;
      })
      .catch((error) => {
        console.log("There was an error:" + error.response);
      });
  },
  mixins: [mixinFunctions],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
