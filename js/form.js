import { isValid } from './validation.js';
import { postData } from './api.js';
import {showSuccessPopup} from './popups.js';
const form = document.querySelector('.ad-form');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    //Блокировать кнопку submit
    postData(new FormData(evt.target))
      .then(() => {
        //Очистка фильтра
        //Очистка формы
        //Показать окно успеха
        showSuccessPopup();
      })
      .catch()
      .finally(() => {
        //Разблокировать кнопку submit
      });
  }
});

const setForm = () => {
  console.log('setForm');
};

export { setForm };
