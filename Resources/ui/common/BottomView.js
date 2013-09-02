//FirstView Component Constructor
function BottomView(navController) {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		height:"60dp",
		bottom:0,
		zIndex : 1000

	});
	
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

	var bottom = Ti.UI.createLabel ({
		backgroundColor:'darkgray',
		text: '咕噜网@安徽木森网络科技有限公司',
		textAlign: 'center',
		bottom:0,
		width: Titanium.UI.FILL, 
		backgroundImage:"/grad.png",
		zIndex : 600,
		height:"50dp"
	});

	bottom.addEventListener("click",function () {

		var ChatWindow = require('ui/ChatWindow');
		navController.open(new ChatWindow(navController));

		// if (firstView.visible == true) {

		// 	firstView.visible = false;

		// 	self.add(chatview);

		// }else {
		// 	chatview.visible = false;
		// 	firstView.visible = true;
		// }

	});

	var top = Titanium.UI.createButton({
		height:"40dp",
		width: "40dp",
		right:"5dp",
		bottom:"10dp",
		zIndex : 100,
		// backgroundDisabledImage: '/images/BUTT_drk_off.png'
		backgroundImage : "/top1.png",
		backgroundSelectedImage:'/top2.png'
	});

	self.add(gpsLabel);
	self.add(bottom);
	self.add(top);

	return self;
}

module.exports = BottomView;
