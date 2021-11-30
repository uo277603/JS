"use strict";
class Geolocalizacion {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }

    getPosicion(posicion) {
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;
        this.mensaje = "Se ha obtenido correctamente la ubicación"
        var posActual = { lat: this.latitud, lng: this.longitud };
        var mapaActual = new google.maps.Map(document.getElementById('mapa'), { zoom: 8, center: posActual });
        var marcador = new google.maps.Marker({ position: posActual, map: mapaActual });
    }

    buscar() {
        var address = $("input[type='text']").val();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, this.geocodeResult);
    }

    geocodeResult(results, status) {
        if (status == 'OK') {
            var mapConf = { // Repintar el mapa
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map($("#mapa").get(0), mapConf);
            map.fitBounds(results[0].geometry.viewport); // hace zoom
            var markerConf = { position: results[0].geometry.location }
            var marker = new google.maps.Marker(markerConf);
            marker.setMap(map);
        } else {
            alert("Geocoding no tuvo éxito debido a: " + status);
        }
    }

}

var ubicacion = new Geolocalizacion();