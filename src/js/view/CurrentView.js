import View from './View.js';
import icons from 'url:../../img/icons.svg';

class CurrentWeatherView extends View {
  _parentElement = document.querySelector('.current-weather');

  showBackground(data) {
    const body = document.querySelector('body');
    body.style.height = 'auto';
    const currentTime = data.currentTime;
    const sunriseTime = data.sunrise;
    const sunsetTime = data.sunset;
    body.classList.remove('bg-day');
    body.classList.remove('bg-night');
    if (currentTime > sunriseTime && currentTime < sunsetTime) {
      body.classList.add('bg-day');
    } else body.classList.add('bg-night');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return `
    <div class="container">
    <div class="current-location__container">
    
      <div class="icon-current__location">
      ${
        this._data.currentLocation
          ? ` 
        <svg class="icon-mylocation">
        <use href="${icons}#icon-mylocation"></use>
      </svg>
    </div>
    <div class="location-name">
      <p class="location-title">${this._data?.currentLocation}</p>
       
      `
          : ''
      }
    </div>
        
    </div>
    <div class="current-weather__summery">
      <div class="summery-tempature">
        <div class="overview-current__weather">
        
          <img src="http://openweathermap.org/img/wn/${
            this._data.weather[0].icon
          }@2x.png" alt="" />
          <span class="tempreture"> ${this._data.temp.toFixed(0)}° </span>
          <div class="units">
            <p class="metrics">${this._data.unit === 'metric' ? 'c' : 'f'}</p>
            
          </div>
        </div>
        <div class="summery-message">
          <h1 class="forecast-title">${this._data.weather[0].description}</h1>
          <p>local time: ${this._data.localTime} </p>
        </div>
      </div>
      <div class="current-weather__details">
        <div class="detail">
          <svg class="detail-icon">
            <use href="${icons}#icon-feelslike"></use>
          </svg>
          <div class="detailitem-group">
            <div class="feelike-title">feel like</div>
            <div class="current-detail__feellikevalue">${this._data.feelsLike.toFixed(
              0
            )}°</div>
          </div>
        </div>
        <div class="detail">
          <svg class="detail-icon">
            <use href="${icons}#icon-wind"></use>
          </svg>
          <div class="detailitem-group">
            <div class="feelike-title">wind speed </div>
            <div class="current-detail__feellikevalue">${this._data.windSpeed.toFixed(
              0
            )} mph</div>
          </div>
        </div>
        <div class="detail">
          <svg class="detail-icon">
            <use href="${icons}#icon-eye"></use>
          </svg>
          <div class="detailitem-group">
            <div class="feelike-title">Visibilty</div>
            <div class="current-detail__feellikevalue">${this._data.visibility.toFixed(
              1
            )}
            mi</div>
          </div>
        </div>
        <div class="detail">
          <svg class="detail-icon">
            <use href="${icons}#icon-humidity"></use>
          </svg>
          <div class="detailitem-group">
            <div class="feelike-title">humidity</div>
            <div class="current-detail__feellikevalue">${
              this._data.humidity
            }%</div>
          </div>
        </div>
        <div class="detail">
          <svg class="detail-icon">
            <use href="${icons}#icon-pressure"></use>
          </svg>
          <div class="detailitem-group">
            <div class="feelike-title">pressure</div>
            <div class="current-detail__feellikevalue">${
              this._data.pressure
            } mb</div>
          </div>
        </div>
        <div class="detail">
          <svg class="detail-icon">
            <use href="${icons}#icon-dewpoint"></use>
          </svg>
          <div class="detailitem-group">
            <div class="feelike-title">dew point</div>
            <div class="current-detail__feellikevalue">${this._data.dewpoint.toFixed(
              0
            )}°</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }
}

export default new CurrentWeatherView();
