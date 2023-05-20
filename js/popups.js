import { isEscapeKey } from './utils.js';

const popupSuccess = document.querySelector('#success').content.querySelector('.success');
const bodyElement = document.querySelector('body');

const popupSuccessMessage = popupSuccess.cloneNode(true);

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseModalClick();
  }
};

const showSuccessPopup = () => {
  bodyElement.append(popupSuccessMessage);
  document.addEventListener('keydown', onModalEscKeydown);
  popupSuccessMessage.addEventListener('click', onCloseModalClick);

};

function onCloseModalClick() {
  document.removeEventListener('keydown', onModalEscKeydown);
  popupSuccessMessage.removeEventListener('click', onCloseModalClick);
  popupSuccessMessage.remove();
}

export {showSuccessPopup};
