<template>
  <!-- if null, components inside section are not mounted inside DOM -->
  <section
    v-if="currentWeatherData && forecastWeatherData"
    class="weather-card"
  >
    <CurrentWeatherData :currentWeatherData="currentWeatherData" class="mb-4" />
    <div class="d-flex justify-content-between mb-4">
      <DayThumbnail
        :icon="currentWeatherData.weather[0].icon"
        :day="getDayString(currentWeatherData.dt, 'short')"
        :minT="Math.floor(currentWeatherData.main.temp_min)"
        :maxT="Math.ceil(currentWeatherData.main.temp_max)"
      />
      <DayThumbnail
        v-for="(el, index) in getNextFiveDaysWeatherData"
        :key="index"
        :icon="el.icon"
        :day="el.dt"
        :minT="el.minT"
        :maxT="el.maxT"
      />
    </div>
    <div
      class="d-flex justify-content-between font-italic secondary--text "
      style="font-size:12px; text-decoration:underline"
    >
      <a
        href="https://openweathermap.org"
        target="blank"
        title="Lien vers le site Open Weather Map"
        >openweathermap.org</a
      >

      <a
        href="https://github.com/justinehell"
        target="blank"
        title="Lien vers le profil Github de Justine"
        >Réalisé par Justine</a
      >
    </div>
  </section>
</template>

<script>
import DayThumbnail from "./DayThumbnail";
import CurrentWeatherData from "./CurrentWeatherData";
import WeatherService from "../services/WeatherService";
import mixinFunctions from "../utils/functions";
import _ from "lodash";

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
  methods: {
    arrayOfIcons(arr, index) {
      return arr[index].map((data) => data.weather[0].icon);
    },
    findMostFrequentItem(arr) {
      var result = _.head(
        _(arr)
          .countBy()
          .entries()
          .maxBy(_.last)
      );
      return result;
    },
    arrayOfTemp(arr, index, temp) {
      return arr[index].map((data) => data.main[temp]);
    },
  },
  computed: {
    getNextFiveDaysWeatherData() {
      if (!this.currentWeatherData) return [];
      let currentDay = this.getDayInt(this.currentWeatherData.dt); // 0 for Sunday and 6 for Saturday
      let copyForecastData = [...this.forecastWeatherData.list]; // copy data to avoid mutating
      let nextFiveDaysWeatherDataArray = copyForecastData.filter(
        (data) => this.getDayInt(data.dt) !== currentDay
      );
      // nextFiveDaysWeatherDataArray
      // contains all the weather data for the next 5 days (without data for the current day)
      // from this big array of objects, we need to get a separate array of data for each day
      let OBJECT_DATA_PER_DAY = 8; // 8 chunks = arrays of data for each day
      let chunkArrays = _.chunk(
        nextFiveDaysWeatherDataArray,
        OBJECT_DATA_PER_DAY
      );

      // For each day, we have 8 data objects. Now, we need to get the
      // date time, max temp, min temp & most frequent icon to display global weather info
      let dataForDayOne = {
        dt: this.getDayString(chunkArrays[0][0].dt, "short"),
        maxT: Math.ceil(
          Math.max(...this.arrayOfTemp(chunkArrays, 0, "temp_max"))
        ),
        minT: Math.floor(
          Math.min(...this.arrayOfTemp(chunkArrays, 0, "temp_min"))
        ),
        icon: this.findMostFrequentItem(this.arrayOfIcons(chunkArrays, 0)),
      };
      let dataForDayTwo = {
        dt: this.getDayString(chunkArrays[1][0].dt, "short"),
        maxT: Math.ceil(
          Math.max(...this.arrayOfTemp(chunkArrays, 1, "temp_max"))
        ),
        minT: Math.floor(
          Math.min(...this.arrayOfTemp(chunkArrays, 1, "temp_min"))
        ),
        icon: this.findMostFrequentItem(this.arrayOfIcons(chunkArrays, 1)),
      };
      let dataForDayThree = {
        dt: this.getDayString(chunkArrays[2][0].dt, "short"),
        maxT: Math.ceil(
          Math.max(...this.arrayOfTemp(chunkArrays, 2, "temp_max"))
        ),
        minT: Math.floor(
          Math.min(...this.arrayOfTemp(chunkArrays, 2, "temp_min"))
        ),
        icon: this.findMostFrequentItem(this.arrayOfIcons(chunkArrays, 2)),
      };
      let dataForDayFour = {
        dt: this.getDayString(chunkArrays[3][0].dt, "short"),
        maxT: Math.ceil(
          Math.max(...this.arrayOfTemp(chunkArrays, 3, "temp_max"))
        ),
        minT: Math.floor(
          Math.min(...this.arrayOfTemp(chunkArrays, 3, "temp_min"))
        ),
        icon: this.findMostFrequentItem(this.arrayOfIcons(chunkArrays, 3)),
      };

      let forecastData = [
        dataForDayOne,
        dataForDayTwo,
        dataForDayThree,
        dataForDayFour,
      ];

      if (nextFiveDaysWeatherDataArray.length < 32) {
        let dataForDayFive = {
          dt: this.getDayString(chunkArrays[4][0].dt, "short"),
          maxT: Math.ceil(
            Math.max(...this.arrayOfTemp(chunkArrays, 4, "temp_max"))
          ),
          minT: Math.floor(
            Math.min(...this.arrayOfTemp(chunkArrays, 4, "temp_min"))
          ),
          icon: this.findMostFrequentItem(this.arrayOfIcons(chunkArrays, 4)),
        };
        forecastData.push(dataForDayFive);
      }

      return forecastData;
    },
  },
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
<style scoped>
.weather-card {
  border-radius: 8px;
  border: 1px solid #dfe1e5;
  padding: 24px;
  max-width: 688px;
  background-color: white;
}
</style>
