var box = $("#InnerBox");
var nom = $('#ville');


$.ajax({
    url: 'https://vicopo.selfbuild.fr/ville/cahors',
    type: 'GET',
    dataType: 'json',
})
    .done(function(res){

        $('#ville').keyup(function (e) {
            if(e.keyCode == 13) {
              var $ville = $(this);
              console.log($ville);
              $.vicopo($ville.val(), function (input, cities) {
                if(input == $ville.val() && cities[0]) {
                    console.log("je suis dedans");
                  $ville.val(cities[0].city).vicopoTargets().vicopoClean();
                }
              });
              e.preventDefault();
              e.stopPropagation();
            }
          });;
        
        

    })
    .fail(function(err){
    })
    .always(function(){

    })


function carte (res){
             
    $('.map').prepend('<div id="map"></div>');     
        
    
    
    var map = L.map('map', {
        center: [res.coord.lat,res.coord.lon],
        zoom: 8
    });

     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); 
    
     L.marker([res.coord.lat,res.coord.lon]).addTo(map)
        .bindPopup(res.name)
        .openPopup();

       
        

}




$('#selec').click(function(){
    
    $('#map').remove();

    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q='+ nom.val() +',fr&appid=2304ca0a4c5b96eca86deb93757adbfa',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(res) {
    
           
            box.html("<ul><li><b>Ville:</b> "+res.name+"</li>"
            +"<li><b>Longitude:</b> "+res.coord.lon+"</li>"
            +"<li><b>Lattitude:</b> "+res.coord.lat+"</li>"
            +"<li><b>Vent:</b> "+res.wind.speed+" Km/h </li>"
            +"<li><b>Taux d'humidité:</b> "+res.main.humidity+"</li>"
            +"<li><b>Pression:</b> "+res.main.pressure+"</li>"
            +"<li><b>Température:</b> "+(((res.main.temp)-273.15).toFixed(2))+" °C</li>"
            +"<li><b>Température Min:</b> "+(((res.main.temp_min)-273.15).toFixed(2))+" °C</li>"
            +"<li><b>Température Max:</b> "+(((res.main.temp_max)-273.15).toFixed(2))+" °C</li></ul>"
            );     
            
            carte(res);
        
    })
    .fail(function(err) {
        console.log(err);
        box.html("");
        alert("Ville introuvable !");
        
    })
    .always(function(res) { // S'execute dans tous les cas!



    })
    

});