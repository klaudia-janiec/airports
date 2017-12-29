function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: { lat: 0, lng: 0 }
  });

  addConnections(map);
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

      for(id in data) {
        connection = data[id];
        airport_a_coordinates = { lat: parseFloat(connection.airport_a.y), lng: parseFloat(connection.airport_a.x) };
        airport_b_coordinates = { lat: parseFloat(connection.airport_b.y), lng: parseFloat(connection.airport_b.x) };

        new google.maps.Polyline({
          path: [airport_a_coordinates, airport_b_coordinates],
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
          map: map
        });
      }
    }
  });
}
