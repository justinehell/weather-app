import axios from "axios";
import _ from "lodash";

import { getDayInt, getDayString } from "../utils";

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
  getWeather(city) {
    return new Promise((resolve, reject) =>
      apiOpenWeather
        .get("weather?q=" + city + "&lang=fr&units=metric&appid=" + API_TOKEN)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    );
  },
  getNextFiveDaysWeather(city) {
    return new Promise((resolve, reject) =>
      apiOpenWeather
        .get("forecast?q=" + city + "&lang=fr&units=metric&appid=" + API_TOKEN)
        .then((response) => {
          resolve(getNextFiveDaysWeatherData(response.data));
        })
        .catch((error) => reject(error))
    );
  },
};

export const getArrayOfIcons = (arr, index) => {
  return arr[index].map((data) => data.weather[0].icon);
};

export const findMostFrequentItem = (arr) => {
  let result = _.head(
    _(arr)
      .countBy()
      .entries()
      .maxBy(_.last)
  );
  return result;
};

export const getArrayOfTemp = (arr, index, temp) => {
  return arr[index].map((data) => data.main[temp]);
};

export const getForecastDataPerDay = (array, index) => {
  let dataPerDay = {
    dt: getDayString(array[index][0].dt, "short"),
    maxT: Math.ceil(Math.max(...getArrayOfTemp(array, index, "temp_max"))),
    minT: Math.floor(Math.min(...getArrayOfTemp(array, index, "temp_min"))),
    icon: findMostFrequentItem(getArrayOfIcons(array, index)),
  };
  return dataPerDay;
};

export const getNextFiveDaysWeatherData = (data) => {
  if (!data.list) return [];
  let currentDay = getDayInt(new Date()); // 0 for Sunday and 6 for Saturday
  let forcastWeatherDataArray = [...data.list]; // copy data to avoid mutating
  let nextFiveDaysWeatherDataArray = forcastWeatherDataArray.filter(
    (data) => getDayInt(data.dt) !== currentDay
  );
  // contains all the weather data for the next 5 days in an array of object
  // we need to separate the data related to each day
  let DATA_PER_DAY = 8; // 8 objects data for each day
  let chunkArrays = _.chunk(nextFiveDaysWeatherDataArray, DATA_PER_DAY);

  // we only need the date, max temp, min temp & most frequent icon
  let forecastData = [
    getForecastDataPerDay(chunkArrays, 0),
    getForecastDataPerDay(chunkArrays, 1),
    getForecastDataPerDay(chunkArrays, 2),
    getForecastDataPerDay(chunkArrays, 3),
    getForecastDataPerDay(chunkArrays, 4),
  ];
  return forecastData;
};
