import {
  START_LAT,
  START_LNG,
  MARKER_WIDTH,
  MAIN_MARKER_WIDTH,
} from './constants.js';

import { renderCard } from './card.js';

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [MARKER_WIDTH, MARKER_WIDTH],
  iconAnchor: [MARKER_WIDTH / 2, MARKER_WIDTH],
});

const renderMarkers = (points) => {
  markerGroup.clearLayers();
  points.forEach((point) => {
    const marker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
    .addTo(markerGroup)
    .bindPopup(renderCard(point));
  });
};

const loadMap = () => {
  const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const ZOOM = 13;
  const cityCenter = {
    lat: START_LAT,
    lng: START_LNG,
  };

  const createMainPinMarker = () => {
    const mainPinIcon = L.icon({
      iconUrl: 'img/main-pin.svg',
      iconSize: [MAIN_MARKER_WIDTH, MAIN_MARKER_WIDTH],
      iconAnchor: [MAIN_MARKER_WIDTH / 2, MAIN_MARKER_WIDTH],
    });
    return L.marker(cityCenter, {
      draggable: true,
      icon: mainPinIcon,
    });
  };

  const mainPinMarker = createMainPinMarker();

  mainPinMarker.addTo(map);

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