export function addFullscreenControl(map) {
    map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector('body') }));
}
