<template>
  <div :class="['alert', 'alert-' + type]" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  created() {
    this.$store.dispatch("removeNotification", null);
  },
};
</script>

<style scoped>
div {
  position: absolute;
  bottom: 0;
  align-self: center;
}
</style>
