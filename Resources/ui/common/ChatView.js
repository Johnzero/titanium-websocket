//FirstView Component Constructor
function ChatView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

	var createNotificationViaService = require('lib/intent');
	
	var gpsLabel = Ti.UI.createLabel({
		text: '',
		color: '#fff',
		font: {
			fontSize: '20dp',
			fontWeight: 'normal'	
		},
		top: '80dp'
	});
	// Create a notification on orientation changes
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		createNotificationViaService('Orientation changed!');
	});

	// Create a notification whenever we receive location data. This will 
	// work both in the foreground and background.
	if (Ti.Geolocation.locationServicesEnabled) {
	    Ti.Geolocation.addEventListener('location', function(e) {
	        if (!e.error) {
	        	var gps = 'latitude: ' + e.coords.latitude + '\nlongitude: ' + e.coords.longitude;
	        	gpsLabel.text = gps;
	        	createNotificationViaService(gps);
	        }
	    });
	} 
	//Ti.Geolocation.getCurrentPosition(function(e) {});

	self.add(gpsLabel);

	return self;
}

module.exports = ChatView;
