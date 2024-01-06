import { initializeMap } from './src/mapInitialization.js';
import { addMapControls } from './src/controls/mapControls.js';
import { addFullscreenControl } from './src/controls/fullscreenControl.js';
import { addGeolocateControl } from './src/controls/geolocateControl.js';
import { addMarkers } from './src/markers.js';
import { addCircleControl,findAddressesInCircle } from './src/circleControl.js';

const map = (addresses) => {

    const map = initializeMap('map');
    addFullscreenControl(map);
    addMapControls(map);
    addGeolocateControl(map);
    addMarkers(map, addresses);
    addCircleControl(map);
    const addressesInCircle = findAddressesInCircle(addresses);
    console.log('addressesInCircle: ',addressesInCircle )

}
export { map }