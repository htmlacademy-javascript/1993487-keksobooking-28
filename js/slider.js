const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100050,
  },
  start: 8000,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (...rest) => {
  console.log(rest);
  priceElement.value = sliderElement.noUiSlider.get();
});

priceElement.addEventListener('input', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
});
