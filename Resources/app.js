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

	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;

	var win = Titanium.UI.createWindow({  
	    title:'WebSocket',
	    backgroundColor:'#fff'
	});

	logarea = Titanium.UI.createTextArea({
		backgroundColor: "#eee",
		value: '',
		editable: false,
		top: "70dp",
		left: 0,
		right: 0,
		bottom: 0
	});
	win.add(logarea);

	Ti.include('/lib/websocket.js');

	var connectBtn = Titanium.UI.createButton({
		title:'Connect',
		font:{fontSize:16,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width: "100dp",
		height: "20dp",
		top: "5dp",
		left: "5dp"
	});

	connectBtn.addEventListener('click', function() {

	});

	var closeBtn = Titanium.UI.createButton({
		title:'Close',
		font:{fontSize:16,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:"100dp",
		height: "20dp",
		top: "5dp",
		right: "5dp"
	});

	closeBtn.addEventListener('click', function() {
		ws.close();
	});

	var log = function(str) {
		logarea.value += str + "\n";
	};

	var messageField = Ti.UI.createTextField({
	    borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
		width:230,
		height: 50,
		bottom: 0,
		left: 5,
		value:"Hello World From titanium!"
	});
	win.add(messageField);

	var sendBtn = Titanium.UI.createButton({
		title:'Send',
		font:{fontSize:16,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:70,
		height: 40,
		bottom: 0,
		right: 5
	});
	win.add(sendBtn);
	sendBtn.addEventListener('click', function() {
		var v = messageField.value;
		log('< ' + v);
		ws.send(v);
		messageField.value = "";
		messageField.blur();
	});

	win.open();


})();
