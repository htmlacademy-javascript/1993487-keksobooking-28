import { renderMarkers } from './map.js';

const filters = document.querySelector('.map__filters');

const points = [];
const model = {};

const changeModel = (filter, value) => {
  model[filter] = value;
  console.log(model);
};

const getFilteredPoints = (filter, data) => {
  switch (filter) {
    case 'housing-type':
      return data.slice().filter(item => model[filter] !== 'any' ? item.offer.type === model[filter] : item);
  }
};

const filterPoints = () => Object.keys(model)
  .reduce((acc, filter) => getFilteredPoints(filter, acc), points.slice())

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
