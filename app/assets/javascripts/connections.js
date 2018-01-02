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
      icon: window.airport_image,
      map: map,
      title: airport.icao.concat(", ").concat(airport.city).concat(", ").concat(airport.country)
    });
  }
}

// For new

$(document).on('turbolinks:load page:load', function() {
  var select_fields = document.getElementsByTagName("select");
  for(id in select_fields) {
    select_field = select_fields[id];

    if(select_field.id === "country_a_name" || select_field.id === "country_b_name") {
      select_field.addEventListener('change', function() {
        pickAirport(this);
      }, false);
      select_field.value = "0";
    }
    if(select_field.id === "connection_airport_a_id" || select_field.id === "connection_airport_b_id") {
      select_field.addEventListener('change', focusMapAirports, false);
      select_field.setAttribute("disabled", "disabled");
    }
  }
});

function pickAirport(select_field) {
  var airport_name;
  if(select_field.id === "country_a_name") {
    airport_name = "connection_airport_a_id";
  } else {
    airport_name = "connection_airport_b_id";
  }

  toggleAirportSelect(select_field.value, document.getElementById(airport_name));
  focusMapCountries();
}

function toggleAirportSelect(select_field_value, airport_select) {
  if(select_field_value === "0") {
    airport_select.setAttribute("disabled", "disabled");
    removeOptions(airport_select);
  } else {
    airport_select.removeAttribute("disabled");
    addOptions(select_field_value, airport_select);
  }
}

function removeOptions(airport_select) {
  var length = airport_select.options.length;
  for (i = 0; i < length; i++) {
    airport_select.remove(0);
  }

  option = document.createElement("option");
  option.value = "0";
  option.textContent = "";
  airport_select.appendChild(option);
}

function addOptions(country_name, airport_select) {
  removeOptions(airport_select);

  $.ajax({
    url: "/airports?country=".concat(country_name),
    dataType: "json",
    success: function(airport_list){
      var airport;

      for(id in airport_list) {
        airport = airport_list[id];
        option = document.createElement("option");
        option.value = airport.id;
        option.textContent = airport.icao.concat(", ").concat(airport.name);
        airport_select.appendChild(option);
      }
    }
  });
}

function focusMapCountries() {
  var country_a = document.getElementById('country_a_name').value;
  var country_b = document.getElementById('country_b_name').value;

  if(country_a === "0" && country_b === "0") {
    initMap();
  } else {
    focusMapAirports();
  }
}

function focusMapAirports() {
  var airport_a = document.getElementById('connection_airport_a_id').value;
  var airport_b = document.getElementById('connection_airport_b_id').value;
  var map = initMap();

  if(airport_a !== "0" && airport_b !== "0") {
    $.get("/airports/".concat(airport_a), function(airport_a_data) {
      $.get("/airports/".concat(airport_b), function(airport_b_data) {
        var bound = new google.maps.LatLngBounds();
        bound.extend( new google.maps.LatLng(parseFloat(airport_a_data.y), parseFloat(airport_a_data.x)) );
        bound.extend( new google.maps.LatLng(parseFloat(airport_b_data.y), parseFloat(airport_b_data.x)) );

        map.fitBounds(bound);
        addMarkers(map, [airport_a_data, airport_b_data]);
      })
    });
  } else if(airport_a !== "0") {
    $.get("/airports/".concat(airport_a), function(airport_a_data) {
      map.setCenter(new google.maps.LatLng(parseFloat(airport_a_data.y), parseFloat(airport_a_data.x)));
      addMarkers(map, [airport_a_data]);
    });
  } else if(airport_b !== "0") {
    $.get("/airports/".concat(airport_b), function(airport_b_data) {
      map.setCenter(new google.maps.LatLng(parseFloat(airport_b_data.y), parseFloat(airport_b_data.x)));
      addMarkers(map, [airport_b_data]);
    });
  }
}
