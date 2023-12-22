// Mapbox Access Token
const accessToken = 'pk.eyJ1IjoibWFsYXNrYXJpIiwiYSI6ImNscWY3NnBhZjBreWsybG80aWRudGNzZXcifQ.imp0Xbfmt_kfXqgRrFIv0Q'
mapboxgl.accessToken = accessToken;

// Initialize the Mapbox map with specified parameters
const map = new mapboxgl.Map({
    container: 'map', // ID of the HTML container for the map
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // Map style URL
    center: [8.8017, 53.0793], // Initial Startposition [lng, lat] für Bremen
    zoom: 10 // Initial starting zoom level
});


// Add fullscreen control to the map allowing the user to toggle fullscreen mode
map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('body') }));

// Add zoom and rotation controls to the map for better user interaction
map.addControl(new mapboxgl.NavigationControl());

// Add geolocation control to the map to allow users to find their current location
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true // Request high accuracy location
        },
        trackUserLocation: true // Continuously track the user's location
    }),
    'top-left' // Position of the control on the map
);


// List of addresses with coordinates and descriptions
const addresses = [
    { lngLat: [8.80777, 53.07581], description: 'Gröpelingen' },
    { lngLat: [8.7895, 53.1103], description: 'Walle' },
    { lngLat: [8.8010, 53.0969], description: 'Findorff' },
    { lngLat: [8.6951, 53.0442], description: 'Huchting' },
    { lngLat: [8.8235, 53.0798], description: 'Vahr' },
    { lngLat: [8.8350, 53.0700], description: 'Schwachhausen' },
    { lngLat: [8.8465, 53.0850], description: 'Horn-Lehe' },
    { lngLat: [8.8100, 53.0650], description: 'Neustadt' },
    { lngLat: [8.8300, 53.0550], description: 'Obervieland' },
    { lngLat: [8.8500, 53.0350], description: 'Osterholz' },
    { lngLat: [8.8600, 53.1100], description: 'Burglesum' },
    { lngLat: [8.8700, 53.1200], description: 'Vegesack' },
    { lngLat: [8.8900, 53.0800], description: 'Blumenthal' },
    { lngLat: [8.8800, 53.0500], description: 'Hemelingen' },
    { lngLat: [8.9000, 53.0400], description: 'Östliche Vorstadt' },
    { lngLat: [8.9100, 53.0300], description: 'Mitte' },
    { lngLat: [8.9200, 53.0600], description: 'Blockland' },
    { lngLat: [8.9300, 53.0700], description: 'Bremen-Nord' }
];

// Create a marker and popup for each address
addresses.forEach(function (address) {
    const marker = new mapboxgl.Marker()
        .setLngLat(address.lngLat) // Set marker coordinates
        .addTo(map); // Add marker to the map

    // Create a popup for each marker with a custom class
    const popup = new mapboxgl.Popup({ offset: 25, className: 'custom-popup' })
        .setText(address.description); // Set the text content of the popup
    marker.setPopup(popup); // Attach popup to the marker
});



// Circle radius functionality
let currentRadius = 20;
let currentCircle;

// Function to update the circle on the map based on given coordinates and radius
function updateCircle(coordinates, radius) {
    // Check if there's already a circle on the map and remove it if there is
    if (currentCircle) {
        map.removeLayer('circle-layer');
        map.removeSource('circle-source');
    }

    // Add a new source for the circle with GeoJSON data
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

    // Add a new layer to the map using the circle source
    map.addLayer({
        'id': 'circle-layer',
        'type': 'circle',
        'source': 'circle-source',
        'paint': {
            'circle-radius': radius,    // Set the circle's radius
            'circle-color': 'red',  // Set the circle's color
            'circle-opacity': 0.5   // Set the circle's opacity 
        }
    });

    // Update the currentCircle flag to indicate a circle is currently displayed
    currentCircle = true;
}

map.on('click', function (e) {
    updateCircle(e.lngLat, currentRadius);
});

document.getElementById('radiusInput').addEventListener('input', function () {
    // Update the current radius based on the value from the radius input field
    // 'input' event fires immediately when the value of the input field changes
    currentRadius = parseInt(this.value);
});
