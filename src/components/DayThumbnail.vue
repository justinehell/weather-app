<template>
  <div>
    <p v-text="day"></p>
    <BaseWeatherIcon :icon="icon" />
    <div>
      <span v-text="`${maxT} °C`"></span>
      /
      <span v-text="`${minT} °C`"></span>
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
