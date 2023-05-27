import { isEscapeKey } from './utils.js';

const popupSuccess = document.querySelector('#success').content.querySelector('.success');
const popupError = document.querySelector('#error').content.querySelector('.error');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');
const bodyElement = document.querySelector('body');

const popupSuccessMessage = popupSuccess.cloneNode(true);
const popupErrorMessage = popupError.cloneNode(true);

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseModalClick();
  }
};

const onButtonErrorClick = () => {
  errorButton.removeEventListener('click', onButtonErrorClick);
  popupErrorMessage.remove();
};

const showSuccessPopup = () => {
  bodyElement.append(popupSuccessMessage);
  document.addEventListener('keydown', onModalEscKeydown);
  popupSuccessMessage.addEventListener('click', onCloseModalClick);
};

const showErrorPopup = () => {
  bodyElement.append(popupErrorMessage);
  document.addEventListener('keydown', onModalEscKeydown);
  popupErrorMessage.addEventListener('click', onCloseModalClick);
  popupErrorMessage.addEventListener('click', onButtonErrorClick);
};

function onCloseModalClick() {
  document.removeEventListener('keydown', onModalEscKeydown);
  popupSuccessMessage.removeEventListener('click', onCloseModalClick);
  popupSuccessMessage.remove();
  popupErrorMessage.removeEventListener('click', onCloseModalClick);
  popupErrorMessage.remove();
}

export {showSuccessPopup, showErrorPopup};
