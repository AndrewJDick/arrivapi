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
var latLng = (commuteContext, prop) => {

	let props = commuteContext.parameters;

    let bar = {};

    geocoder.geocode(props[prop])
        .then((value) => {
	            
            bar = Object.defineProperty(props, prop, {
                value: `${value[0].latitude},${value[0].longitude}`
            });

            console.log(this);
            return latLng.bar;

	    }, (reason) => {
	        console.error(reason);
	    });
    };
};

// console.log(latLng(commuteContext, 'origin'));
// console.log(latLng(commuteContext, 'destination'));

 //    var origin = new Promise((resolve, reject) => { 
	// 	resolve(fooBar(props, 'origin'));
	// }); 

	// var destination = new Promise((resolve, reject) => { 
	// 	resolve(fooBar(props, 'destination'));
	// });

 //    Promise.all([origin, destination])
	//     .then((values) => { 
	// 		console.log('values');
	// 		console.log(values);
	// 	}, (reason) => {
	// 		console.log(reason)
	// 	});
    
// };

exports.latLng = latLng;
