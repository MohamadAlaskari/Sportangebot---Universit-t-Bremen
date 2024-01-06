
let currentCircleCenter = null;
let currentCircleRadius = 10000;

let currentCircle;

function metersToPixelsAtMaxZoom(meters, latitude, map) {
    const earthCircumference = 40075017; // Umfang der Erde in Metern
    const latitudeRadians = latitude * (Math.PI / 180); // Umrechnung von Grad in Radianten
    const metersPerPx = (earthCircumference * Math.cos(latitudeRadians)) / Math.pow(2, map.getZoom() + 8);
    return meters / metersPerPx;
}


export function addCircleControl(map, addresses) {
    map.on('click', function (e) {
        updateCircle(map, e.lngLat, currentCircleRadius, addresses);
    });

    map.on('zoomend', function () {
        if (currentCircleCenter) {
            updateCircle(map, currentCircleCenter, currentCircleRadius, addresses);
        }
    });

    document.getElementById('radiusInput').addEventListener('input', function () {
        currentCircleRadius = parseInt(this.value) * 1000;
        if (currentCircleCenter) {
            updateCircle(map, currentCircleCenter, currentCircleRadius, addresses);
        }
    });
}


function updateCircle(map, coordinates, radiusInMeters, addresses) {
    // Überprüfen, ob der Layer und die Quelle existieren, bevor sie entfernt werden
    if (map.getLayer('circle-layer')) {
        map.removeLayer('circle-layer');
    }
    if (map.getSource('circle-source')) {
        map.removeSource('circle-source');
    }

    // Hinzufügen einer neuen Quelle für den Kreis
    map.addSource('circle-source', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [coordinates.lng, coordinates.lat]
            }
        }
    });

    // Hinzufügen des Kreises als neue Ebene
    const pixelRadius = metersToPixelsAtMaxZoom(radiusInMeters, coordinates.lat, map);
    map.addLayer({
        'id': 'circle-layer',
        'type': 'circle',
        'source': 'circle-source',
        'paint': {
            'circle-radius': pixelRadius,
            'circle-color': 'red',
            'circle-opacity': 0.5
        }
    });

    // Aktualisieren der Variablen für das Kreiszentrum und den Radius
    currentCircle = true;
    currentCircleCenter = coordinates;
    currentCircleRadius = radiusInMeters;

    // Konsolenausgaben für Debugging-Zwecke
    //console.log("Kreiszentrum:", currentCircleCenter);
    //console.log("Radius (Pixel):", pixelRadius);

    // Finden und Loggen der Adressen im Kreis
    const addressesInCircle = findAddressesInCircle(addresses);
   // console.log('Adressen im Kreis: ', addressesInCircle);
}



// Neue Funktion, um Adressen im Kreis zu finden
function findAddressesInCircle(addresses) {

    if (!currentCircleCenter) return addresses;

    const addressesInCircle = addresses.filter((address) => {
        const from = turf.point([currentCircleCenter.lng, currentCircleCenter.lat]);
        const to = turf.point(address.lnglat);
        const distance = turf.distance(from, to, { units: 'kilometers' });

        //console.log(`Distanz zu ${address.ort}:`, distance);

        return distance <= currentCircleRadius / 1000; // change from km to m
    });
    return addressesInCircle;
}