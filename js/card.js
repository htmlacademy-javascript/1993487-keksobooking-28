const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapContainer = document.querySelector('#map-canvas');

const renderPopup = (popupElement, offer) => {
  popupElement.querySelector('.popup__title').textContent = offer.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = offer.offer.type;
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  popupElement.querySelector('.popup__description').textContent = offer.offer.description;

  if (offer.offer.features) {
    popupElement.querySelector('.popup__features').innerHTML =
      offer.offer.features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join('');
  } else {
    popupElement.querySelector('.popup__features').remove();
  }

  if (offer.offer.photos) {
    popupElement.querySelector('.popup__photos').innerHTML =
      offer.offer.photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('');
  } else {
    popupElement.querySelector('.popup__photos').remove();
  }

};


const showPopup = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  renderPopup(cardElement, data);
  mapContainer.append(cardElement);
};

const renderCard = (offer) => {
  showPopup(offer);
};

export { renderCard };
