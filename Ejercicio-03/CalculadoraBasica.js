"use strict";
class CalculadoraBasica {
    constructor() {
        this.pantalla = "";
        this.operacion = "";
        this.operadores = new Array();
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
            if (event.key == '=' || event.key == 'Enter') {
                this.igual();
            }
            if (event.key == '.') {
                this.punto();
            }
            if (event.key == 'Backspace') {
                this.borrarUltimo();
            }
        });
    }

    digitos(param) {
        this.operacion += param;
        this.pantalla += param;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    punto() {
        this.operacion += ".";
        this.pantalla += ".";
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    suma() {
        this.operacion += "+";
        this.operadores.push("+");
        this.pantalla += "+";
        document.getElementsByName("pantalla")[0].value += "+";
    }

    resta() {
        this.operacion += "-";
        this.operadores.push("-");
        this.pantalla += "-";
        document.getElementsByName("pantalla")[0].value += "-";
    }

    multiplicacion() {
        this.operacion += "*";
        this.operadores.push("*");
        this.pantalla += "*";
        document.getElementsByName("pantalla")[0].value += "*";
    }

    division() {
        this.operacion += "/";
        this.operadores.push("/");
        this.pantalla += "/";
        document.getElementsByName("pantalla")[0].value += "/";
    }

    mrc() {
        this.pantalla = this.memory;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    mMenos() {
        var memoria = this.memory;
        this.igual();
        var operando = this.memory;
        this.memory = new Number(memoria - operando);
    }

    mMas() {
        var memoria = this.memory;
        this.igual();
        var operando = this.memory;
        this.memory = new Number(memoria + operando);
    }

    borrar() {
        this.operacion = "";
        this.pantalla = "";
        this.operadores = new Array();
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    borrarUltimo() {
        let data = this.operacion[this.operacion.length - 1];
        this.operacion = this.operacion.substring(0, this.operacion.length - 1);
        this.pantalla = this.pantalla.substring(0, this.pantalla.length - 1);
        if (data.match(/[\+\*\/\-\%\^]/)) {
            this.operadores.pop();
        }
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    igual() {
        let operandos = this.operacion.split(/[\+\*\/\-]/);
        let resultado = "";
        for (let i = 0; i < operandos.length; i++) {
            if (operandos[i].length > 0)
                resultado += new Number(operandos[i]) + "";
            if (this.operadores[i] != null)
                resultado += this.operadores[i];
        }
        try {
            var total = eval(resultado);
            if (total == Infinity) {
                document.getElementsByName("pantalla")[0].value = "No se puede dividir entre cero";
            } else {
                this.result = new Number(total);
                this.reset();
                if (this.result < 0) {
                    this.operadores.push("-");
                }
                document.getElementsByName("pantalla")[0].value = this.result;
            }
        } catch (err) {
            this.reset();
            document.getElementsByName("pantalla")[0].value = "Syntax Error";
        }
    }

    reset() {
        this.pantalla = "";
        this.operacion = "";
        this.operadores = new Array();
    }
}

var calculadora = new CalculadoraBasica();