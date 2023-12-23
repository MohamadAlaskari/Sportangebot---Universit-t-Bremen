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
}
