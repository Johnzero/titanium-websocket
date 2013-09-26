//FirstView Component Constructor
function FriendsView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		accessibilityLabel:"friendsview",
		accessibilityHint: "view",
		top:"50dp",
		visible:true,
		backgroundColor : '#333'
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

	var im = Ti.UI.createImageView({
		top:"100dp",
		image:'/favorite_bg_voice.9.png',
		height:"200dp",
		width:"100dp"
	});

	var button3 = Ti.UI.createLabel({
		title: 'Pend阿萨德发斯蒂芬阿萨德发生的发生的发生的发生的发大水发大水发生的发生发生ing Notification (4 sec)',
		top: '150dp',
		backgroundImage:"/chatfrom_bg_normal.9.png"
	});

	// self.add(im);
	self.add(button3);
	self.add(button);
	self.add(button2);

					

	return self;
}

module.exports = FriendsView;
