var map;
var markers = [
    {
        name: "Suite Beverly",
        rating: "*****",
        lat: 40.542255,
		lng: -74.362006,
        showFlag: ko.observable(true),
        flag: true,
		streetImg: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=40.542255,-74.362006"
    },
    {
        name: "Salon 212",
        rating: "****",
        lat: 40.534913,
        lng: -74.359897,
        showFlag: ko.observable(true),
        flag: true,
        streetImg: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=40.534913,-74.359897"
    },
    {
        name: "George’s Salon",
        rating: "***",
        lat: 40.544097,
        lng: -74.363373,
        showFlag: ko.observable(true),
        flag: true,
        streetImg: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=40.544097,-74.363373"
    },
    {
        name: "All About U Salon & Spa Llc",
        rating: "**",
        lat: 40.547281,
        lng: -74.370961,
        showFlag: ko.observable(true),
        flag: true,
        streetImg: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=40.547281,-74.370961"
    },
    {
        name: "Reflections on Main Hair Salon",
        rating: "*",
        lat: 40.533614,
        lng: -74.359172,
        showFlag: ko.observable(true),
        flag: true,
        streetImg: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location=40.533614,-74.359172"
    
    }
];

//setting the infowindow and markers for all locations
function setLocations(location) {
    
    for (i = 0; i < location.length; i++) {
        location[i].currentMarker = new google.maps.Marker({
			position: new google.maps.LatLng(location[i].lat, location[i].lng),
			map: map,
			title: location[i].name
        });
        // using google maps infoWindow in the markers used stackoverflow for this part
        var info = new google.maps.InfoWindow({
            content: ""
        });

       //used stackoverflow example for this part to click a marker and see the infowindow
        new google.maps.event.addListener(location[i].currentMarker, 'click', (function (marker, i) {
			return function () {
				var cont = '<strong> Salon Name: ' + location[i].name + '<p style="font-size: 20px ; color: red">' + location[i].rating + '</p><hr></strong><img src="' + location[i].streetImg + '">';
				info.setContent(cont);
				info.open(map, this);
			};
        })(location[i].currentMarker, i));
	}
}
//check for the marker visiblity which should be passed to viewModel
function createAllMapLocations() {
	for (var i = 0; i < markers.length; i++) {
    	if(markers[i].flag === true) {
    		markers[i].currentMarker.setMap(map);
		}else {
			markers[i].currentMarker.setMap(null);
    }
  }
}


// if I did not do this my code was not working unless I added all script in my html file.
function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '&signed_in=false&callback=init';
	document.body.appendChild(script);
}
window.onload = loadScript;

//init the map and its contents
function init() {
    var mapOptions = {
        zoom: 15,
        map: map,
        center: new google.maps.LatLng(40.5430556, -74.3636111), //initialize with metuchen
        draggable: true
    };
    

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    setLocations(markers);
    createAllMapLocations();

}


//Search throught the markers and only show the one that matches
var viewModel = {
    searchString: ko.observable(''),
    
};

viewModel.markers = ko.dependentObservable(function() {
    
    var search = this.searchString().toUpperCase();
     //using the arrayFilter of knockout here   
    return ko.utils.arrayFilter(markers, function(marker) {
        if (marker.name.toUpperCase().indexOf(search) >= 0) {
            marker.flag = true;
            return marker.showFlag(true);
        } else {
            marker.flag = false;
            createAllMapLocations();
            return marker.showFlag(false);
        }
    });       
}, viewModel);

ko.applyBindings(viewModel);






