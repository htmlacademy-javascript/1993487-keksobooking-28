import { getData } from './api.js';
import { setActiveState, setInactiveState, setActiveStateFilters, setInactiveStateFilters } from './states.js';
import { loadMap } from './map.js';
import { setFilters } from './filter.js';
import { setForm } from './form.js';
import { getAlertMessage } from './utils.js';
import { ALERT_MESSAGE } from './constants.js';

setInactiveState();
setInactiveStateFilters();

loadMap()
  .then(() => {
    getData()
      .then((data) => {
        setFilters(data);
        setActiveState();
        setActiveStateFilters();
        setForm();
      }).catch(() => {
        getAlertMessage(ALERT_MESSAGE);
      });
  });
