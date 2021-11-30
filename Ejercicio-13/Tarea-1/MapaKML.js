"use strict";
class GestorFicheros {
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

    leerArchivosTexto(files) {
        var archivo = files[0];
        var tipoTexto = /[a-zA-Z]*.kml/;
        var coordinates = new Array();
        if (archivo.name.match(tipoTexto)) {
            var lector = new FileReader();
            lector.onload = function(evento) {
                var bin = evento.target.result;
                var kml = $.parseXML(bin);
                var coordenadas = $('coordinates', kml);
                var locations = new Array();
                for (var i = 0; i < coordenadas.length; i++) {
                    var coord = coordenadas[i].firstChild.nodeValue;
                    locations.push(coord.split(","));
                }
                var posActual = { lat: Number(locations[0][1]), lng: Number(locations[0][0]) };
                var mapaActual = new google.maps.Map(document.getElementById('mapa'), { zoom: 8, center: posActual });
                for (i = 0; i < locations.length; i++) {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(Number(locations[i][1]), Number(locations[i][0])),
                        map: mapaActual
                    });
                }
            }
            lector.readAsText(archivo);

        } else {
            errorArchivo.innerText = "Error";
        }
    }
}


if (window.File && window.FileReader && window.FileList && window.Blob) {} else {
    alert("API File no está soportado por tu navegador");
}

var gestor = new GestorFicheros();