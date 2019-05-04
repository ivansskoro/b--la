// create map
var map;
var wayPoints = [];
var tourWayPointsOrig = [];

function initMap() {

	// sanitize data
	tourWayPointsOrig = tourWayPoints.slice();

	wayPointOrigin			= tourWayPoints.shift();
	wayPointOrigin 			= new google.maps.LatLng( wayPointOrigin.lat, wayPointOrigin.lng );  // wayPointOrigin.address; // 
	wayPointDestination 	= tourWayPoints.pop();
	wayPointDestination 	= new google.maps.LatLng( wayPointDestination.lat, wayPointDestination.lng );  // wayPointDestination.address; // 

	for (var i = 0; i < tourWayPoints.length; i++) {
		wayPoints.push({
			location: new google.maps.LatLng(tourWayPoints[i].lat, tourWayPoints[i].lng),  // tourWayPoints[i].address, // 
			stopover: true
		});
	}

    // Instantiate a directions service.
	var directionsService = new google.maps.DirectionsService;

    // Create a map.
	var map = new google.maps.Map(document.getElementById('map'), {
		styles: mapStyles,
    });

    // Create a renderer for directions and bind it to the map.
	var directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);
	directionsDisplay.setOptions({
		polylineOptions: {
			strokeColor: 'black',
			strokeOpacity: 1,
			strokeWeight: 4,
		},
		suppressMarkers: true,
	});

    // Instantiate an info window to hold step text.
    var infoWindow = new google.maps.InfoWindow;

    // Display the route between the initial start and end selections.
	calculateAndDisplayRoute(directionsService, directionsDisplay, infoWindow, map);

}

function calculateAndDisplayRoute(directionsService, directionsDisplay, infoWindow, map) {

	directionsService.route({
		origin: wayPointOrigin,
		destination: wayPointDestination,
		waypoints: wayPoints,
		optimizeWaypoints: false,
		travelMode: 'WALKING'
	}, function(response, status) {


	for (var i = 0; i < response.routes[0].legs.length; i++) {
//console.log(response.routes[0].legs[i].start_address);
//console.log(response.routes[0].legs[i].start_location.lat());
//console.log(response.routes[0].legs[i].start_location.lng());
//console.log(response.routes[0].legs[i].end_address);
//console.log(response.routes[0].legs[i].end_location.lat());
//console.log(response.routes[0].legs[i].end_location.lng());
	}


		if (status === 'OK') {
			directionsDisplay.setDirections(response);
			markers( map, infoWindow );
		} else {
			console.log( 'Directions request failed due to ' + status );
		}
	});
}


// For each step, place a marker, and add the text to the marker's infowindow.
function markers( map, infoWindow ) {
	for (var i = 0; i < tourWayPointsOrig.length; i++) {
		addMarker( tourWayPointsOrig[i], map, infoWindow );
	}
}

function addMarker( tourWayPoint, map, infoWindow ) {

	var marker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(tourWayPoint.lat, tourWayPoint.lng),
		icon: {
			fillColor: 'black',
			fillOpacity: 1,
			path: 'M20,10c0,5.5-4.5,10-10,10S0,15.5,0,10S4.5,0,10,0S20,4.5,20,10z',
			strokeColor: 'black',
			strokeOpacity: 0,
			strokeWeight: 0,
			scale: 1,
			anchor: new google.maps.Point(11,11),
		},
	});

	// Open an info window when the marker is clicked on, containing the text of the step.
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent('<b>'+tourWayPoint.name+' </b>'+tourWayPoint.address);
		infoWindow.open(map, marker);
	});
}

var mapStyles = [
  {
    "featureType": "landscape.man_made",
    "stylers": [
      {
        "color": "#cbcccb"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "stylers": [
      {
        "color": "#44ab85"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#44ab85"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#1a1a1a"
      },
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4374ab"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4374ab"
      }
    ]
  }
];
