function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var mymap = L.map('map');

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(mymap);

var parknum = getUrlVars()["parknum"];


mymap.setView([ 34.7517595, -92.329416], 8);


var viewpastlink = $("#viewpastlink");
viewpastlink.attr("href" , viewpastlink.attr("href") + "?&parknum=" + parknum);
var createreport = $("#createReportLink");
createreport.attr("href" , createreport.attr("href") + "?&parknum=" + parknum);


console.log(getUrlVars()['parknum']);

//line that tests if the servlet service is working correctly
$.ajax({
    url: "api/inspect",
    type: "POST",
    data : {"parknum" : parknum},
    success: function (data) {
        console.log(data);
    },
    error : function(xhr, status, error) {
        alert("An AJAX error occured " + status + " Error " + error);
    }
});
