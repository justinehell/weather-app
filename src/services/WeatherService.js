import axios from "axios";

const apiOpenWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const API_TOKEN = process.env.VUE_APP_TOKEN;

export default {
  getWeather() {
    return apiOpenWeather.get(
      "weather?q=lyon&lang=fr&units=metric&appid=" + API_TOKEN
    );
  },
  getNextFiveDaysWeather() {
    return apiOpenWeather.get(
      "forecast?q=lyon&lang=fr&units=metric&appid=" + API_TOKEN
    );
  },
};
