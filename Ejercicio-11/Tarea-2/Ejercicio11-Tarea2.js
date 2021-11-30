"use strict";
class Geolocalizacion {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.errores.bind(this));
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
    }

    mostrarDatos() {
        var stringDatos = "<section><h2>Datos de tu posición</h2><p>" + this.mensaje + "<ul>";
        stringDatos += "<li>Longitud: " + this.longitud + "º</li>";
        stringDatos += "<li>Latitud: " + this.latitud + "º</li>";
        stringDatos += "<li>Precisión: " + this.precision + " metros</li>";
        stringDatos += "<li>Altitud: " + this.altitud + "º</li>";
        stringDatos += "<li>Precisión de la altitud: " + this.precisionAltitud + " metros</li>";
        stringDatos += "<li>Rumbo: " + this.rumbo + "º</li>";
        stringDatos += "<li>Velocidad: " + this.velocidad + " m/s</li>";
        stringDatos += "</ul></section>";
        $("h1").after(stringDatos);
        $("input").hide();
    }

    errores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }
}

var ubicacion = new Geolocalizacion();