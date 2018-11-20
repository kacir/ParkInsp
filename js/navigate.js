var mymap = L.map('map').setView([ 34.7517595, -92.329416], 8);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

//add a marker icon and style it as due for inspection

//add a marker icon and style it as needing inspection

var marker = L.marker([ 34.7517595, -92.329416]).addTo(mymap);

marker.bindPopup("<table> <tr><th><h3>Park Name</h3></th></tr> <tr><td><a href='ViewPast.html'>View Past Reports</a></td> </tr><tr><td><a href='inspect.html'>Inspect</a></td></tr> <tr><td>Drive Here</td></tr> </table>")