"use strict";
class MapaDinamico {
    constructor() {}
    initMap() {
        var oviedo = { lat: 43.36099251919698, lng: -5.862656880348787 };
        var mapaOviedo = new google.maps.Map(document.getElementById('mapa'), { zoom: 8, center: oviedo });
        var marcador = new google.maps.Marker({ position: oviedo, map: mapaOviedo });
    }
}

var ubicacion = new MapaDinamico();