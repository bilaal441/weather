import { AJAX, getPostion, calcDaysPassed } from './helper.js';
import {
  OPENWEATHER_API_URL,
  CENT_NUMBER_DAYS,
  OPENWEATHER_API_KEY,
  GEO_API_URL,
  Geo_ACCESS_KEY,
  UNIT_METRIC,
} from './config';

export const state = {
  currentWeather: {},
  dailyForecast: [],
  hourly: [],
  coards: {},
  active: [],
};
export const loadpostion = async function () {
  const { coords } = await getPostion();

  const { latitude, longitude } = coords;
  return {
    lat: latitude,
    lon: longitude,
  };
};

const loadlocation = async function (lat, lon) {
  try {
    const res = await AJAX(
      `${GEO_API_URL}json?q=${lat}+${lon}&key=${Geo_ACCESS_KEY}`
    );

    return res.results.map(el => el.formatted);

    // return res;
  } catch (err) {
    throw err;
  }
};
export const searchLocation = async function (quary) {
  try {
    const res = await AJAX(
      `${GEO_API_URL}json?q=${quary}&key=${Geo_ACCESS_KEY}`
    );
    const { geometry } = res.results[0];
    return {
      lat: geometry.lat,
      lon: geometry.lng,
    };
  } catch (err) {
    console.log(err);
  }
};

const formatDailyDays = function (day, time_zone, time = false) {
  if (time) {
    return new Intl.DateTimeFormat(navigator.language, {
      timeZone: `${time_zone}`,
      hour: 'numeric',
      minute: '2-digit',
    }).format(day * 1000);
  }
  return calcDaysPassed(new Date(), day * 1000) > 0
    ? new Intl.DateTimeFormat(navigator.language, {
        timeZone: `${time_zone}`,
        day: '2-digit',
        weekday: 'short',
      }).format(day * 1000)
    : 'today';
};
const formatCurrentWeather = async function (data) {
  try {
    return {
      feelsLike: data.current.feels_like,
      visibility: data.current.visibility / 1609,
      dewpoint: data.current.dew_point,
      humidity: data.current.humidity,
      pressure: data.current.pressure,
      currentLocation: await loadlocation(data.lat, data.lon),
      weather: data.current.weather,
      temp: data.current.temp,
      windSpeed: data.current.wind_speed * 2.237,
      dailyTempObj: data.daily[0].temp,
      unit: data.unit,
      localTime: formatDailyDays(data.current.dt, data.timezone, true),
      sunrise: data.current.sunrise,
      sunset: data.current.sunset,
      currentTime: data.current.dt,
    };
  } catch (err) {
    throw err;
  }
};

const formatDailyForcast = data =>
  data.daily.map(day => ({
    weather: day.weather,
    date: formatDailyDays(day.dt, data.timezone),
    temp: day.temp,
  }));

const formatHourly = data =>
  data.hourly.map(hour => ({
    time: formatDailyDays(hour.dt, data.timezone, true),
    weather: hour.weather,
    temp: hour.temp,
    date: formatDailyDays(hour.dt, data.timezone),
    id: hour.dt,
  }));

export const loadWData = async function (coords, unit = UNIT_METRIC) {
  try {
    const data = await AJAX(
      `${OPENWEATHER_API_URL}?lat=${coords.lat}&lon=${coords.lon}&units=${unit}&cnt=${CENT_NUMBER_DAYS}&alerts&appid=${OPENWEATHER_API_KEY}`
    );

    data.unit = unit;
    state.currentWeather = await formatCurrentWeather(data);
    state.dailyForecast = formatDailyForcast(data);
    state.hourly = formatHourly(data);
  } catch (err) {
    throw err;
  }
};

export const getHourlyPerDay = function (tap) {
  state.active = state.hourly.filter(el => el.date === tap);
};

export const swichActiveDay = (StateHours, hoursActive) =>
  StateHours.filter(hour =>
    hoursActive.every(hourActive => hourActive.date.includes(hour.date))
  );

export const getActiveDayBg = hoursActive =>
  hoursActive.map(hour => hour.date)[0];

export const getFirstDay = date =>
  state.hourly.filter(day => day.date === date);
