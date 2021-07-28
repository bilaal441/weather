import View from './View.js';

import icons from 'url:../../img/icons.svg';
import Glider, {
  Controls,
  Breakpoints,
} from '@glidejs/glide/dist/glide.modular.esm';

class HourlyView extends View {
  _parentElement = document.querySelector('.hourly-forecast__container');

  addhendlerGlider() {
    const config = {
      type: 'slider',
      startAt: 0,
      perView: 11,
      bound: true,
      breakpoints: {
        990: {
          perView: 7,
        },
        680: {
          perView: 4,
        },
      },
    };

    new Glider('.glide', config).mount({ Controls, Breakpoints });
  }

  _generateMarkup() {
    return ` 
  <div class="visible-section glide">
    <div class=" glide__track"  data-glide-el="track">
      <ul class="card-container glide__slides">
        ${this._data
          .map((hour, i) => {
            return `
      <li class="card-item  glide__slide">
        <a class="card-items">
          <p class="header-card-item">${hour.time}</p>
          <div class="icon-card-item">
            <img
              src="https://openweathermap.org/img/wn/${
                hour.weather[0].icon
              }@2x.png"
              alt=""
            />
          </div>
          <div class="title-Ds-item">${hour.weather[0].description}</div>
          <div class="temp-card-item">
          <p>${Math.round(hour.temp)}°</p>
          
          </div>
        </a>
      </li>`;
          })
          .join('')}
          </ul>
          </div>

          <div class="glide__arrows" data-glide-el="controls">
          <button class="slider__btn slider__btn--left glide__arrow glide__arrow--left" data-glide-dir="<">
          <svg class="icon-chevron">
            <use href="${icons}#icon-chevron-left"></use>
          </svg>
        </button>
          <button class="slider__btn slider__btn--right glide__arrow glide__arrow--right" data-glide-dir=">">
            <svg class="icon-chevron">
              <use href="${icons}#icon-chevron-right"></use>
            </svg>
          </button>
          </div>
        </div>
     
          `;
  }
}

export default new HourlyView();
