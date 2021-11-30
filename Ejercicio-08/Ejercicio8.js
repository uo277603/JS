"use strict";
class Meteo {
    constructor() {
        this.apikey = "a8f4d50fbf0f1c8e533adf84fa96a5e3";
        this.ciudad = "";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "";
        this.done = false;
    }

    cargarDatosTodasCiudades() {
        if (!this.done) {
            var ciudades = ["Cangas del Narcea", "Avilés", "Porto", "Langreo", "Ribadeo"];
            var i;
            for (i = 0; i < ciudades.length; i++) {
                this.cargarDatos(ciudades[i], i);
            }
            this.done = true;
        }
    }

    cargarDatos(ciudad) {
        this.ciudad = ciudad;
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.codigoPais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos) {
                var icon = datos.weather[0].icon;
                var stringDatos = "<section><h2>Datos de " + ciudad + "</h2>"
                stringDatos += "<ul><li>Ciudad: " + datos.name + "</li>";
                stringDatos += "<li>País: " + datos.sys.country + "</li>";
                stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                stringDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise * 1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset * 1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                stringDatos += "<li>Hora de la medida: " + new Date(datos.dt * 1000).toLocaleTimeString() + "</li>";
                stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt * 1000).toLocaleDateString() + "</li>";
                stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                stringDatos += "<img src = 'http://openweathermap.org/img/w/" + icon + ".png' alt='Icono del tiempo'/>";
                stringDatos += "<pre>" + JSON.stringify(datos, null, 2) + "</pre></section>";
                $("h1").after(stringDatos);

            },
            error: function() {
                alert("No se ha podido obtener le json");
            }
        });
    }

}
var meteo = new Meteo();