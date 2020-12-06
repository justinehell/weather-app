<template>
  <img
    :src="'http://openweathermap.org/img/w/' + icon + '.png'"
    alt="day weather"
  />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
