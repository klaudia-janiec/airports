function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: { lat: 0, lng: 0 }
  });

  addConnections(map);
  return map;
}

function addConnections(map) {
  $.ajax({
    url: "/connections",
    dataType: "json",
    success: function(data){
      var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
      };
      var airport_a_coordinates, airport_b_coordinates;
      var airports = [];

      for(id in data) {
        connection = data[id];
        airport_a_coordinates = { lat: parseFloat(connection.airport_a.y), lng: parseFloat(connection.airport_a.x) };
        airport_b_coordinates = { lat: parseFloat(connection.airport_b.y), lng: parseFloat(connection.airport_b.x) };

        pushToAirports(airports, connection.airport_a);
        pushToAirports(airports, connection.airport_b);

        new google.maps.Polyline({
          path: [airport_a_coordinates, airport_b_coordinates],
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
          strokeColor: "#f4b942",
          map: map
        });
      }

      addMarkers(map, airports);
    }
  });
}

function pushToAirports(airports, airport) {
  for(var i=0; i < airports.length; i++) {
      if((airports[i]).id === airport.id) return false;
  }
  airports.push(airport);
}

function addMarkers(map, airports) {
  for(id in airports) {
    airport = airports[id];

    new google.maps.Marker({
      position: { lat: parseFloat(airport.y), lng: parseFloat(airport.x) },
      icon:'/assets/airport.png',
      map: map,
      title: airport.icao.concat(", ").concat(airport.city).concat(", ").concat(airport.country)
    });
  }
}

// For new

$(document).on('turbolinks:load page:load', function() {
  var select_fields = document.getElementsByTagName("select");
  for(var select_field of select_fields) {
    if(select_field.id === "connection_airport_a_id" || select_field.id === "connection_airport_b_id") {
      select_field.addEventListener('change', focusMap, false);
    }
  }
});

function focusMap() {
  var airport_a = document.getElementById('connection_airport_a_id').value;
  var airport_b = document.getElementById('connection_airport_b_id').value;

  if(airport_a || airport_b) {
    var map = initMap();
  }

  if(airport_a && airport_b) {
    $.get("/airports/".concat(airport_a), function(airport_a_data) {
      $.get("/airports/".concat(airport_b), function(airport_b_data) {
        var bound = new google.maps.LatLngBounds();
        bound.extend( new google.maps.LatLng(parseFloat(airport_a_data.y), parseFloat(airport_a_data.x)) );
        bound.extend( new google.maps.LatLng(parseFloat(airport_b_data.y), parseFloat(airport_b_data.x)) );

        map.fitBounds(bound);
        addMarkers(map, [airport_a_data, airport_b_data]);
      })
    });
  } else if(airport_a) {
    $.get("/airports/".concat(airport_a), function(airport_a_data) {
      map.setCenter(new google.maps.LatLng(parseFloat(airport_a_data.y), parseFloat(airport_a_data.x)));
      addMarkers(map, [airport_a_data]);
    });
  } else if(airport_b) {
    $.get("/airports/".concat(airport_b), function(airport_b_data) {
      map.setCenter(new google.maps.LatLng(parseFloat(airport_b_data.y), parseFloat(airport_b_data.x)));
      addMarkers(map, [airport_b_data]);
    });
  }
}
