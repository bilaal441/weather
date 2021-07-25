import View from './View.js';
import icons from 'url:../../img/icons.svg';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  _getInput() {
    return this._parentElement.querySelector('.search__field');
  }
  _clearInput() {
    this._getInput().value = '';
  }

  getQuery() {
    const query = this._getInput().value;
    this._clearInput();
    return query;
  }
  getUnit() {
    const activUnit = document.querySelector('.btn-switch__active');
    const { tap } = activUnit.dataset;
    return tap;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  addhandlerloadCurrentLocation(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btnLoction = e.target.closest('.btn-current-location');
      if (!btnLoction) return;
      handler();
    });
  }
}

export default new SearchView();
