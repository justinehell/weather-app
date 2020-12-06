<template>
  <div class="main">
    <h1>Welcome to your favorite Weather App !</h1>
    <section v-if="currentWeatherData">
      <h2>{{ currentWeatherData.name }}</h2>
      <p>{{ currentWeatherData.dt }}</p>
      <p v-for="el in currentWeatherData.weather" :key="el.id">
        {{ el.description }}
        <img alt="current day weather" :src="getIconUrl(el.icon)" />
      </p>

      <p>{{ currentWeatherData.main.temp }} °C</p>
      <p>Humidity: {{ currentWeatherData.main.humidity }} %</p>
      <p>Wind: {{ currentWeatherData.wind.speed }} m/s</p>

      <div>
        <p>{{ currentWeatherData.dt }}</p>
        <img
          v-for="(el, index) in currentWeatherData.weather"
          :key="index"
          :src="getIconUrl(el.icon)"
          alt="current day weather"
        />
        <div>
          <span>{{ currentWeatherData.main.temp_max }} °C</span>
          /
          <span>{{ currentWeatherData.main.temp_min }}°C</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      token: process.env.VUE_APP_TOKEN,
      baseCurrentWeatherURL:
        "https://api.openweathermap.org/data/2.5/weather?q=lyon&lang=fr&units=metric&appid=",
      baseIconUrl: "http://openweathermap.org/img/w/",
      currentWeatherData: null,
    };
  },
  methods: {
    getIconUrl(icon) {
      return "http://openweathermap.org/img/w/" + icon + ".png";
    },
  },
  created() {
    axios
      .get(this.baseCurrentWeatherURL + this.token)
      .then((response) => {
        console.log(response.data);
        this.currentWeatherData = response.data;
      })
      .catch((error) => {
        console.log("There was an error:" + error.response);
      });
  },
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
