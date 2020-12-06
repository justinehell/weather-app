<template>
  <div class="thumbnail-wrapper">
    <div v-text="day" class="text-center secondary--text"></div>

    <BaseWeatherIcon :icon="icon" class="d-block m-auto" />

    <div class="text-center">
      <span v-text="`${maxT}°`" class="primary--text mr-2"></span>
      <span v-text="`${minT}°`" class="secondary--text"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    minT: {
      type: Number,
      required: true,
    },
    maxT: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style scoped>
.thumbnail-wrapper {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #dfe1e5;
}
</style>
