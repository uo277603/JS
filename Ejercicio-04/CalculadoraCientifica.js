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
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    resta() {
        this.operacion += "-";
        this.operadores.push("-");
        this.pantalla += "-";
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    multiplicacion() {
        this.operacion += "*";
        this.operadores.push("*");
        this.pantalla += "*";
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    division() {
        this.operacion += "/";
        this.operadores.push("/");
        this.pantalla += "/";
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    mrc() {
        this.pantalla = this.memory;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    mMenos() {
        var memoria = this.memory;
        if (isNaN(memoria))
            memoria = 0;
        this.igual();
        var operando = this.result;
        this.memory = new Number(memoria - operando);
    }

    mMas() {
        var memoria = this.memory;
        if (isNaN(memoria))
            memoria = 0;
        this.igual();
        var operando = this.result;
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

class CalculadoraCientifica extends CalculadoraBasica {

    constructor() {
        super();
        this.trigonometria = false;
        this.mode = "normal";
        this.shiftMode = false;
        this.grados = false;
        this.log = false;
        this.opRaiz = false;
        this.result;
    }

    rad() {
        if (this.grados) {
            this.grados = false;
            document.querySelector("aside input").setAttribute("value", "RAD");
        } else {
            this.grados = true;
            document.querySelector("aside input").setAttribute("value", "DEG");
        }
    }

    pi() {
        this.operacion += Math.PI;
        this.pantalla += "π";
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    e() {
        this.operacion += Math.E;
        this.pantalla += "e";
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }


    alCuadrado() {
        this.igual();
        this.result = new Number(Math.pow(this.result, 2));
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;

    }

    alCubo() {
        this.igual();
        this.result = new Number(Math.pow(this.result, 3));
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    potencia() {
        this.operacion += "^";
        this.operadores.push("^");
        this.pantalla += "^";
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    seno() {
        this.igual();
        this.result = new Number(Math.sin(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    arcsin() {
        this.igual();
        this.result = new Number(Math.asin(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    coseno() {
        this.igual();
        this.result = new Number(Math.cos(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arccos() {
        this.igual();
        this.result = new Number(Math.acos(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    tangente() {
        this.igual();
        this.result = new Number(Math.tan(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arctan() {
        this.igual();
        this.result = new Number(Math.atan(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    sec() {
        this.igual();
        this.result = new Number(1 / Math.cos(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    csc() {
        this.igual();
        this.result = new Number(1 / Math.sin(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    cot() {
        this.igual();
        this.result = new Number(1 / Math.tan(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arcsec() {
        this.igual();
        this.result = new Number((Math.PI / 2) - Math.asin(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arccsc() {
        this.igual();
        this.result = new Number(Math.asin(1 / this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arccot() {
        this.igual();
        this.result = new Number((Math.PI / 2) - Math.atan(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    senh() {
        this.igual();
        this.result = new Number(Math.sinh(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    cosh() {
        this.igual();
        this.result = new Number(Math.cosh(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    tanh() {
        this.igual();
        this.result = new Number(Math.tanh(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arcsinh() {
        this.igual();
        this.result = new Number(Math.arcsinh(this.result));
        if (this.grados)
            this.result = new Number((Math.PI / 180) * this.result);
        if (isNaN(this.result))
            this.error();
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arccosh() {
        this.igual();
        this.result = new Number(Math.acosh(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arctanh() {
        this.igual();
        this.result = new Number(Math.atanh(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    coth() {
        this.igual();
        this.result = new Number(Math.cosh(this.result / Math.senh(this.result)));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    sech() {
        this.igual();
        this.result = new Number(1 / Math.cosh(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    csch() {
        this.igual();
        this.result = new Number(1 / Math.sinh(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arcsech() {
        this.igual();
        this.result = new Number(Math.acosh(1 / this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arccsch() {
        this.igual();
        this.result = new Number(1 / Math.asinh(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    arccoth() {
        this.igual();
        this.result = new Number(1 / Math.atanh(this.result));
        if (this.grados) {
            this.result = new Number((Math.PI / 180) * this.result);
        }
        if (isNaN(this.result))
            this.error();
        else {
            this.reset();
            document.getElementsByName("pantalla")[0].value = this.result;
        }
    }

    sqrt() {
        this.igual();
        this.result = new Number(Math.sqrt(this.result));
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    cubicrt() {
        this.igual();
        this.result = new Number(Math.cbrt(this.result));
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    raiz() {
        if (!this.opRaiz) {
            this.igual();
            this.operacion = this.result + "√";
            this.pantalla = this.operacion;
            document.getElementsByName("pantalla")[0].value = this.pantalla;
            this.opRaiz = true;
        }
    }

    ln() {
        this.igual();
        this.result = new Number(Math.log(this.result));
        this.operacion = this.result + "";
        this.pantalla = this.result + "";
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    log() {
        this.igual()
        this.result = this.getBaseLog(10, this.result);
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    baselog() {
        if (!this.log) {
            this.igual();
            this.operacion = this.result + " log base ";
            this.pantalla = this.operacion;
            document.getElementsByName("pantalla")[0].value = this.pantalla;
            this.log = true;
        }
    }

    getBaseLog(x, y) {
        return new Number(Math.log(y) / Math.log(x));
    }

    exp() {
        this.igual();
        this.result = new Number(Math.exp(this.result));
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    mod() {
        this.operacion += "%";
        this.operadores.push("%");
        this.pantalla += "%";
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    fact() {
        this.igual();
        this.result = new Number(this.factorial(this.result));
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    parentesis(value) {
        this.operacion += value;
        this.operadores.push(value);
        this.pantalla += value;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    ms() {
        this.igual();
        this.memory = new Number(this.result);
    }

    mr() {
        this.pantalla = this.memory;
        if (this.pantalla == undefined) {
            this.pantalla = "";
            document.getElementsByName("pantalla")[0].value = "";
        } else {
            this.operacion = new Number(this.memory) + "";
            document.getElementsByName("pantalla")[0].value = this.pantalla;
        }
    }

    mc() {
        this.memory = "";
    }

    exp10() {
        this.igual();
        this.result = new Number(Math.pow(10, this.result));
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    exp2() {
        this.igual();
        this.result = new Number(Math.pow(2, this.result));
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    factorial(n) {
        if (n == 0) return 1;
        if (n > 1) {
            return n * this.factorial(n - 1);
        } else {
            return n;
        }
    }

    showMenu() {
        if (!this.trigonometria) {
            document.querySelector("section > section").style.display = "grid";
            this.trigonometria = true;
        } else {
            document.querySelector("section > section").style.display = "none";
            this.trigonometria = false;
        }
    }

    shift1() {
        if (!this.shiftMode) {
            /* document.querySelector("main > input[value='↑']").style.backgroundColor = "#4A4A4A"; */

            var e1 = document.querySelector("main > input[value='x²']");
            e1.setAttribute("value", "x³");
            e1.setAttribute("onclick", "calculadora.alCubo()");
            var e2 = document.querySelector("main > input[value='√']");
            e2.setAttribute("value", "³√");
            e2.setAttribute("onclick", "calculadora.cubicrt()");
            var e3 = document.querySelector("main > input[value='xʸ']");
            e3.setAttribute("value", "ʸ√");
            e3.setAttribute("onclick", "calculadora.raiz()");
            var e4 = document.querySelector("main > input[value='10ˣ']");
            e4.setAttribute("value", "2ˣ");
            e4.setAttribute("onclick", "calculadora.exp2()");
            var e5 = document.querySelector("main > input[value='log']");
            e5.setAttribute("value", "logᵧx");
            e5.setAttribute("onclick", "calculadora.baselog()");
            var e6 = document.querySelector("main > input[value='ln']");
            e6.setAttribute("value", "eˣ");
            e6.setAttribute("onclick", "calculadora.exp()");
            this.shiftMode = true;
        } else {
            /* document.querySelector("main > input[value='↑']").style.backgroundColor = ""; */
            var e1 = document.querySelector("main > input[value='x³']");
            e1.setAttribute("value", "x²");
            e1.setAttribute("onclick", "calculadora.alCuadrado()");
            var e2 = document.querySelector("main > input[value='³√']");
            e2.setAttribute("value", "√");
            e2.setAttribute("onclick", "calculadora.sqrt()");
            var e3 = document.querySelector("main > input[value='ʸ√']");
            e3.setAttribute("value", "xʸ");
            e3.setAttribute("onclick", "calculadora.potencia()");
            var e4 = document.querySelector("main > input[value='2ˣ']");
            e4.setAttribute("value", "10ˣ");
            e4.setAttribute("onclick", "calculadora.exp10()");
            var e5 = document.querySelector("main > input[value='logᵧx']");
            e5.setAttribute("value", "log");
            e5.setAttribute("onclick", "calculadora.log()");
            var e6 = document.querySelector("main > input[value='eˣ']");
            e6.setAttribute("value", "ln");
            e6.setAttribute("onclick", "calculadora.ln()");
            this.shiftMode = false;
        }
    }

    shift2() {
        if (this.mode == "normal")
            this.mode = "inverse";
        else if (this.mode == "hyp")
            this.mode = "both";
        else if (this.mode == "inverse")
            this.mode = "normal";
        else
            this.mode = "hyp";
        this.switchMode();

    }

    hyp() {
        if (this.mode == "normal")
            this.mode = "hyp";
        else if (this.mode == "inverse")
            this.mode = "both";
        else if (this.mode == "hyp")
            this.mode = "normal";
        else
            this.mode = "inverse";
        this.switchMode();
    }

    /*
     * Estos botones los cambio mediante su id porque si no tendría que comprobar
     * en los tres casos si los botones tienen el valor normal, inverso, hiperbólico
     * o inverso hiperbólico. Es decir si quiero cambiar el boton del seno tendría que
     * mirar si el value es igual a senh, sen^-1 o senh^-1. Por tanto se reduce mucho
     * el código con el uso de id's
     */
    switchMode() {
        switch (this.mode) {
            case "normal":
                /* document.querySelector("main section section input[value='↑']").style.backgroundColor = "";
                document.querySelector("main section section input[value='hyp']").style.backgroundColor = ""; */
                document.getElementById("sen").setAttribute("value", "sen");
                document.getElementById("sen").setAttribute("onclick", "calculadora.seno()");
                document.getElementById("cos").setAttribute("value", "cos");
                document.getElementById("cos").setAttribute("onclick", "calculadora.coseno()");
                document.getElementById("tan").setAttribute("value", "tan");
                document.getElementById("tan").setAttribute("onclick", "calculadora.tangente()");
                document.getElementById("sec").setAttribute("value", "sec");
                document.getElementById("sec").setAttribute("onclick", "calculadora.sec()");
                document.getElementById("csc").setAttribute("value", "csc");
                document.getElementById("csc").setAttribute("onclick", "calculadora.csc()");
                document.getElementById("cot").setAttribute("value", "cot");
                document.getElementById("cot").setAttribute("onclick", "calculadora.cot()");
                break;
            case "inverse":
                /* document.querySelector("main section section input[value='↑']").style.backgroundColor = "#4A4A4A";
                document.querySelector("main section section input[value='hyp']").style.backgroundColor = ""; */
                document.getElementById("sen").setAttribute("value", "sen⁻¹");
                document.getElementById("sen").setAttribute("onclick", "calculadora.arcsin()");
                document.getElementById("cos").setAttribute("value", "cos⁻¹");
                document.getElementById("cos").setAttribute("onclick", "calculadora.arccos()");
                document.getElementById("tan").setAttribute("value", "tan⁻¹");
                document.getElementById("tan").setAttribute("onclick", "calculadora.arctan()");
                document.getElementById("sec").setAttribute("value", "sec⁻¹");
                document.getElementById("sec").setAttribute("onclick", "calculadora.arcsec()");
                document.getElementById("csc").setAttribute("value", "csc⁻¹");
                document.getElementById("csc").setAttribute("onclick", "calculadora.arccsc()");
                document.getElementById("cot").setAttribute("value", "cot⁻¹");
                document.getElementById("cot").setAttribute("onclick", "calculadora.arcocot()");
                break;
            case "hyp":
                /*      document.querySelector("main section section input[value='↑']").style.backgroundColor = "";
                     document.querySelector("main section section input[value='hyp']").style.backgroundColor = "#4A4A4A"; */
                document.getElementById("sen").setAttribute("value", "senh");
                document.getElementById("sen").setAttribute("onclick", "calculadora.senh()");
                document.getElementById("cos").setAttribute("value", "cosh");
                document.getElementById("cos").setAttribute("onclick", "calculadora.cosh()");
                document.getElementById("tan").setAttribute("value", "tanh");
                document.getElementById("tan").setAttribute("onclick", "calculadora.tanh()");
                document.getElementById("sec").setAttribute("value", "sech");
                document.getElementById("sec").setAttribute("onclick", "calculadora.sech()");
                document.getElementById("csc").setAttribute("value", "csch");
                document.getElementById("csc").setAttribute("onclick", "calculadora.csch()");
                document.getElementById("cot").setAttribute("value", "coth");
                document.getElementById("cot").setAttribute("onclick", "calculadora.coth()");
                break;
            case "both":
                /*       document.querySelector("main section section input[value='↑']").style.backgroundColor = "#4A4A4A";
                      document.querySelector("main section section input[value='hyp']").style.backgroundColor = "#4A4A4A"; */
                document.getElementById("sen").setAttribute("value", "senh⁻¹");
                document.getElementById("sen").setAttribute("onclick", "calculadora.arcsinh()");
                document.getElementById("cos").setAttribute("value", "cosh⁻¹");
                document.getElementById("cos").setAttribute("onclick", "calculadora.arccosh()");
                document.getElementById("tan").setAttribute("value", "tanh⁻¹");
                document.getElementById("tan").setAttribute("onclick", "calculadora.arctanh()");
                document.getElementById("sec").setAttribute("value", "sech⁻¹");
                document.getElementById("sec").setAttribute("onclick", "calculadora.arcsech()");
                document.getElementById("csc").setAttribute("value", "csch⁻¹");
                document.getElementById("csc").setAttribute("onclick", "calculadora.arccsch()");
                document.getElementById("cot").setAttribute("value", "coth⁻¹");
                document.getElementById("cot").setAttribute("onclick", "calculadora.arccoth()");
                break;
        }
    }

    masmenos() {
        this.operacion += "*(-1)";
        this.pantalla += "*(-1)";
        this.operadores.push("*");
        this.operadores.push("-");
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    abs() {
        this.igual();
        this.result = new Number(Math.abs(this.result));
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    invertir() {
        this.igual();
        this.result = new Number(1 / this.result);
        this.reset();
        document.getElementsByName("pantalla")[0].value = this.result;
    }

    igual() {
        if (this.log) {
            let numeros = this.operacion.split(" log base ");
            this.result = new Number(this.getBaseLog(new Number(numeros[1]), new Number(numeros[0])));
            this.operacion = this.result + "";
            this.pantalla = this.result + "";
            document.getElementsByName("pantalla")[0].value = this.pantalla;
            this.log = false;
            if (isNaN(this.result))
                this.error();
        } else if (this.opRaiz) {
            let numeros = this.operacion.split("√");
            this.result = new Number(Math.pow(new Number(numeros[1]), 1 / new Number(numeros[0])));
            this.operacion = this.result + "";
            this.pantalla = this.result + "";
            document.getElementsByName("pantalla")[0].value = this.pantalla;
            this.opRaiz = false;
            if (isNaN(this.result))
                this.error();
        } else {
            this.quitarParentesis();
            let operandos = this.operacion.split(/[\+\*\/\-\%\^\(]/);
            let resultado = "";
            let j = 0;
            for (let i = 0; i < operandos.length; i++) {
                if (this.operadores[j] == "(") {
                    resultado += "(";
                    j++;
                }
                if (operandos[i].length > 0)
                    resultado += new Number(operandos[i]) + "";
                if (this.operadores[j] == ")") {
                    resultado += ")";
                    j++;
                }
                if (this.operadores[j] != null) {
                    if (this.operadores[j] == "^")
                        resultado += "**";
                    else
                        resultado += this.operadores[j];
                    j++;
                }
            }
            try {
                var total = eval(resultado);
                if (total == Infinity)
                    document.getElementsByName("pantalla")[0].value = "No se puede dividir entre cero";
                else {
                    this.result = new Number(total);
                    this.reset();
                    if (this.result < 0) {
                        this.operadores.push("-");
                    }
                    document.getElementsByName("pantalla")[0].value = this.result;
                }
            } catch (err) {
                this.error();
            }
        }
    }

    error() {
        this.result = new Number();
        this.reset();
        document.getElementsByName("pantalla")[0].value = "Syntax Error";
    }

    quitarParentesis() {
        let nuevaOperacion = this.operacion;
        this.operacion = "";
        for (let i = 0; i < nuevaOperacion.length; i++) {
            if (nuevaOperacion[i] != "(" && nuevaOperacion[i] != ")")
                this.operacion += nuevaOperacion[i];
        }
    }
}

var calculadora = new CalculadoraCientifica();