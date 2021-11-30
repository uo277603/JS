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
        this.mostrarPila();
    }

    push() {
        this.pila.push(Number(this.numero));
        this.numero = "";
        this.mostrarPila();

    }

    suma() {
        this.resultado = (Number(this.pila.pop()) + Number(this.pila.pop()));
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    resta() {
        let restando = Number(this.pila.pop());
        this.resultado = (Number(this.pila.pop()) - restando);
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    multiplicacion() {
        this.resultado = (Number(this.pila.pop()) * Number(this.pila.pop()));
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    division() {
        let denominador = Number(this.pila.pop());
        this.resultado = (Number(this.pila.pop()) / denominador);
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    pop() {
        this.pila.pop();
        this.mostrarPila();
    }

    del() {
        this.numero = "";
        this.mostrarPila();
    }

    sin() {
        this.resultado = Math.sin((Number(this.pila.pop())));
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    cos() {
        this.resultado = Math.cos((Number(this.pila.pop())));
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    tan() {
        this.resultado = Math.tan(Number(this.pila.pop()));
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    arcsin() {
        this.resultado = Math.asin(Number(this.pila.pop()));
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    arccos() {
        this.resultado = Math.acos(Number(this.pila.pop()));
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    arctan() {
        this.resultado = Math.atan(Number(this.pila.pop()));
        this.pila.push(this.resultado);
        this.mostrarPila();
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

class CalculadoraEspecializada extends CalculadoraRpn {

    constructor() {
        super();
        this.pilaString = new Array();

    }

    x() {
        this.pila.push(function f(x) { return x });
        this.pilaString.push("x");
        this.mostrarPila();

    }

    xCuadrado() {
        this.pila.push(function f(x) { return Math.pow(x, 2) });
        this.pilaString.push("x²");
        this.mostrarPila();
    }

    pop() {
        this.pila.pop();
        this.pilaString.pop();
        this.mostrarPila();
    }

    sin() {
        let op = this.pila.pop();
        this.resultado = function f(x) { return Math.sin(op(x)) };
        this.pilaString.push("sin(" + this.pilaString.pop() + ")");
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    cos() {
        let op = this.pila.pop();
        this.resultado = function f(x) { return Math.cos(op(x)) };
        this.pilaString.push("cos(" + this.pilaString.pop() + ")");
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    tan() {
        let op = this.pila.pop();
        this.resultado = function f(x) { return Math.tan(op(x)) };
        this.pilaString.push("tan(" + this.pilaString.pop() + ")");
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    arcsin() {
        let op = this.pila.pop();
        this.resultado = function f(x) { return Math.asin(op(x)) };
        this.pilaString.push("asin(" + this.pilaString.pop() + ")");
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    arccos() {
        let op = this.pila.pop();
        this.resultado = function f(x) { return Math.acos(op(x)) };
        this.pilaString.push("acos(" + this.pilaString.pop() + ")");
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    arctan() {
        let op = this.pila.pop();
        this.resultado = function f(x) { return Math.atan(op(x)) };
        this.pilaString.push("atan(" + this.pilaString.pop() + ")");
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    suma() {
        let op1 = this.pila.pop();
        let op2 = this.pila.pop();
        this.resultado = function f(x) { return op1(x) + op2(x) };
        this.pilaString.push(this.pilaString.pop() + "+" + this.pilaString.pop());
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    resta() {
        let op1 = this.pila.pop();
        let op2 = this.pila.pop();
        this.resultado = function f(x) { return op1(x) - op2(x) };
        this.pilaString.push(this.pilaString.pop() + "-" + this.pilaString.pop());
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    multiplicacion() {
        let op1 = this.pila.pop();
        let op2 = this.pila.pop();
        this.resultado = function f(x) { return op1(x) * op2(x) };
        this.pilaString.push(this.pilaString.pop() + "*" + this.pilaString.pop());
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    division() {
        let op1 = this.pila.pop();
        let op2 = this.pila.pop();
        this.resultado = function f(x) { return op2(x) / op1(x) };
        let op2String = this.pilaString.pop();
        this.pilaString.push(this.pilaString.pop() + "/" + op2String);
        this.pila.push(this.resultado);
        this.mostrarPila();
    }

    derivate() {
        let value = Number(this.pila.pop()(1));
        let funcion = this.pila.pop();
        this.pilaString.pop();
        this.pilaString.pop();
        this.resultado = this.derivadaCentrada(funcion)(value);
        this.pila.push(this.resultado);
        this.pilaString.push(this.resultado + "");
        this.mostrarPila();
    }

    integrate() {
        let b = Number(this.pila.pop()(1));
        let a = Number(this.pila.pop()(1));
        let funcion = this.pila.pop();
        this.pilaString.pop();
        this.pilaString.pop();
        this.pilaString.pop();
        this.resultado = (b - a) * funcion((a + b) / 2); //integración por el metodo del punto medio
        this.pila.push(this.resultado);
        this.pilaString.push(this.resultado + "");
        this.mostrarPila();
    }

    derivadaCentrada(f) {
        var h = 0.001;
        return function(x) { return (f(x + h) - f(x - h)) / (2 * h); };
    }

    mostrarPila() {
        this.pantalla = this.numero + "\n";
        var i;
        for (i = this.pilaString.length - 1; i >= 0; i--) {
            this.pantalla += this.pilaString[i] + "\n";
        }
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    sumatorio() {
        let b = Number(this.pila.pop()(1));
        let a = Number(this.pila.pop()(1));
        let funcion = this.pila.pop();
        this.pilaString.pop();
        this.pilaString.pop();
        this.pilaString.pop();
        this.resultado = this.ejecutarSumatorio(funcion, a, b);
        this.pila.push(this.resultado);
        this.pilaString.push(this.resultado + "");
        this.mostrarPila();
    }

    ejecutarSumatorio(f, a, b) {
        var total = 0;
        for (a; a <= b; a++) {
            total += f(a);
        }
        return total
    }

}

var calculadora = new CalculadoraEspecializada();