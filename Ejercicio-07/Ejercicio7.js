"use strict";
class Ejercicio7 {
    constructor() {
        this.parrafos = true;
        this.h1 = true;
        this.h2 = true;
        this.h3 = true;
        this.listas = true;
    }

    ocultarMostrarParrafos() {
        if (this.parrafos) {
            $("p").hide();
            $("input[value='Ocultar párrafos']").attr('value', 'Mostrar párrafos');
            this.parrafos = false;
        } else {
            $("p").show();
            $("input[value='Mostrar párrafos']").attr('value', 'Ocultar párrafos');
            this.parrafos = true;
        }
    }

    ocultarMostrarh1() {
        if (this.h1) {
            $("h1").hide();
            $("input[value='Ocultar h1']").attr('value', 'Mostrar h1');
            this.h1 = false;
        } else {
            $("h1").show();
            $("input[value='Mostrar h1']").attr('value', 'Ocultar h1');
            this.h1 = true;
        }
    }

    ocultarMostrarh2() {
        if (this.h2) {
            $("h2").hide();
            $("input[value='Ocultar h2']").attr('value', 'Mostrar h2');
            this.h2 = false;
        } else {
            $("h2").show();
            $("input[value='Mostrar h2']").attr('value', 'Ocultar h2');
            this.h2 = true;
        }
    }

    ocultarMostrarh3() {
        if (this.h3) {
            $("h3").hide();
            $("input[value='Ocultar h3']").attr('value', 'Mostrar h3');
            this.h3 = false;
        } else {
            $("h3").show();
            $("input[value='Mostrar h3']").attr('value', 'Ocultar h3');
            this.h3 = true;
        }
    }

    ocultarMostrarListas() {
        if (this.listas) {
            $("li").hide();
            $("input[value='Ocultar listas']").attr('value', 'Mostrar listas');
            this.listas = false;
        } else {
            $("li").show();
            $("input[value='Mostrar listas']").attr('value', 'Ocultar listas');
            this.listas = true;
        }
    }

    cambiarHTML() {
        $("body > h1").text("HTML");
        $("body>p:first-of-type").text("HTML, siglas en inglés de HyperText Markup Language (‘lenguaje de marcado de hipertexto’), hace referencia al lenguaje de marcado para la elaboración de páginas web.");
        $("a").html("HTML");
        $("a").attr('href', 'https://es.wikipedia.org/wiki/HTML');
        $("p:nth-child(5n)").text("Tim Berners-Lee (TBL) en 19912​3​ describe 18 elementos que incluyen el diseño inicial y relativamente simple de HTML. Trece de estos elementos todavía existen en HTML 4");
        $("p:nth-child(7n)").text("A continuación dos versiones de HTML:");
        $("li:first-of-type").text("HTML 4");
        $("li:nth-child(2n)").text("HTML 5");
    }

    cambiarXML() {
        $("body > h1").text("XML");
        $("body>p:first-of-type").text("XML es un lenguaje de marcado que define una serie de reglas para transmitir información de la forma que tanto una máquina como un humano lo entiendan.");
        $("a").html("W3C");
        $("a").attr('href', 'https://www.w3.org/TR/xml/');
        $("p:nth-child(5n)").text("El XML proviene de un lenguaje que inventó IBM allá por los años 70. El lenguaje de IBM se llama GML (General Markup Language) y surgió por la necesidad que tenían en la empresa de almacenar grandes cantidades de información de temas diversos.");
        $("p:nth-child(7n)").text("Actualmente coexisten las siguientes versiones de XML:");
        $("li:first-of-type").text("XML 1.0 (Fith Edition), W3C Recommendation 26 November 2008");
        $("li:nth-child(2n)").text("XML 1.1 (Second Edition), W3C Recommendation 16 August 2006");
    }

    añadirh2() {
        $('h2:first-of-type').before("<h2>Nuevo título 2</h2>");
    }

    añadirVersion() {
        $("li:nth-child(2n)").after("<li>Nueva versión</li>");
    }

    eliminarTitulos() {
        $("h1").remove();
        $("h2").remove();
        $("h3").remove();
    }

    eliminarVersiones() {
        $("li").remove();
    }

    eliminarParrafos() {
        $("p").remove();
    }

    recorrerArbolDom() {
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode("Etiqueta padre : <" + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName + "> valor: "));
        });
    }

    sumarFilasColumnas() {
        let filas = 0;
        let columnas = 0;
        $("table tr").each(function() {
            filas++;
            columnas = 0;
            $(this).children("td").each(function() {
                columnas++;
            })
        });
        $("table").after("<p>Número de filas: " + filas);
        $("table").after("<p>Número de columnas: " + columnas);
        $("input[value='Sumar filas y columnas'").prop("disabled", "true");
    }
}

var ejercicio7 = new Ejercicio7();