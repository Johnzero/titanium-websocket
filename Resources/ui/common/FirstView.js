//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		accessibilityLabel:"firstview",
		accessibilityHint: "view",
		visible:true
	});

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


	self.add(button);
	self.add(button2);

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
	    top: "300dp",
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
	    top: "300dp",
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
