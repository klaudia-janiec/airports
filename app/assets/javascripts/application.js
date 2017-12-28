// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require jquery

$(window).load(function() {
  loadScript();
});

function loadScript() {
	console.log("map loading ...");
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5DS8QvezabjodqeJSZ4mO8-6WKxJZVUI&callback=initMap';
  document.body.appendChild(script);
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: { lat: 0, lng: 0 }
  });

  addMarkers(map);
}

function addMarkers(map) {
  $.ajax({
    url: "/airports",
    dataType: "json",
    success: function(data){
      for(id in data) {
        airport = data[id];

        new google.maps.Marker({
          position: { lat: parseFloat(airport.y), lng: parseFloat(airport.x) },
          icon:'assets/airport.png',
          map: map,
          title: airport.icao.concat(", ").concat(airport.city).concat(", ").concat(airport.country)
        });
      }
    }
  });
}
