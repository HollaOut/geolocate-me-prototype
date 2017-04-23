var map,
    bounds,
    routePoints = {},
    markerCoordinates = {},
    directionsService,
    directionsDisplay;

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.840197, lng: 24.028370},
    zoom: 12,
    gestureHandling: 'cooperative',
    draggable: true,
    mapTypeControlOptions: {
      mapTypeIds: []
    },
    streetViewControl: false
  });
  bounds = new google.maps.LatLngBounds();
  directionsDisplay.setMap(map);
}

function getCoordinates(callback){
  var location = navigator.geolocation;
  if (location) {
    location.getCurrentPosition(function(position){
      callback.call(position);
    }, function(){
      alert('Error: The Geolocation service failed.');
    });
  } else {
    alert('Error: Your browser doesn\'t support geolocation.');
  }
}

function setRoute(event, target, attr){
  getCoordinates(function(){
    var _this = this;

    drawRoute({
      x: _this.coords.latitude,
      y: _this.coords.longitude
    },{
      x: 49.817048,
      y: 24.033152
    });
  });
}

function getUserPosition(){
  getCoordinates(function(){
    var _this = this;
    var pos = {
      lat: _this.coords.latitude,
      lng: _this.coords.longitude
    };
    var coordinates = setMarkerOnMap(pos, 'Your location', 'origin'),
        posCoordinates= new google.maps.LatLng(coordinates.lat, coordinates.lng);

    bounds.extend(posCoordinates);
    map.fitBounds(bounds);
    map.setZoom(17);
  });
}

function setMarkerOnMap(location, title, key){
  if(typeof routePoints[key] !== 'undefined'){
    routePoints[key].setMap(null);
  }
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: title
  });

  routePoints[key] = marker;
  markerCoordinates[key] = {
    lat: marker.getPosition().lat(),
    lng: marker.getPosition().lng()
  };
  return markerCoordinates[key];
}

function drawRoute(start, end) {
    var start = new google.maps.LatLng(start.x, start.y);
    var end = new google.maps.LatLng(end.x, end.y);

    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setMap(null);
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(map);
      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });
  }
