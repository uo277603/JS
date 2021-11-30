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
                $("input[value='Pulsa aquí para ver la cotización del bitcoin']").attr("value", "Ocultar boton bitcoin");
                $("input[value='Cambio dolares']").attr("value", "Cambiar a dólares");
                $("input[value='RelEuros']").attr("value", "Ver relación con euros");
                $("input[value='RelDolares']").attr("value", "Ver relación con dólares");
            },
            error: function() {
                alert("No se ha podido obtener el JSON con la información del bitcoin");
            }
        });
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