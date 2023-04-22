import { LINK_GET_DATA } from './constants.js';

const getData = () =>
  fetch(LINK_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error;
      }
    });

export { getData };
