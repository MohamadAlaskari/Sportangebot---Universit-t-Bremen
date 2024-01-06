
let currentCircleCenter = null;
let currentCircleRadius = 60;

let currentRadius = 60;
let currentCircle;

export function addCircleControl(map) {
    map.on('click', function(e) {
        updateCircle(map, e.lngLat, currentRadius);
    });

    document.getElementById('radiusInput').addEventListener('input', function() {
        currentRadius = parseInt(this.value);
    });
}

function updateCircle(map, coordinates, radius) {
    if (currentCircle) {
        map.removeLayer('circle-layer');
        map.removeSource('circle-source');
    }

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

    map.addLayer({
        'id': 'circle-layer',
        'type': 'circle',
        'source': 'circle-source',
        'paint': {
            'circle-radius': radius,
            'circle-color': 'red',
            'circle-opacity': 0.5
        }
    });

    currentCircle = true;

     // Speichern des Mittelpunkts und des Radius
     currentCircleCenter = coordinates;
     currentCircleRadius = radius;
}


// Neue Funktion, um Adressen im Kreis zu finden
export function findAddressesInCircle(addresses) {
    if (!currentCircleCenter) return [];

    const addressesInCircle = addresses.filter((address) => {
        const from = turf.point([currentCircleCenter.lng, currentCircleCenter.lat]);
        const to = turf.point(address.lngLat);
        const distance = turf.distance(from, to, { units: 'kilometers' });

        return distance <= currentCircleRadius / 1000; // Radius in Kilometern
    });

    return addressesInCircle;
}