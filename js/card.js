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
