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
          icon:'/assets/airport.png',
          map: map,
          title: airport.icao.concat(", ").concat(airport.city).concat(", ").concat(airport.country)
        });
      }
    }
  });
}
;
