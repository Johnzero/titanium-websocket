//FirstView Component Constructor
function BottomView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		height:"60dp",
		bottom:0,
		zIndex : 1000

	});
	

	var bottom = Ti.UI.createLabel ({
		backgroundColor:'darkgray',
		text: '咕噜网',
		textAlign: 'center',
		bottom:0,
		width: Titanium.UI.FILL, 
		backgroundImage:"/grad.png",
		zIndex : 600,
		height:"50dp"
	});

	bottom.addEventListener("click",function () {


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

	self.add(bottom);
	self.add(top);

	return self;
}

module.exports = BottomView;
