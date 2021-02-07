<template>
  <ul class="d-flex p-0">
    <li
      v-for="city in favoritesCities"
      :key="city"
      @click="$store.dispatch('searchWeather', city)"
    >
      {{ city }}
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    favoritesCities() {
      return this.$store.state.favorites;
    },
  },
};
</script>
<style scoped>
li {
  background: white;
  list-style-type: none;
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
