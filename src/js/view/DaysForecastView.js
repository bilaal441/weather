import View from './view.js';

class DaysForecastView extends View {
  _parentElement = document.querySelector('.forcast');

  Addhandllerclick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const el = e.target.closest('.day');

      if (!el) return;
      document.querySelectorAll('.day').forEach(el => {
        el.classList.remove('active-day');
        el.querySelector('.day-card').classList.remove('bg-active');
      });
      el.classList.add('active-day');
      const daycard = el.firstElementChild;
      daycard.classList.add('bg-active');
      const { tap } = el.dataset;
      handler(tap);
    });
  }
  addActivetap(value) {
    const activeDay = document.querySelector(`[data-tap="${value}"]`);
    activeDay.classList.add('active-day');
    const daycard = activeDay.firstElementChild;
    daycard.classList.add('bg-active');
  }
  _generateMarkup() {
    return ` <div class="container">
    <div class="title">
      <p>8 day forcast</p>
    </div>
    <div class="forecast-details">
      <ul class="days-container">
      ${this._data
        .map(function (day) {
          return ` 
            <li class="day " data-tap="${day.date}">
              <button class="day-card ">
                <span class="card__group">
                  <p class="card-header">${day.date}</p>
                   <div class="icon-body">
                    <img
                      src="http://openweathermap.org/img/wn/${
                        day.weather[0].icon
                      }@2x.png"
                      alt=""
                    />
                  </div>
                   
                  <div class="footer-high-low">
                    <p class="temperature">${Math.round(day.temp.max)}°</p>
                    <p class="temperature">${Math.round(day.temp.min)}°</p>
                  </div>
                </span>
              </button>
            </li>`;
        })
        .join('')}
      </ul>
    </div>
  </div> `;
  }
}

export default new DaysForecastView();
