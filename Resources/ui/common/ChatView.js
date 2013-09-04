//FirstView Component Constructor
function ChatView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		accessibilityLabel:"chatview",
		accessibilityHint: "view",
		visible:true
	});

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

	// Ti.Gesture.addEventListener('orientationchange', function(e) {
	// 	createNotificationViaService('Orientation changed!');
	// });

	// if (Ti.Geolocation.locationServicesEnabled) {
	//     Ti.Geolocation.addEventListener('location', function(e) {
	//         if (!e.error) {
	//         	var gps = 'latitude: ' + e.coords.latitude + '\nlongitude: ' + e.coords.longitude;
	//         	gpsLabel.text = gps;
	//         	createNotificationViaService(gps);
	//         }
	//     });
	// } 
	//Ti.Geolocation.getCurrentPosition(function(e) {});

	var button = Ti.UI.createButton({
			title: 'close',
			height: '50dp',
			width: '200dp',
			top: '50dp'
		});

		button.addEventListener('click', function(e) {
			// navController.home();
			
		});
					
	self.add(button);

	self.add(gpsLabel);

	return self;
}

module.exports = ChatView;
