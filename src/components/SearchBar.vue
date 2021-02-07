<template>
  <form class="input-wrapper">
    <input type="text" placeholder="ex: Paris" v-model="city" />
    <input type="button" value="chercher" :disabled="city.length === 0" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      city: "",
    };
  },
  methods: {},
};
</script>
<style scoped>
.input-wrapper {
  margin-bottom: 20px;
}
</style>
