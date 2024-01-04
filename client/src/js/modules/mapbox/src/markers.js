export function addMarkers(map, addresses) {

    // Create a marker and popup for each address
    addresses.forEach(function (address) {
        const marker = new mapboxgl.Marker()
            .setLngLat(address.lnglat) // Set marker coordinates
            .addTo(map); // Add marker to the map

        // Create a popup for each marker with a custom class
        const popup = new mapboxgl.Popup({ offset: 25, className: 'custom-popup' })
            .setText(address.ort); // Set the text content of the popup
        marker.setPopup(popup); // Attach popup to the marker
    });

}