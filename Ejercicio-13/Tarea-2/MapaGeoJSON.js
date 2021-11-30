"use strict";
class GeoJson {
    constructor() {}

    initMap() {
        var oviedo = { lat: 43.36099251919698, lng: -5.862656880348787 };
        var mapaOviedo = new google.maps.Map(document.getElementById('mapa'), { zoom: 8, center: oviedo });
        var marcador = new google.maps.Marker({ position: oviedo, map: mapaOviedo });
    }

    leerArchivosTexto(file) {
        var archivo = file[0];

        var lector = new FileReader();
        lector.onload = function(evento) {
            var texto = evento.target.result;
            var posActual = { lat: 43.5463324, lng: -5.432546 };
            var mapaActual = new google.maps.Map(document.getElementById('mapa'), { zoom: 8, center: posActual });
            mapaActual.data.addGeoJson(JSON.parse(texto));

            console.log(txt);
        }
        lector.readAsText(archivo);
    }

}


var gestor = new GeoJson();