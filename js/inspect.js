function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

var mymap = L.map('map');

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(mymap);




mymap.setView([ 34.7517595, -92.329416], 8);

console.log("the url parameter is: " + getQueryVariable("parkNum"));

var viewpastlink = $("#viewpastlink");
viewpastlink.attr("href" , viewpastlink.attr("href") + "?&parknum=" + getQueryVariable("parkNum"));
var createreport = $("#createReportLink");
createreport.attr("href" , createreport.attr("href") + "?&parknum=" + getQueryVariable("parkNum"));
