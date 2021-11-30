"use strict";
class CalculadoraRpn {
    constructor() {
        this.pila = new Array();
        this.pantalla = "";
        this.numero = "";
        this.resultado;
        document.addEventListener('keydown', (event) => {
            if (!isNaN(event.key)) {
                this.digitos(event.key);
            }
            if (event.key == '+') {
                this.suma();
            }
            if (event.key == '/') {
                this.division();
            }
            if (event.key == '*') {
                this.multiplicacion();
            }
            if (event.key == '-') {
                this.resta();
            }
            if (event.key == 'Enter') {
                this.push();
            }
            if (event.key == '.') {
                this.digitos(event.key);
            }
            if (event.key == 'Backspace') {
                this.del();
            }
        });

    }

    digitos(value) {
        this.numero += value;
        $("input[value='POP']").attr("value", "DEL");
        $("input[value='DEL']").attr("onclick", "calculadora.del()");
        this.mostrarPila();
    }

    push() {
        let numero = Number(this.numero);
        if (Number.isNaN(numero)) {
            alert("Número incorrecto");
        } else {
            this.pila.push(numero);
            this.numero = "";
            $("input[value='DEL']").attr("value", "POP");
            $("input[value='POP']").attr("onclick", "calculadora.pop()");
            this.mostrarPila();
        }
    }

    suma() {
        this.resultado = (Number(this.pila.pop()) + Number(this.pila.pop()));
        if (Number.isNaN(this.resultado)) {
            alert("No se han introducido al menos dos valores a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }
    }

    resta() {
        let restando = Number(this.pila.pop());
        this.resultado = (Number(this.pila.pop()) - restando);
        if (Number.isNaN(this.resultado)) {
            alert("No se han introducido al menos dos valores a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }
    }

    multiplicacion() {
        this.resultado = (Number(this.pila.pop()) * Number(this.pila.pop()));
        if (Number.isNaN(this.resultado)) {
            alert("No se han introducido al menos dos valores a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }
    }

    division() {
        let denominador = Number(this.pila.pop());
        this.resultado = (Number(this.pila.pop()) / denominador);
        if (Number.isNaN(this.resultado)) {
            alert("No se han introducido al menos dos valores a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }
    }

    sqrt() {
        let value = Number(this.pila.pop());
        this.resultado = Number(Math.sqrt(value));
        if (Number.isNaN(this.resultado)) {
            alert("No se ha introduco ningún valor a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }

    }

    pop() {
        this.pila.pop();
        this.mostrarPila();
    }

    del() {
        this.numero = "";
        $("input[value='DEL']").attr("value", "POP");
        $("input[value='POP']").attr("onclick", "calculadora.pop()");
        this.mostrarPila();
    }

    sin() {
        this.resultado = Math.sin((Number(this.pila.pop())));
        if (Number.isNaN(this.resultado)) {
            alert("No se ha introduco ningún valor a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }
    }

    cos() {
        this.resultado = Math.cos((Number(this.pila.pop())));
        if (Number.isNaN(this.resultado)) {
            alert("No se ha introduco ningún valor a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }
    }

    tan() {
        this.resultado = Math.tan(Number(this.pila.pop()));
        if (Number.isNaN(this.resultado)) {
            alert("No se ha introduco ningún valor a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }
    }

    arcsin() {
        this.resultado = Math.asin(Number(this.pila.pop()));
        if (Number.isNaN(this.resultado)) {
            alert("No se ha introduco ningún valor a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }
    }

    arccos() {
        this.resultado = Math.acos(Number(this.pila.pop()));
        if (Number.isNaN(this.resultado)) {
            alert("No se ha introduco ningún valor a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }
    }

    arctan() {
        this.resultado = Math.atan(Number(this.pila.pop()));
        if (Number.isNaN(this.resultado)) {
            alert("No se ha introduco ningún valor a la pila");
        } else {
            this.pila.push(this.resultado);
            this.mostrarPila();
        }
    }

    mostrarPila() {
        this.pantalla = this.numero + "\n";
        var i;
        for (i = this.pila.length - 1; i >= 0; i--) {
            this.pantalla += this.pila[i] + "\n";
        }
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }
}

var calculadora = new CalculadoraRpn();