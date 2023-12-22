export function addMarkers(map) {


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

}