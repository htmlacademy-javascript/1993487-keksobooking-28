import { isValid } from './validation.js';
import { postData } from './api.js';
import { showSuccessPopup, showErrorPopup } from './popups.js';
import {updateSliderStart} from './slider.js';
import './slider.js';

import {
  START_LAT,
  START_LNG,
  MIN_PRICE,
  DEFAULT_AVATAR,
} from './constants.js';

const form = document.querySelector('.ad-form');
const avatarInput = document.querySelector('#avatar');
const imagePreview = document.querySelector('.ad-form-header__preview img');
const addressElement = document.querySelector('#address');
const imageDownloadInput = document.querySelector('#images');
const imageDownloadField = document.querySelector('.ad-form__photo');
const submitButton = document.querySelector('.ad-form__submit');
const typeField = document.querySelector('#type');
const resetButton = document.querySelector('.ad-form__reset');

avatarInput.addEventListener('change', () => {
  const image = avatarInput.files[0];
  imagePreview.src = URL.createObjectURL(image);
});

const resetAvatar = () => {
  imagePreview.src = DEFAULT_AVATAR;
};

imageDownloadInput.addEventListener('change', () => {
  const imageElement = document.createElement('img');
  const apartmentImage = imageDownloadInput.files[0];
  imageDownloadField.append(imageElement);
  imageElement.src = URL.createObjectURL(apartmentImage);
  imageElement.style.maxWidth = '100%';
  imageElement.style.height = 'auto';
});

//const resetPhoto = () => {
  //imageElement.remove();
//};

const getAddressСoordinates = ({lat, lng}) => {
  const latitude = lat.toFixed(5);
  const longitude = lng.toFixed(5);
  addressElement.value = `${latitude} ${longitude}`;
};

const setSubmitStatusSending = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const setSubmitStatusIdle = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  form.reset();
  updateSliderStart(MIN_PRICE[typeField.value]);
  getAddressСoordinates({lat: START_LAT, lng: START_LNG});
  resetAvatar();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    setSubmitStatusSending();
    postData(new FormData(evt.target))
      .then((responce) => {
        if (responce.ok){
        //Очистка фильтра
          resetForm();
        //Очистка формы
          showSuccessPopup();
        } else {
          showErrorPopup();
        }
      })
      .catch()
      .finally(() => {
        setSubmitStatusIdle();
      });
  }
});

resetButton.addEventListener ('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const setForm = () => {
  console.log('setForm');
};

export { setForm, getAddressСoordinates };
