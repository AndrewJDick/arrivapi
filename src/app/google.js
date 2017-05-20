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
  httpAdapter: 'https',
  apiKey: 'AIzaSyDodAp8X1I7gbRdnvuv_0Pu-l6HQuGBJWE', // TODO: Create env var
  formatter: null
});


// Logic
const latLng = (commuteContext, prop) => {

	this.props = commuteContext.parameters;
    this.bar = {};

    return geocoder.geocode(this.props[prop])
        .then((value) => {
	            
            return this.bar = Object.defineProperty(this.props, prop, {
                value: `${value[0].latitude},${value[0].longitude}`
            });

	    }, (reason) => {
	        console.error(reason);
	    });
};

const addressToCoords = (commuteContext) => {
	
	let origin = new Promise((resolve, reject) => { 
		console.log(latLng(commuteContext, 'origin'));
		resolve(latLng(commuteContext, 'origin'));
	}); 

	let destination = new Promise((resolve, reject) => { 
		console.log(latLng(commuteContext, 'destination'));
		resolve(fooBar(commuteContext, 'destination'));
	});

    Promise.all([origin, destination])
	    .then((values) => { 
			console.log('values');
			console.log(values);
		}, (reason) => {
			console.log(reason)
		});

};

exports.latLng = latLng;
