<template>
  <form class="input-wrapper" v-on:submit.prevent="submit">
    <input type="text" placeholder="ex: Paris" v-model="city" />
    <input
      type="button"
      value="chercher"
      :disabled="city.length === 0"
      @click="submit"
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      city: "",
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("searchWeather", this.city);
      this.city = "";
    },
  },
};
</script>
<style scoped>
.input-wrapper {
  margin-bottom: 20px;
}
</style>
