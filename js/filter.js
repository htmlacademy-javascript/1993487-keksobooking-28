import { FILTER_DELAY } from './constants.js';
import { MAX_POINTS } from './constants.js';

import { renderMarkers } from './map.js';
import { debounce } from './utils.js';

const filters = document.querySelector('.map__filters');
const featuresCheckboxes = document.querySelectorAll('.map__checkbox');

const PriceRanges = {
  low: 10000,
  middle: 50000,
};

const points = [];
const model = {
  features: []
};

const getFeatures = () => Array.from(featuresCheckboxes)
  .reduce((acc, item) => item.checked ? [...acc, item.value] : acc, []);

const changeModel = (filter, value) => {
  if (filter === 'features') {
    model.features.length = 0;
    model.features.push(...getFeatures());
  } else {
    model[filter] = value;
  }
};

const isPriceBelongRange = (range, price) => {
  switch (range) {
    case 'low':
      return price < PriceRanges.low;
    case 'middle':
      return price >= PriceRanges.low && price < PriceRanges.middle;
    case 'high':
      return price >= PriceRanges.middle;
  }
};

const getFilteredPoints = (filter, data) => {
  switch (filter) {
    case 'housing-type':
      return data.slice().filter((item) => model[filter] !== 'any' ? item.offer.type === model[filter] : item);
    case 'housing-price':
      return data.slice().filter((item) => model[filter] !== 'any' ? isPriceBelongRange(model[filter], item.offer.price) : item);
    case 'housing-rooms':
      return data.slice().filter((item) => model[filter] !== 'any' ? item.offer.rooms === model[filter] * 1 : item);
    case 'housing-guests':
      return data.slice().filter((item) => model[filter] !== 'any' ? item.offer.guests === model[filter] * 1 : item);
    case 'features':
      return model.features.length
        ? model.features.reduce((acc, item) => acc.filter((apartment) => apartment.offer.features?.includes(item)), data)
        : data;
  }
};

const filterPoints = () => Object.keys(model)
  .reduce((acc, filter) => getFilteredPoints(filter, acc), points.slice());

filters.addEventListener('change', debounce((evt) => {
  changeModel(evt.target.name, evt.target.value);
  renderMarkers(filterPoints().slice(0, MAX_POINTS));
}, FILTER_DELAY));

const resetModel = () => {
  Object.keys(model).forEach((item) => {
    if(item === 'features') {
      model[item].length = 0;
    } else {
      model[item] = 'any';
    }
  });
};

filters.addEventListener('reset', () => {
  resetModel();
  renderMarkers(filterPoints().slice(0, MAX_POINTS));
});

const resetFilter = () => {
  filters.reset();
};

const setFilters = (data) => {
  points.push(...data.slice());
  renderMarkers(points.slice(0, MAX_POINTS));
};

export { setFilters, resetFilter };
