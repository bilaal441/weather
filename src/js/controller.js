import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import CurrentView from './view/CurrentView.js';
import DaysForecastView from './view/DaysForecastView.js';
import hourlyView from './view/hourlyView.js';
import SwitchView from './view/switchView.js';
import SearchView from './view/SearchView.js';

const controlCurrentWeather = async function () {
  try {
    const unitActive = SearchView.getUnit();
    model.state.coards = await model.loadpostion();

    await model.loadWData(model.state.coards, unitActive);
    CurrentView.showBackground(model.state.currentWeather);
    CurrentView.render(model.state.currentWeather);
    DaysForecastView.render(model.state.dailyForecast);
    model.getHourlyPerDay('today');
    DaysForecastView.addActivetap(model.getActiveDayBg(model.state.active));
    hourlyView.render(model.state.active);
    hourlyView.addhendlerGlider();
  } catch (err) {
    console.log(err);
  }
};

const controlSearch = async function () {
  try {
    const unitActive = SearchView.getUnit();
    const query = SearchView.getQuery();
    if (!query) return;
    model.state.coards = await model.searchLocation(query);
    await model.loadWData(model.state.coards, unitActive);
    CurrentView.showBackground(model.state.currentWeather);
    CurrentView.render(model.state.currentWeather);
    DaysForecastView.render(model.state.dailyForecast);
    model.getHourlyPerDay('today');
    DaysForecastView.addActivetap(model.getActiveDayBg(model.state.active));
    hourlyView.render(model.state.active);
    hourlyView.addhendlerGlider();
  } catch (err) {
    console.log(err);
  }
};

const dayClicked = function (tap) {
  model.getHourlyPerDay(tap);
  console.log(model.state.active);
  if (model.state.active === undefined || model.state.active.length == 0)
    return;
  hourlyView.render(model.state.active);
  hourlyView.addhendlerGlider();
};
const controlSwitchTemp = async function (unit) {
  try {
    await model.loadWData(model.state.coards, unit);
    CurrentView.updated(model.state.currentWeather);
    DaysForecastView.updated(model.state.dailyForecast);
    const activeDay = model.swichActiveDay(
      model.state.hourly,
      model.state.active
    );

    if (activeDay.length === model.state.hourly.length) {
      DaysForecastView.addActivetap('today');
      hourlyView.render(model.getFirstDay('today'));
      hourlyView.addhendlerGlider();
    } else {
      DaysForecastView.addActivetap(model.getActiveDayBg(activeDay));

      hourlyView.updated(activeDay);
    }
  } catch (err) {
    console.log(err);
  }
};

const innit = function () {
  CurrentView.addHandlerRender(controlCurrentWeather);
  SearchView.addHandlerSearch(controlSearch);
  SearchView.addhandlerloadCurrentLocation(controlCurrentWeather);
  DaysForecastView.Addhandllerclick(dayClicked);
  SwitchView.addHandlerSwitch(controlSwitchTemp);
};

innit();
