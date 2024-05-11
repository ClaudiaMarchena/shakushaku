function initMap() {
    var companyCoords = { lat: 41.970413, lng: 2.821268 };
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userCoords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var distancia = calculaDistancia(companyCoords, userCoords);

            document.getElementById('distancia').innerHTML = 
            '<strong class="heading">Distancia a la compañía: ' + distancia.toFixed(2) + ' km</strong>';
        });
    }
}

function calculaDistancia(coord1, coord2) {
    var R = 6371; // Radio de la Tierra en kilómetros
    var dLat = deg2rad(coord2.lat - coord1.lat);
    var dLon = deg2rad(coord2.lng - coord1.lng);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(coord1.lat)) * Math.cos(deg2rad(coord2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

initMap();