var box = $("#box");
var nom = $('#ville');

$('#selec').click(function(){

    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q='+ nom.val() +',fr&appid=2304ca0a4c5b96eca86deb93757adbfa',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(res) {
        
            box.html("Ville: "+res.name+"</br>"
            +"longitude: "+res.coord.lon+"</br>"
            +"lattitude: "+res.coord.lat+"</br>"
            +"vent: "+res.wind.speed+" Km/h </br>"
            +"Taux d'humidité: "+res.main.humidity+"</br>"
            +"Pression Atmosphérique: "+res.main.pressure+"</br>"
            +"Température: "+(((res.main.temp)-273.15).toFixed(2))+" °C</br>"
            +"Température Min: "+(((res.main.temp_min)-273.15).toFixed(2))+" °C</br>"
            +"Température Max: "+(((res.main.temp_max)-273.15).toFixed(2))+" °C</br>"
            );

        

    })
    .fail(function(err) {
        console.log(err);
    })
    .always(function() { // S'execute dans tous les cas!
        console.log("complete");
        console.log(nom.val());
});

});