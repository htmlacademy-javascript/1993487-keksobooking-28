import { getData } from './api.js';
import { renderCard } from './card.js';

getData()
  .then((data) => {
    console.log(data);
    renderCard(data[1]);
  })
  .catch();
