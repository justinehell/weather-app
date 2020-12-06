<template>
  <div class="main">
    <h1>Bienvenue sur votre App Météo Favorite !</h1>
    <!-- if null, components inside section are not mounted inside DOM -->
    <section v-if="currentWeatherData && forecastWeatherData">
      <CurrentWeatherData :currentWeatherData="currentWeatherData" />
      <DayThumbnail :dayWeatherData="currentWeatherData" />
    </section>
  </div>
</template>

<script>
import DayThumbnail from "./DayThumbnail";
import CurrentWeatherData from "./CurrentWeatherData";
import WeatherService from "../services/WeatherService";
import mixinFunctions from "../utils/functions";

export default {
  data() {
    return {
      currentWeatherData: null,
      forecastWeatherData: null,
    };
  },
  components: {
    DayThumbnail,
    CurrentWeatherData,
  },
  methods: {},
  computed: {},
  created() {
    WeatherService.getWeather()
      .then((response) => {
        this.currentWeatherData = response.data;
      })
      .catch((error) => {
        console.log(
          "There was an error while fetching current weather data::" +
            error.response
        );
      });
    WeatherService.getNextFiveDaysWeather()
      .then((response) => {
        console.log(response.data);
        this.forecastWeatherData = response.data;
      })
      .catch((error) => {
        console.log(
          "There was an error while fetching forecast weather data:" +
            error.message
        );
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
.main {
  background-color: #42b983;
}
</style>
