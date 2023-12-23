import { MAPBOX_ACCESS_TOKEN, DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from './utilis/constants.js';

export function initializeMap(containerId) {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
        container: containerId,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: DEFAULT_MAP_CENTER,
        zoom: DEFAULT_MAP_ZOOM
    });
    return map;
}
