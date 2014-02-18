//initialize map using coUrbanize's snow route tiles, set view on Boston
    var map = L.mapbox.map('map', 'courbanize.h2p5cm9m')
    .setView([42.3150, -71.1025], 12); 

    //add Mapbox's geolocation controls
    L.control.locate({
       setView: true, 
       locateOptions: { maxZoom: 17 } }).addTo(map);


var geolocate = document.getElementById('locateme');

// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
//
// See this chart of compatibility for details:
// http://caniuse.com/#feat=geolocation
if (!navigator.geolocation) {
    geolocate.innerHTML = 'geolocation is not available';
} else {
    geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation(); 
        map.locate();
    };
}

// Once we've got a position, zoom and center the map
// on it, and add a single marker, and make the overlay go away.
map.on('locationfound', function(e) {
    map.fitBounds(e.bounds);
    map.setZoom(17);

    map.featureLayer.setGeoJSON({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'marker-color': '#000',
            'marker-symbol': 'star-stroked'
        }
    });

    //make the overlay disappear
    el = document.getElementById("overlay");
    el.style.visibility =  "hidden";
});

// If the user chooses not to allow their location to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = 'position could not be found';
});