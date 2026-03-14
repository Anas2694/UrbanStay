mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 9
});

// Create popup
const popup = new mapboxgl.Popup({ offset: 25 })
.setHTML(
    `<h6>${listingTitle}</h6>
     <p>Exact location will be provided after booking</p>`
);

// Create marker
new mapboxgl.Marker({ color: "red" })
.setLngLat(coordinates)
.setPopup(popup)
.addTo(map);