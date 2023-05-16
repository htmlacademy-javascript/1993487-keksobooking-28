import { LINK_GET_DATA, LINK_POST_DATA } from './constants.js';

const getData = () =>
  fetch(LINK_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error;
      }
    });

const postData = (body) =>
  fetch(LINK_POST_DATA, {
    method: 'post',
    body
  });

export { getData, postData };

