import { renderMarkers } from './map.js';

const filters = document.querySelector('.map__filters');

const PriceRanges = {
  low: 10000,
  middle: 50000,
};

const points = [];
const model = {};

const changeModel = (filter, value) => {
  model[filter] = value;
  console.log('!!!! ', model);
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
  }
};

const filterPoints = () => Object.keys(model)
  .reduce((acc, filter) => {
    console.log('filter ',filter);
    console.log('acc ', acc);
    console.log(getFilteredPoints(filter, acc));
    console.log('------------');
    return getFilteredPoints(filter, acc);
  }, points.slice());

filters.addEventListener('change', (evt) => {
  changeModel(evt.target.name, evt.target.value);
  console.log(evt.target.name, evt.target.value);
  console.log(filterPoints());
  renderMarkers(filterPoints());
});

const setFilters = (data) => {
  points.push(...data.slice());
  renderMarkers(points);
};

export { setFilters };
