"use strict";
class MapaDinamico {
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
        var posActual = { lat: this.latitud, lng: this.longitud };
        var mapaActual = new google.maps.Map(document.getElementById('mapa'), { zoom: 8, center: posActual });
        var marcador = new google.maps.Marker({ position: posActual, map: mapaActual });
    }

    getLongitud() {
        return this.longitud;
    }

    getLatitud() {
        return this.latitud;
    }

}

var ubicacion = new MapaDinamico();