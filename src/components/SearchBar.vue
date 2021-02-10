<template>
  <form class="input-wrapper" v-on:submit.prevent="submit">
    <input type="text" placeholder="ex: Paris" v-model="city" />
    <input
      type="button"
      value="Chercher"
      class="btn btn-primary"
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
  padding-top: 40px;
  width: 100%;
  display: flex;
}
input[type="text"] {
  flex-grow: 1;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-left: 20px;
}
input[type="text"]:focus {
  border-radius: 5px 0px 0px 5px;
  border: 1px solid #09c;
}
input[type="button"] {
  border-radius: 0px 5px 5px 0;
  border: 2px solid #09c;
  color: white;
  background-color: #09c;
  transition: border 300ms, background-color 300ms;
}
input[type="button"]:hover {
  background-color: rgb(3, 112, 148);
  border: 2px solid rgb(3, 112, 148);
}
</style>
