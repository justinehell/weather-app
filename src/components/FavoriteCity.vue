<template>
  <div v-show="Object.keys(favoritesCities).length">
    <h4>Mes favoris</h4>
    <ul class="d-flex p-0 flex-wrap ">
      <li
        v-for="(name, id) in favoritesCities"
        :key="id"
        @click="$store.dispatch('searchWeather', name)"
        :class="[currentCity.id === parseInt(id) ? 'active' : '']"
      >
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    favoritesCities() {
      return this.$store.state.favorites;
    },
    currentCity() {
      if (!this.$store.state.search) return "";
      return this.$store.state.search.current;
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bowlby+One+SC&display=swap");

ul {
  margin-bottom: 0;
}
li {
  background: white;
  list-style-type: none;
  margin: 0 20px 20px 0;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: color 300ms, background-color 300ms;
}
li:hover {
  background-color: #09c;
  color: white;
}
h4 {
  color: white;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: "Bowlby One SC", cursive;
}
.active {
  background-color: #09c;
  color: white;
}
</style>
