var mymap = L.map('map').setView([ 34.7517595, -92.329416], 8);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

//add the geocoder to the map
L.Control.geocoder().addTo(mymap);

var greenIcon = L.icon({
    iconUrl : "img/greenpark.png",
    iconSize: [25, 25],
    iconAnchor: [12.5,12.5],
    popupAnchor: [0,0]
});

var redIcon = L.icon({
    iconUrl : "img/redpark.png",
    iconSize: [25, 25],
    iconAnchor: [12.5,12.5],
    popupAnchor: [0,0]
});


function bindParkPopup (feature, layer) {

    //add popup to layer based on properties of feature
    var popupText = "<table> <tr><th><h3>" + feature.properties.currname +
        "</h3></th></tr> <tr><td><a href='ViewPast.html?parknum=" +
        feature.properties.parknum + "'>View Past Reports</a></td> </tr><tr><td><a href='inspect.html?&parknum=" +
        feature.properties.parknum +"'>Inspect</a></td></tr> <tr><td><a target='_blank' href='"+ feature.properties.googlelink + "'>Drive Here</a></td></tr> </table>";

    layer.bindPopup(popupText);

    //change the point image based on how up to date the park is
}

function currentStyleParkMarker(feature, latlng){
    var parkMarker = L.marker(latlng, {icon : greenIcon});
    return parkMarker//some kind of marker object
};

function dueStyleParkMarker(feature, latlng){
    var parkMarker = L.marker(latlng, {icon : redIcon});
    return parkMarker//some kind of marker object
};

//create a geojson leaflet group layer for everything to reside in
var currentParksGroupLayer = L.geoJSON( "" ,{onEachFeature : bindParkPopup, pointToLayer : currentStyleParkMarker});
currentParksGroupLayer.addTo(mymap);
var dueParksGroupLayer = L.geoJSON( "" ,{onEachFeature : bindParkPopup, pointToLayer : dueStyleParkMarker});
dueParksGroupLayer.addTo(mymap);

console.log("layers control being added to map");
L.control.layers("" , {"Due Parks" : dueParksGroupLayer, "Current Parks" : currentParksGroupLayer }).addTo(mymap);


function importData (data){
    console.log("data import started");
    data.forEach(function(park){
        //turn the json object containing geojson into geojson with properties attribute
        //if its true json then leaflet will play nicer with it
        var jsonfeature =  JSON.parse(park.point);
        delete park.point;
        jsonfeature.properties = park;

        console.log(jsonfeature);

        if (park.hasOwnProperty("inspDate")) {
            var parkcurrentDate = new Date(park.inspDate);

            //create a date object which is 5 years from the current date
            var maxInspDate = new Date();
            maxInspDate.setFullYear(Number(maxInspDate.getFullYear()) - 5);

            if (maxInspDate <= parkcurrentDate) {
                currentParksGroupLayer.addData(jsonfeature);
            } else {
                dueParksGroupLayer.addData(jsonfeature);
            }

        } else {
            dueParksGroupLayer.addData(jsonfeature);
        }


    })
};


//line that tests if the servlet service is working correctly
$.ajax({
    url: "api/navigate",
    type: "POST",
    success: importData,
    error : function(xhr, status, error) {
        alert("An AJAX error occured " + status + " Error " + error);
    }
});
