import View from './view.js';
import icons from 'url:../../img/icons.svg';

class SwitchView extends View {
  _parentElement = document.querySelector('.switch-conatiner');

  addHandlerSwitch(handler) {
    this._parentElement.addEventListener('click', function (e) {
      this.querySelectorAll('.btn-switch').forEach(el =>
        el.classList.remove('btn-switch__active')
      );

      if (e.target.classList.contains('btn-switch__imperial')) {
        const btnImperial = e.target;
        btnImperial.classList.add('btn-switch__active');
        const quary = btnImperial.dataset.tap;
        handler(quary);
      }
      if (e.target.classList.contains('btn-switch__metrics')) {
        const btnMetrics = e.target;
        btnMetrics.classList.add('btn-switch__active');
        const quary = btnMetrics.dataset.tap;
        handler(quary);
      }
    });
  }
}

export default new SwitchView();
