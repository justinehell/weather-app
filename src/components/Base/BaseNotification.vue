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
    setTimeout(() => {
      this.$store.dispatch("removeNotification", null);
    }, 3000);
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
