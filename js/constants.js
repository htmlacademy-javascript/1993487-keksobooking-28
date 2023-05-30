const LINK_GET_DATA = 'https://28.javascript.pages.academy/keksobooking/data';
const LINK_POST_DATA = 'https://28.javascript.pages.academy/keksobooking';
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const START_LAT = 35.68950;
const START_LNG = 139.691710;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 13;
const MARKER_WIDTH = 40;
const MAIN_MARKER_WIDTH = 52;
const MAX_POINTS = 10;
const FILTER_DELAY = 500;
const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MAX_PRICE = 100000;
const ALERT_MESSAGE = 'Не удалось загрузить данные с сервера';


const HOUSING_DICTIONARY = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец'
};

const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

export {
  LINK_GET_DATA,
  START_LAT,
  START_LNG,
  TILE_LAYER,
  COPYRIGHT,
  ZOOM,
  MAIN_MARKER_WIDTH,
  MARKER_WIDTH,
  FILTER_DELAY,
  MAX_POINTS,
  LINK_POST_DATA,
  HOUSING_DICTIONARY,
  MIN_LENGTH,
  MAX_LENGTH,
  MAX_PRICE,
  MIN_PRICE,
  DEFAULT_AVATAR,
  ALERT_MESSAGE
};
