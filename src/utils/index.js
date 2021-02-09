// turn timestamp into hour (format hh:00)
export const getHour = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let minutes = "0" + date.getMinutes();
  let hours = date.getHours();
  return hours + ":" + minutes.substr(-2);
};
// turn timestamp into day (format string)
export const getDayString = (timestamp, strFormat) => {
  let date = new Date(timestamp * 1000);
  return date.toLocaleString("fr", { weekday: strFormat });
};

export const getDayInt = (timestamp) => {
  let date = new Date(timestamp);
  return date.getDay();
};
