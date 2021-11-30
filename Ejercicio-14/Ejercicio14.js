"use strict";
class Ejercicio14 {
    constructor() {
        this.lector = "none";
        this.svg;
        this.height = 80;
        this.width = 190;
        this.personas;
    }

    leerXml(file) {
        var archivo = file[0];
        this.procesarFichero(archivo);
    }

    drop(event) {
        event.preventDefault(); // evitar que el fichero se abra o se ejecute
        var archivo = event.dataTransfer.items[0].getAsFile(); // selecciona el fichero
        this.procesarFichero(archivo);
    }

    procesarFichero(archivo) {
        if (archivo.type.match("text/xml")) {
            $("main p").html("El archivo se ha cargado correctamente");
            this.lector = new FileReader();
            this.lector.onload = function(evento) {
                evento.target.result;
            }
            this.lector.readAsText(archivo);
        } else {
            $("main p").html("Archvo con formato incorrecto");
        }
    }

    procesarSvg(texto) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(texto, "text/xml");
        this.personas = xmlDoc.getElementsByTagName("persona");
        class Nodo {
            constructor(i) {
                this.info;
                this.dcha;
                this.izda;
                this.index = i;
            }
        }
        var root = new Nodo(0);
        root.dcha = new Nodo(1);
        root.dcha.dcha = new Nodo(2);
        root.dcha.dcha.dcha = new Nodo(3);
        root.dcha.dcha.izda = new Nodo(4);
        root.dcha.izda = new Nodo(5);
        root.dcha.izda.dcha = new Nodo(6);
        root.dcha.izda.izda = new Nodo(7);
        root.izda = new Nodo(8);
        root.izda.izda = new Nodo(12);
        root.izda.izda.izda = new Nodo(14);
        root.izda.izda.dcha = new Nodo(13);
        root.izda.dcha = new Nodo(9);
        root.izda.dcha.dcha = new Nodo(10);
        root.izda.dcha.izda = new Nodo(11);
        this.insertarDatos(root);
        $("input[value='Mostrar SVG']").after("<section></section>");
        var anchura = $("section").width();
        this.svg = "<h2>Representación del SVG</h2><?xml version='1.0' encoding='utf-8'?><svg width = '" + anchura + "' height = '1000' style = 'overflow:visible' version = '1.1' xmlns = 'http://www.w3.org/2000/svg' > ";
        var x = 850;
        var y = 20;

        this.dibujar(root, x, y, x + 10, y + 15, 2);
        this.svg += "</svg>";

        $("section").html(this.svg);
        $("section").after("<input type='button' value='Descargar SVG' onclick='ejercicio14.descargar()'>");
        $("input[value='Mostrar SVG']").prop("disabled", true);
    }

    insertarDatos(nodo) {
        if (nodo != null) {
            nodo.info = this.personas[nodo.index];
            this.insertarDatos(nodo.dcha);
            this.insertarDatos(nodo.izda);
        }
    }

    dibujar(nodo, xR, yR, xT, yT, altura) {
        this.svg += "<rect x='" + xR + "' y='" + yR + "' height='" + this.height + "' width='" + this.width + "'  style='fill:white;stroke:black;stroke-width:2'/>";
        this.svg += "<text x='" + xT + "' y='" + yT + "' font-size='11' style='fill: black'>";
        this.svg += nodo.info.getAttribute("nombre") + " " + nodo.info.getAttribute("apellidos") + "</text>";
        this.svg += "<text x='" + xT + "' y='" + (yT + 20) + "' font-size='11' style='fill: blue'>Fecha nacimiento:</text>";
        this.svg += "<text x='" + xT + "' y='" + (yT + 30) + "' font-size='11' style='fill: black'>"
        this.svg += nodo.info.childNodes[1].childNodes[1].textContent + "</text>";

        this.svg += "<text x='" + xT + "' y='" + (yT + 40) + "' font-size='11' style='fill: blue'>Lugar nacimiento:</text>";
        this.svg += "<text x='" + xT + "' y='" + (yT + 50) + "' font-size='11' style='fill: black'>"
        this.svg += nodo.info.childNodes[1].childNodes[3].textContent + "</text>";

        var xPadre = xR + this.width / 2;
        var yPadre = yR + this.height;
        var y = yR + 300;
        if (altura == 2) {
            this.dibujar(nodo.dcha, xR + 500, yR + 300, xT + 500, yT + 300, ++altura);
            this.dibujar(nodo.izda, xR - 500, yR + 300, xT - 500, yT + 300, altura);
            var xIzda = xR - 500 + this.width / 2;
            var xDcha = xR + 500 + this.width / 2;
            this.svg += "<line x1='" + xPadre + "' y1='" + yPadre + "' x2='" + xIzda + "' y2='" + y + "' style = 'stroke:black; stroke-width:2' ></line>"
            this.svg += "<line x1='" + xPadre + "' y1='" + yPadre + "' x2='" + xDcha + "' y2='" + y + "' style = 'stroke:black; stroke-width:2' ></line>"
        } else if (altura == 3) {
            this.dibujar(nodo.dcha, xR + 200, yR + 300, xT + 200, yT + 300, ++altura);
            this.dibujar(nodo.izda, xR - 200, yR + 300, xT - 200, yT + 300, altura);
            var xIzda = xR - 200 + this.width / 2;
            var xDcha = xR + 200 + this.width / 2;
            this.svg += "<line x1='" + xPadre + "' y1='" + yPadre + "' x2='" + xIzda + "' y2='" + y + "' style = 'stroke:black; stroke-width:2' ></line>"
            this.svg += "<line x1='" + xPadre + "' y1='" + yPadre + "' x2='" + xDcha + "' y2='" + y + "' style = 'stroke:black; stroke-width:2' ></line>"
        } else if (altura == 4) {
            this.dibujar(nodo.dcha, xR + 100, yR + 300, xT + 100, yT + 300, ++altura);
            this.dibujar(nodo.izda, xR - 100, yR + 300, xT - 100, yT + 300, altura);
            var xIzda = xR - 100 + this.width / 2;
            var xDcha = xR + 100 + this.width / 2;
            this.svg += "<line x1='" + xPadre + "' y1='" + yPadre + "' x2='" + xIzda + "' y2='" + y + "' style = 'stroke:black; stroke-width:2' ></line>"
            this.svg += "<line x1='" + xPadre + "' y1='" + yPadre + "' x2='" + xDcha + "' y2='" + y + "' style = 'stroke:black; stroke-width:2' ></line>"
        }
    }

    procesar() {

        if (this.lector == "none") {
            alert("Selecciona primero un fichero")
        } else {
            var texto = this.lector.result;
            this.procesarSvg(texto);
        }
    }

    descargar() {
        var link = document.createElement('a');
        link.download = 'arbol.svg';
        var blob = new Blob([this.svg], { type: 'text/plain' });
        link.href = window.URL.createObjectURL(blob);
        link.click();
    }

    dragover(event) {
        event.preventDefault();
    }
}


var ejercicio14 = new Ejercicio14();