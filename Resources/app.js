

/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with multiple windows in a stack
(function() {
	//render appropriate components based on the platform and form factor
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	IsBackground = false;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	if (isTablet) {
		var Window = require('/ui/MainWindow');
	}
	else {
		if (osname === 'android') {

			Window = require('/ui/MainWindow');

		}
	}

	var intent = Titanium.Android.createServiceIntent( { url: 'websocket.js' } );

	if( Ti.Android.isServiceRunning(intent) ) {

		var connect = ws._connect();
		var isRunning = Ti.App.Properties.getBool("service_running", false);

		if (!isRunning) {
			log("检查网络!");
		}

	}else {
		
		var service = Titanium.Android.createService(intent);

		service.start();

	};

	// service.addEventListener('resume', function(e) {
	// });
	// service.addEventListener('pause', function(e) {
	// });

	
	// var NavigationController = require('/lib/NavigationController').NavigationController;

	// var controller = new NavigationController();

	// controller.open(new Window(controller));
	
	new Window().open();

	Ti.Android.currentActivity.addEventListener('destroy', function(e) {
	});
	Ti.Android.currentActivity.addEventListener('pause', function(e) {
	    IsBackground = true;
	});
	Ti.Android.currentActivity.addEventListener('resume', function(e) {
	    IsBackground = false;
	});
	Ti.Android.currentActivity.addEventListener('create', function(e) {
	});
	Ti.Android.currentActivity.addEventListener('start', function(e) {
	});
	Ti.Android.currentActivity.addEventListener('stop', function(e) {
	});
	Ti.Android.currentActivity.addEventListener('newintent', function(e) {
	});

})();
