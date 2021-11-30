"use strict";
class GestorFicheros {
    constructor() {

    }

    leerArchivosTexto(files) {
        for (let i = 0; i < files.length; i++) {
            this.leerArchivo(files[i], i);
        }

    }

    leerArchivo(archivo, pos) {
        var stringDatos = "<section><h2>Archivo" + pos + "</h2>";
        stringDatos += "<p>Nombre del archivo: " + archivo.name + "</p>";
        stringDatos += "<p>Tamaño del archivo: " + archivo.size + " bytes</p>";
        stringDatos += "<p>Tipo del archivo: " + archivo.type + "</p>";
        stringDatos += "<p>Fecha de la última modificación: " + archivo.lastModifiedDate + "</p>";
        stringDatos += "<pre id='contenido" + pos + "'>Contenido del archivo de texto:";
        var tipoTexto = /text.*/;
        var json = /[*.json]/;
        if (archivo.type.match(tipoTexto) || archivo.type.match(json)) {
            var lector = new FileReader();
            lector.onload = function(evento) {
                var bin = evento.target.result;
                $("#contenido" + pos).text(lector.result);
            }
            lector.readAsText(archivo);

        } else {
            alert("Archivo no válido");
        }
        stringDatos += "</pre></section>";
        $("input").after(stringDatos);
    }
}

if (window.File && window.FileReader && window.FileList && window.Blob) {} else {
    alert('API File no está soportado por tu navegador');
}

var gestor = new GestorFicheros();