import { getData } from './api.js';
import { setActiveState, setInactiveState } from './states.js';
import { loadMap } from './map.js';
import { setFilters } from './filter.js';
import { setForm } from './form.js';
setInactiveState();

loadMap()
  .then(() => {
    getData()
      .then((data) => {
        setActiveState();
        console.log(data);
        //renderMarkers(data);
        setFilters(data);
        setForm();
      }).catch(() => {
        console.log('данные не загружены');
      });
  })
  .catch(() => {
    console.log('карта не загружена');
  });

