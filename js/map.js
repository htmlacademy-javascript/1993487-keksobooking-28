import { renderCard } from './card.js';

const map = L.map('map-canvas');


const renderMarkers = (points) => {
  points.forEach((point) => {
    const marker = L.marker({
      lat: point.location.lat,
      lng: point.location.lng
    });
    marker.addTo(map).bindPopup(renderCard(point));
  });
};

const loadMap = () => {
  const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const ZOOM = 13;
  const cityCenter = {
    lat: 35.65935818784681,
    lng: 139.78305159450522,
  };

  return new Promise((resolve, reject) => {
    map
      .on('load', () => {
        console.log('Карта инициализирована');
        resolve(true);
      })
      .setView(cityCenter, ZOOM);

    L.tileLayer(TILE_LAYER, {
      attribution: COPYRIGHT
    }).addTo(map);
  });
};

export { loadMap, renderMarkers };
