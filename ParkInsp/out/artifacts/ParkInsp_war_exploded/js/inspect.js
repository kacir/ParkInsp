function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var mymap = L.map('map');

var locateControl = L.control.locate().addTo(mymap);
locateControl.start();

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(mymap);

var parknum = getUrlVars()["parknum"];


mymap.setView([ 34.7517595, -92.329416], 8);


var viewpastlink = $("#viewpastlink");
viewpastlink.attr("href" , viewpastlink.attr("href") + "?&parknum=" + parknum);
var createreport = $("#createReportLink");
createreport.attr("href" , createreport.attr("href") + "?&parknum=" + parknum);



function importData (data) {
    console.log(data);

    //change the park name at the top of the page
    $(".parkname").text( data.currname);

    //zoom to the extent of the footprint area
    var extent = L.geoJSON(data.geom_footprint).getBounds();
    mymap.fitBounds(extent);

    //object that will hold the layers list used by the layers control
    var layersList = {};

    if (data.hasOwnProperty("projectboundarystate")) {

        var stateStyle = {weight : 5,
            fillOpacity : 0,
            color: "red"
        };
        var stateLayer = L.geoJSON(data.projectboundarystate.geom, {style : stateStyle});
        stateLayer.addTo(mymap);
        layersList["State Project Boundary"] = stateLayer;
    }

    //make geojson versions of all of layers
    if (data.hasOwnProperty("projectboundaryfederal")) {

        var federalStyle = {weight : 2,
            fillOpacity: 0,
            color : "yellow"
        };

        var federalLayer = L.geoJSON(data.projectboundaryfederal.geom, {style : federalStyle});
        federalLayer.addTo(mymap);
        layersList["Federal Project Boundary"] = federalLayer;
    }

    if (data.structures.length > 0) {
        var buildingStyle = {
            fillOpacity : 0.4,
            fillColor : "white",
            opacity: 1,
            color: "white"
        };

        function bindPopup (feature, layer) {
            layer.bindPopup("<table><tr><th><h3> " + feature.properties.label + "</h3></th></tr><tr><td> Type is: " + feature.properties.type + "</td></tr></table>");

        };

        var buildingsLayer = L.geoJSON("" , {style : buildingStyle, onEachFeature : bindPopup});
        buildingsLayer.addTo(mymap);
        layersList["Structures"] = buildingsLayer;

        data.structures.forEach(function(structure){
            //flip the geometry and properties so the output it correct geoJSN
            var feature = structure.geom;
            delete structure.geom;
            feature.properties = structure;

            buildingsLayer.addData(feature);
            console.log("building added");

        });

    }

    L.control.layers("" , layersList).addTo(mymap);

}

//line that tests if the servlet service is working correctly
$.ajax({
    url: "api/inspect",
    type: "POST",
    data : {"parknum" : parknum},
    success: importData,
    error : function(xhr, status, error) {
        alert("An AJAX error occured " + status + " Error " + error);
    }
});
