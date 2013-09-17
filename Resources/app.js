

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
	
	localhost = "120.209.194.240:8080";
	IsBackground = false;
	username = '';
	password = '';
	ConnectState = 0;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

	var Window;

	// if (osname === 'android') {

	if (!Ti.App.Properties.getBool("login", false)) {

		Window = require("/ui/LoginWindow");

	}else {

		var userInfo = Ti.App.Properties.getList("user",false);
		if (userInfo) {
		    if (userInfo[0]) {
		        username = userInfo[0]["username"];
		        password = userInfo[0]["password"];
		    }else {ws.close();};
		}else {ws.close();};
		Window = require("/ui/MainWindow");

	}

	// }

	new Window().open();

})();

// Ti.Android.currentActivity.addEventListener('destroy', function(e) {
// 	Ti.API.error('destroy');
// });
// Ti.Android.currentActivity.addEventListener('pause', function(e) {
//     IsBackground = true;
//     Ti.API.error('pause');
// });
// Ti.Android.currentActivity.addEventListener('resume', function(e) {
//     IsBackground = false;
//     Ti.API.error('resume');
// });
// Ti.Android.currentActivity.addEventListener('create', function(e) {
// });
// Ti.Android.currentActivity.addEventListener('start', function(e) {
// });
// Ti.Android.currentActivity.addEventListener('stop', function(e) {
// 	Ti.API.error('stop');
// });
// Ti.Android.currentActivity.addEventListener('newintent', function(e) {
// 	Ti.API.error('newintent');
// });


	







	// Ti.App.Properties.getBool("login", false);


	// service.addEventListener('resume', function(e) {
	// });
	// service.addEventListener('pause', function(e) {
	// });

	
	// var NavigationController = require('/lib/NavigationController').NavigationController;

	// var controller = new NavigationController();

	// controller.open(new Window(controller));
