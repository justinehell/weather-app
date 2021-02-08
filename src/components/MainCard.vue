<template>
  <div>
    <div v-if="searchLoading" class="alert alert-info" role="alert">
      Chargement des données... Veuillez patienter s'il vous plait
    </div>
    <section v-else-if="search" class="weather-card">
      <CurrentWeatherData :currentWeatherData="search.current" class="mb-4" />
      <div class="d-flex justify-content-between mb-4">
        <DayThumbnail
          v-for="(el, index) in [currentDay, ...getNextFiveDaysWeatherData]"
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
      <div class="note secondary--text">
        Notes: les données de l'api sont mises à jour toutes les 10 minutes
      </div>
    </section>
  </div>
</template>

<script>
import DayThumbnail from "./DayThumbnail";
import CurrentWeatherData from "./CurrentWeatherData";
import { getDayString, getDayInt } from "../utils";
import _ from "lodash";

export default {
  components: {
    DayThumbnail,
    CurrentWeatherData,
  },
  methods: {
    getArrayOfIcons(arr, index) {
      return arr[index].map((data) => data.weather[0].icon);
    },
    findMostFrequentItem(arr) {
      let result = _.head(
        _(arr)
          .countBy()
          .entries()
          .maxBy(_.last)
      );
      return result;
    },
    getArrayOfTemp(arr, index, temp) {
      return arr[index].map((data) => data.main[temp]);
    },
    getForecastDataPerDay(array, index) {
      let dataPerDay = {
        dt: getDayString(array[index][0].dt, "short"),
        maxT: Math.ceil(
          Math.max(...this.getArrayOfTemp(array, index, "temp_max"))
        ),
        minT: Math.floor(
          Math.min(...this.getArrayOfTemp(array, index, "temp_min"))
        ),
        icon: this.findMostFrequentItem(this.getArrayOfIcons(array, index)),
      };
      return dataPerDay;
    },
  },
  computed: {
    currentDay() {
      if (!this.search) return null;
      return {
        icon: this.search.current.weather[0].icon,
        dt: getDayString(this.search.current.dt, "short"),
        minT: Math.floor(this.search.current.main.temp_min),
        maxT: Math.ceil(this.search.current.main.temp_max),
      };
    },
    getNextFiveDaysWeatherData() {
      if (!this.search) return [];
      let currentDay = getDayInt(this.search.current.dt); // 0 for Sunday and 6 for Saturday
      let copyForecastData = [...this.search.forecast.list]; // copy data to avoid mutating
      let nextFiveDaysWeatherDataArray = copyForecastData.filter(
        (data) => getDayInt(data.dt) !== currentDay
      );
      // nextFiveDaysWeatherDataArray
      // contains all the weather data for the next 5 days (without data for the current day, removed from filter function)
      // from this big array of objects, we need to separate the data related to each day
      let DATA_PER_DAY = 8; // for each day, we have 8 objects representing the data
      let chunkArrays = _.chunk(nextFiveDaysWeatherDataArray, DATA_PER_DAY);

      // For each day, we have 8 data objects. Now, we need to get the
      // date time, max temp, min temp & most frequent icon to display global weather info
      let forecastData = [
        this.getForecastDataPerDay(chunkArrays, 0),
        this.getForecastDataPerDay(chunkArrays, 1),
        this.getForecastDataPerDay(chunkArrays, 2),
        this.getForecastDataPerDay(chunkArrays, 3),
      ];

      // handle a particular case where the filter function (l.85) removes the data for the current day
      // Problem : when it's between midnight and 3:00 am, a whole chunk of data corresponding to the current day is removed
      // So we only have 4 chunks left of 8 datas each (so data.length <= 32). We want to display 5 chunks of data when
      // the forecast data.length > 32
      if (nextFiveDaysWeatherDataArray.length > 32) {
        forecastData.push(this.getForecastDataPerDay(chunkArrays, 4));
      }
      return forecastData;
    },
    search() {
      return this.$store.state.search;
    },
    searchLoading() {
      return this.$store.state.searchLoading;
    },
  },
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
.note {
  text-align: center;
  font-size: 12px;
  font-style: italic;
}
</style>
