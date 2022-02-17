var layerHome = L.layerGroup();

var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var grayscale = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1});
var streets = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1,});

var map = L.map('map', {
    center: [40.409314, -3.713379],
    zoom: 6,
    layers: [grayscale, layerHome]
});

var baseLayers = {
    'Grayscale': grayscale,
    'Streets': streets
};

var overlays = {
    'Data': layerHome
};

var overlaysDinamicos = {};

var layerControl = L.control.layers(baseLayers, overlays).addTo(map);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 20,
    attribution: 'Maps GeoJSON &copy; Alejandro Vaquero Toba',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

$.getJSON("./files/dataMap.geojson", function(data){
    L.geoJson(data , {
        pointToLayer: function (feature, latlng) {
            addCities(latlng);
        }
    }).addTo(map);
});

function addCities(latlng) {
    L.circleMarker(latlng, {
        radius: 4,
        fillColor: "#FF0000",
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8, 
    }).bindPopup(latlng.toString()).addTo(overlays["Data"]);
}

function setPopUp(latlng) {
    return 'Lat/Long: ' + latlng;
}