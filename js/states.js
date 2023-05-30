const userFormElement = document.querySelector('.ad-form');
const userFormFieldsetElement = userFormElement.querySelectorAll('fieldset');
const filtersFormElement = document.querySelector ('.map__filters');
const fitersFormSelectElement = filtersFormElement.querySelectorAll('select');

const setActiveState = () => {
  userFormElement.classList.remove('ad-form--disabled');

  userFormFieldsetElement.forEach((item) => {
    item.disabled = false;
  });
};

const setInactiveState = () => {
  userFormElement.classList.add('ad-form--disabled');

  userFormFieldsetElement.forEach((element) => {
    element.disabled = true;
  });
};

const setActiveStateFilters = () => {
  filtersFormElement.classList.remove('ad-form--disabled');

  fitersFormSelectElement.forEach((element) => {
    element.disabled = false;
  });
};

const setInactiveStateFilters = () => {
  filtersFormElement.classList.add('ad-form--disabled');

  fitersFormSelectElement.forEach((element) => {
    element.disabled = true;
  });
};

export {
  setActiveStateFilters,
  setInactiveStateFilters,
  setActiveState,
  setInactiveState
};
