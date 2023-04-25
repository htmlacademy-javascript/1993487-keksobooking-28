const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

const setActiveState = () => {
  adForm.classList.remove('ad-form--disabled');

  adFormFieldsets.forEach((item) => {
    item.disabled = false;
  });
};

const setInactiveState = () => {
  adForm.classList.add('ad-form--disabled');

  adFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
};

export {
  setActiveState,
  setInactiveState
};
