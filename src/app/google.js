/*
Sample Google Directions Query
==============================
https://maps.googleapis.com/maps/api/directions/json
?origin=51.6564890,-0.3903200
&destination=51.5238910,-0.0968820
&key=AIzaSyDodAp8X1I7gbRdnvuv_0Pu-l6HQuGBJWE
&mode=transit
&units=imperial
&arrival_time=1494579600
&alternatives=true
*/


// Packages
const nodeGeocoder = require('node-geocoder');
const geocoder = nodeGeocoder({
  provider: 'google',
 
  // Optional depending on the providers 
  httpAdapter: 'https',
  apiKey: 'AIzaSyDodAp8X1I7gbRdnvuv_0Pu-l6HQuGBJWE', // TODO: Create env var
  formatter: null
});


// Logic
const latLng = (commuteContext) => {

	const waypoints = ['origin', 'destination'];
	
	for (waypoint in waypoints) {
		geocoder.geocode(commuteContext.parameters.`${waypoints[waypoint]}`).then((response) => {

			// Convert street address to Lat / Lng coordinates
			Object.defineProperty(commuteContext.parameters, `${waypoints[waypoint]}`, {
				value: `${response[0].latitude},${response[0].longitude}`
			})

			console.log(commuteContext);
		})
		.catch((err) => {
		    console.log(err);
		});
	}
};

exports.latLng = latLng;