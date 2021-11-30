"use strict";
class Bitcoin {
    constructor() {
        this.url = "https://api.coingecko.com/api/v3";
        this.data;
    }

    cargarBitcoin() {
        $.ajax({
            dataType: "json",
            url: this.url + "/coins",
            type: 'GET',
            success: function(datos) {
                self.data = datos[0];
                var stringDatos = "<section><h2>" + self.data.name + "</h2>";
                stringDatos += "<img src='" + self.data.image.small + "' alt='bitcoin'>";
                stringDatos += "<p>Última actualización: " + self.data.last_updated + "</p>";
                stringDatos += "<ul><li>Precio actual: " + self.data.market_data.current_price.eur + " €</li>";
                stringDatos += "<li>Capitalización de mercado: " + self.data.market_data.market_cap.eur + " €</li>";
                stringDatos += "<li>Volumen: " + self.data.market_data.total_volume.eur + " €</li></ul>";
                stringDatos += "<p><b>La capitalización de mercado es el valor total de mercado de la oferta circulante de una criptomoneda</b></p>";
                stringDatos += "<p><b>El volumen se trata de un conjunto de técnicas que tienen como objetivo predecir el precio o la tasa futura</b></p></section>";
                $("h1").after(stringDatos);
                $("input[value='Pulsa aquí para ver la cotización del bitcoin']").hide();
                $("input[value='Cambiar a dólares']").show();
                $("input[value='Ver relación con euros']").show();
                $("input[value='Ver relación con dólares']").show();
                $("input[value='Mostrar gráfica en euros']").show();
                $("input[value='Mostrar gráfica en dólares']").show();
            },
            error: function() {
                alert("No se ha podido obtener el JSON con la información del bitcoin");
            }
        });
    }

    graficoCircular() {
        $("section:nth-child(3n)").remove();
        $("section:nth-child(2n)").after("<section title='canvas'><h2>Gráfico de barras</h2></section>");
        var current_price = Math.trunc(self.data.market_data.current_price.eur / 100);
        var high24 = Math.trunc(self.data.market_data.high_24h.eur / 100);
        var low24 = Math.trunc(self.data.market_data.low_24h.eur / 100);
        $("section:nth-child(3n)").append("<canvas width='1000' height='700'/>");
        // $("section").after("<h2>Gráfico de barras</h2><canvas width='200' height='100'/>");
        var canvas = $("canvas").get(0);
        var contexto = canvas.getContext("2d");
        var width = 100;
        var currentX = 100;
        var nombres = ["Precio actual", "Máximo 24h", "Mínimo 24h"];
        var scores = [current_price, high24, low24];
        contexto.fillStyle = 'orange';
        contexto.font = "1em Arial";
        for (let i = 0; i < scores.length; i++) {
            var h = scores[i];
            contexto.fillRect(currentX, canvas.height - h, width, h + 10);
            contexto.fillStyle = 'black';
            contexto.fillText(nombres[i], currentX, 20);
            contexto.fillText((scores[i] * 100) + " €", currentX, canvas.height);
            contexto.fillStyle = 'orange';
            currentX += width + 50;
        }
    }

    graficoCircularDolares() {
        $("section:nth-child(3n)").remove();
        $("section:nth-child(2n)").after("<section title='canvas'><h2>Gráfico de barras</h2></section>");
        var current_price = Math.trunc(self.data.market_data.current_price.usd / 100);
        var high24 = Math.trunc(self.data.market_data.high_24h.usd / 100);
        var low24 = Math.trunc(self.data.market_data.low_24h.usd / 100);
        $("section:nth-child(3n)").append("<canvas width='1000' height='650'/>");
        var canvas = $("canvas").get(0);
        var contexto = canvas.getContext("2d");
        var width = 100;
        var currentX = 100;
        var nombres = ["Precio actual", "Máximo 24h", "Mínimo 24h"];
        var scores = [current_price, high24, low24];
        contexto.fillStyle = 'orange';
        contexto.font = "1em Arial";
        for (let i = 0; i < scores.length; i++) {
            var h = scores[i];
            contexto.fillRect(currentX, canvas.height - h, width, h + 10);
            contexto.fillStyle = 'black';
            contexto.fillText(nombres[i], currentX, 20);
            contexto.fillText((scores[i] * 100) + " $", currentX, canvas.height);
            contexto.fillStyle = 'orange';
            currentX += width + 50;
        }
    }

    representarDibujo() {
        $("section:nth-child(3n)").remove();
        $("section:nth-child(2n)").after("<section></section>");
        var bitcoinValue = self.data.market_data.current_price.eur;
        var euros = Math.trunc(bitcoinValue / 1000);
        var stringDatos = "<h2>Relación de un Bitcoin por cada 1000 euros</h2>";
        stringDatos += "<img src='" + self.data.image.small + "' alt='bitcoin'>";
        for (let i = 0; i < euros; i++) {
            stringDatos += "<img src='eur.png' alt='euro" + i + "'>";
        }
        $("section:nth-child(3n)").html(stringDatos);
    }

    representarDibujoDolares() {
        $("section:nth-child(3n)").remove();
        $("section:nth-child(2n)").after("<section></section>");
        var bitcoinValue = self.data.market_data.current_price.usd;
        var dolares = Math.trunc(bitcoinValue / 1000);
        var stringDatos = "<h2>Relación de un Bitcoin por cada 1000 dólares</h2>";
        stringDatos += "<img src='" + self.data.image.small + "' alt='bitcoin'>";
        for (let i = 0; i < dolares; i++) {
            stringDatos += "<img src='usd.png' alt='" + i + "'>";
        }
        $("section:nth-child(3n)").html(stringDatos);
    }

    usd() {
        var lista = $("li");
        lista[0].innerText = "Precio actual: " + self.data.market_data.current_price.usd + " $";
        lista[1].innerText = "Capitalización de mercado: " + self.data.market_data.market_cap.usd + " $";
        lista[2].innerText = "Volumen: " + self.data.market_data.total_volume.usd + " $";
        $("input[value='Cambiar a dólares']").attr({ "value": "Cambiar a euros", "onclick": "bitcoin.eur()" });
    }

    eur() {
        var lista = $("li");
        lista[0].innerText = "Precio actual: " + self.data.market_data.current_price.eur + " €";
        lista[1].innerText = "Capitalización de mercado: " + self.data.market_data.market_cap.eur + " €";
        lista[2].innerText = "Volumen: " + self.data.market_data.total_volume.eur + " €";
        $("input[value='Cambiar a euros']").attr({ "value": "Cambiar a dólares", "onclick": "bitcoin.usd()" });
    }
}

var bitcoin = new Bitcoin();