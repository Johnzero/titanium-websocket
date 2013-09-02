//FirstView Component Constructor
function ChatView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	var gpsLabel = Ti.UI.createLabel({
		text: 'gpsLabel',
		color: '#fff',
		font: {
			fontSize: '20dp',
			fontWeight: 'normal'	
		},
		top: '280dp'
	});

	Ti.Gesture.addEventListener('orientationchange', function(e) {

	});

	self.add(gpsLabel);

	return self;
}

module.exports = ChatView;
