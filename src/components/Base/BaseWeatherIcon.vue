<template>
  <img
    :src="'http://openweathermap.org/img/w/' + icon + '.png'"
    :width="width"
    :height="height"
    alt="day weather"
    class="base-icon"
  />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 50,
    },
    height: {
      type: [Number, String],
      default: 50,
    },
  },
};
</script>

<style scoped></style>
