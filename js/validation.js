import { MIN_LENGTH, MAX_LENGTH, MAX_PRICE, MIN_PRICE } from './constants.js';
import {updateSliderStart} from './slider.js';

const orderFormElement = document.querySelector('.ad-form');
const titleFieldElement = document.querySelector('#title');
const typeFieldElement = document.querySelector('#type');
const priceFieldElement = document.querySelector('#price');
const roomsFieldElement = document.querySelector('#room_number');
const guestsFieldElement = document.querySelector('#capacity');
const timeInFieldElement = document.querySelector ('#timein');
const timeOutFieldElement = document.querySelector ('#timeout');


const RoomsToGuests = {
  1: ['1'],
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: ['0']
};

const pristine = new Pristine(orderFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
});

const validateTitle = (value) => value.length >= MIN_LENGTH && value.length <= MAX_LENGTH;

pristine.addValidator(
  titleFieldElement,
  validateTitle,
  `Длина строки должна быть не меньше ${MIN_LENGTH} и больше ${MAX_LENGTH} символов.`
);

const validatePrice = (value) => value >= MIN_PRICE[typeFieldElement.value] && value <= MAX_PRICE;

const getPriceValidatorMessage = () =>
  priceFieldElement.value > MAX_PRICE
    ? `Максимальная цена ${MAX_PRICE}`
    : `Минимальная цена ${MIN_PRICE[typeFieldElement.value]}`;

typeFieldElement.addEventListener('change', (evt) => {
  updateSliderStart(MIN_PRICE[evt.target.value]);
  pristine.validate(priceFieldElement);
});

pristine.addValidator(priceFieldElement, validatePrice, getPriceValidatorMessage);

const validateRooms = () =>
  RoomsToGuests[roomsFieldElement.value].includes(guestsFieldElement.value);

const getRoomsValidatorMessage = () => {
  switch (roomsFieldElement.value) {
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

roomsFieldElement.addEventListener('change', () => {
  pristine.validate(guestsFieldElement);
});

pristine.addValidator(guestsFieldElement, validateRooms, getRoomsValidatorMessage);

timeInFieldElement.addEventListener('change', () => {
  timeOutFieldElement.value = timeInFieldElement.value ;
});

timeOutFieldElement.addEventListener('change', () => {
  timeInFieldElement.value = timeOutFieldElement.value;
});

const isValid = () => pristine.validate();

export {isValid};
