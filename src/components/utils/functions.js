export default {
  methods: {
    // turn timestamp into hour (format hh:00)
    getCurrentHour(timestamp) {
      let date = new Date(timestamp * 1000);
      let hours = date.getHours();
      return hours + ":00";
    },
    // turn timestamp into day (format string)
    getCurrentDayString(timestamp, strFormat) {
      let date = new Date(timestamp * 1000);
      return date.toLocaleString("fr", { weekday: strFormat });
    },
  },
};
