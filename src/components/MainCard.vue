<template>
  <div class="main">
    <h1>Bienvenue sur votre App Météo Favorite !</h1>
    <section v-if="currentWeatherData">
      <h2>{{ currentWeatherData.name }}</h2>
      <p>
        {{ getCurrentDayString(currentWeatherData.dt, "long") }}
        {{ getCurrentHour(currentWeatherData.dt) }}
      </p>
      <p v-for="el in currentWeatherData.weather" :key="el.id">
        {{ el.description }}
        <img alt="current day weather" :src="getIconUrl(el.icon)" />
      </p>

      <p>{{ Math.ceil(currentWeatherData.main.temp) }} °C</p>
      <p>Humidité : {{ currentWeatherData.main.humidity }}%</p>
      <p>Vent : {{ currentWeatherData.wind.speed }} m/s</p>

      <div>
        <p>{{ getCurrentDayString(currentWeatherData.dt, "short") }}</p>
        <img
          v-for="(el, index) in currentWeatherData.weather"
          :key="index"
          :src="getIconUrl(el.icon)"
          alt="current day weather"
        />
        <div>
          <span>{{ Math.ceil(currentWeatherData.main.temp_max) }} °C</span>
          /
          <span>{{ Math.ceil(currentWeatherData.main.temp_min) }}°C</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import WeatherService from "./../services/WeatherService";
import mixinFunctions from "../utils/functions";

export default {
  data() {
    return {
      currentWeatherData: null,
    };
  },
  methods: {
    getIconUrl(icon) {
      return "http://openweathermap.org/img/w/" + icon + ".png";
    },
  },
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
