<template>
  <div class="main-card">
    <div v-if="searchLoading" class="alert alert-info loading" role="alert">
      Chargement des données... Veuillez patienter s'il vous plait
    </div>
    <section v-else-if="search" class="weather-card">
      <CurrentWeatherData :currentWeatherData="search.current" class="mb-4" />
      <div class="d-flex justify-content-between mb-4">
        <DayThumbnail
          v-for="(el, index) in search.forecast"
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

export default {
  components: {
    DayThumbnail,
    CurrentWeatherData,
  },
  computed: {
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
.main-card {
  width: 100%;
}
.weather-card {
  border-radius: 5px;
  padding: 24px;
  min-width: 662px;
  height: 500px;
  background-color: white;
}
.note {
  text-align: center;
  font-size: 12px;
  font-style: italic;
}
.loading {
  height: 485px;
  width: 100%;
}
</style>
