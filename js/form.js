import { isValid } from './validation.js';
import { postData } from './api.js';
import { showSuccessPopup, showErrorPopup } from './popups.js';
import { resetFilter } from './filter.js';
import { updateSliderStart } from './slider.js';
import { mainPinMarker } from './map.js';
import './slider.js';

import {
  START_LAT,
  START_LNG,
  MIN_PRICE,
  DEFAULT_AVATAR,
} from './constants.js';

const formElement = document.querySelector('.ad-form');
const avatarInputElement = document.querySelector('#avatar');
const imagePreviewElement = document.querySelector('.ad-form-header__preview img');
const addressElement = document.querySelector('#address');
const imageDownloadInputElement = document.querySelector('#images');
const imageDownloadFieldElement = document.querySelector('.ad-form__photo');
const submitButtonElement = document.querySelector('.ad-form__submit');
const typeFieldElement = document.querySelector('#type');
const resetButtonElement = document.querySelector('.ad-form__reset');

avatarInputElement.addEventListener('change', () => {
  const image = avatarInputElement.files[0];
  imagePreviewElement.src = URL.createObjectURL(image);
});

const resetAvatar = () => {
  imagePreviewElement.src = DEFAULT_AVATAR;
};

const createImageElement = () => {
  imageDownloadInputElement.addEventListener('change', () => {
    const imageElement = document.createElement('img');
    const apartmentImage = imageDownloadInputElement.files[0];
    imageDownloadFieldElement.append(imageElement);
    imageElement.src = URL.createObjectURL(apartmentImage);
    imageElement.style.maxWidth = '100%';
    imageElement.style.height = 'auto';
  });
};

const resetPhoto = () => {
  imageDownloadFieldElement.innerHTML = '';
};

const getAddressСoordinates = ({lat, lng}) => {
  const latitude = lat.toFixed(5);
  const longitude = lng.toFixed(5);
  addressElement.value = `${latitude} ${longitude}`;
};

const setSubmitStatusSending = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Опубликовываю...';
};

const setSubmitStatusIdle = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const resetForm = () => {
  formElement.reset();
  resetFilter();
  updateSliderStart(MIN_PRICE[typeFieldElement.value]);
  getAddressСoordinates({lat: START_LAT, lng: START_LNG});
  mainPinMarker.setLatLng({lat: START_LAT, lng: START_LNG});
  resetAvatar();
  resetPhoto();
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    setSubmitStatusSending();
    postData(new FormData(evt.target))
      .then((responce) => {
        if (responce.ok){
          showSuccessPopup();
          resetForm();

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

resetButtonElement.addEventListener ('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

const setForm = () => {
  createImageElement();
};

export { setForm, getAddressСoordinates };
