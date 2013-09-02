//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

	var createNotificationViaService = require('lib/intent');

	// Create button for launching an immedaite notification
	var button = Ti.UI.createButton({
		title: 'Immediate Notification',
		height: '50dp',
		width: '200dp',
		top: '50dp'
	});
	button.addEventListener('click', function(e) {
		createNotificationViaService('Fired immediate notification!');
	});

	// Create button for launching a notification that will be launched
	// 4 seconds after we create it.
	var button2 = Ti.UI.createButton({
		title: 'Pending Notification (4 sec)',
		height: '50dp',
		width: '200dp',
		top: '15dp'
	});
	button2.addEventListener('click', function(e) {
		var now = new Date().getTime()
	    var delta = new Date( now + (4 * 1000) );
	    createNotificationViaService('Fired pending notification!', delta - now);
	});

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

	self.add(button);
	self.add(button2);
	self.add(gpsLabel);

	logarea = Titanium.UI.createTextArea({
	    backgroundColor: "#eee",
	    value: '',
	    editable: false,
	    top: 200,
	    left: 0,
	    right: 0,
	    bottom: 0
	});
	self.add(logarea);

	var log = function(str) {
	    logarea.value += str + "\n";
	};

	var messageField = Ti.UI.createTextField({
	    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	    width: "200dp",
	    height: "40dp",
	    top: "400dp",
	    left: 5,
	    value:"Hello World From Titanium!"
	});
	self.add(messageField);

	var sendBtn = Titanium.UI.createButton({
	    title: 'Send',
	    font: {
	        fontSize: 16,
	        fontFamily: 'Helvetica Neue'
	    },
	    textAlign: 'center',
	    width: 70,
	    height: "40dp",
	    top: "400dp",
	    right: 5
	});
	self.add(sendBtn);
	sendBtn.addEventListener('click', function() {
	    var v = messageField.value;
	    log('< ' + v);
	    ws.send(v);
	    messageField.blur();
	});

	return self;
}

module.exports = FirstView;
