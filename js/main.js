import { getData } from './api.js';
import { setActiveState, setInactiveState } from './states.js';
import { loadMap } from './map.js';
import { setFilters } from './filter.js';

setInactiveState();

loadMap()
  .then(() => {
    getData()
    .then((data) => {
      setActiveState();
      console.log(data);
      //renderMarkers(data);
      setFilters(data);
    }).catch(() => {
      console.log('данные не загружены');
    });
  })
  .catch(() => {
    console.log('карта не загружена');
  });

