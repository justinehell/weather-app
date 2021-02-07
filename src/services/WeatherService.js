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
  getWeather(city = "lyon") {
    return apiOpenWeather.get(
      "weather?q=" + city + "&lang=fr&units=metric&appid=" + API_TOKEN
    );
  },
  getNextFiveDaysWeather(city = "lyon") {
    return apiOpenWeather.get(
      "forecast?q=" + city + "&lang=fr&units=metric&appid=" + API_TOKEN
    );
  },
};
