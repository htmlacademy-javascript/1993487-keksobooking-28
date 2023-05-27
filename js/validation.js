import { MIN_LENGTH, MAX_LENGTH, MAX_PRICE, MIN_PRICE } from './constants.js';
import {updateSliderStart} from './slider.js';

const orderForm = document.querySelector('.ad-form');
const titleField = document.querySelector('#title');
const typeField = document.querySelector('#type');
const priceField = document.querySelector('#price');
const roomsField = document.querySelector('#room_number');
const guestsField = document.querySelector('#capacity');
const timeInField = document.querySelector ('#timein');
const timeOutField = document.querySelector ('#timeout');


const RoomsToGuests = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0']
};

const pristine = new Pristine(orderForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
});

const titleValidator = (value) => value.length >= MIN_LENGTH && value.length <= MAX_LENGTH;

pristine.addValidator(
  titleField,
  titleValidator,
  `Длина строки должна быть не меньше ${MIN_LENGTH} и больше ${MAX_LENGTH} символов.`
);

const priceValidator = (value) => value >= MIN_PRICE[typeField.value] && value <= MAX_PRICE;

const priceValidatorMessage = () => priceField.value > MAX_PRICE ? `Максимальная цена ${MAX_PRICE}` : `Минимальная цена ${MIN_PRICE[typeField.value]}`;

typeField.addEventListener('change', (evt) => {
  updateSliderStart(MIN_PRICE[evt.target.value]);
  pristine.validate(priceField);
});

pristine.addValidator(priceField, priceValidator, priceValidatorMessage);

const roomsValidator = () =>
  RoomsToGuests[roomsField.value].includes(guestsField.value);

const roomsValidatorMessage = () => {
  switch (roomsField.value) {
    case '1':
      return 'Для 1 гостя';
    case '2':
      return 'Для 2х гостей или для 1 гостя';
    case '3':
      return 'Для 3х гостей, для 2х гостей или для 1 гостя';
    case '100':
      return 'Не для гостей';
  }
};

roomsField.addEventListener('change', () => {
  pristine.validate(guestsField);
});

pristine.addValidator(guestsField, roomsValidator, roomsValidatorMessage);

timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value ;
});

timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});

const isValid = () => {
  console.log('validation');
  return pristine.validate();
};

export {isValid};
