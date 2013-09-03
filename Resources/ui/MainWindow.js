//Application Window Component Constructor
function MainWindow() {

	var FirstView = require('ui/common/FirstView');
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#222',
		exitOnClose:false,
		// modal:true,
		activity : {
		onCreateOptionsMenu : function(e) {
			var menu = e.menu;
			var m1 = menu.add({ title : 'Close Window' });
			m1.setIcon(Ti.Android.R.drawable.ic_menu_close_clear_cancel);
			m1.addEventListener('click', function(e) {
				Ti.Android.currentActivity.finish();
			});
		}
	}
	});
		
	//construct UI
	var firstView = new FirstView();
	self.add(firstView);


	firstView.visible = true;
	var ChatView = require('ui/common/ChatView');
	var chatview = new ChatView();

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
		Ti.Android.currentActivity.finish();

	});

	self.add(bottom);

	// self.addEventListener('android:back', function(){
		
	// });
			
	return self;
				
}

//make constructor function the public component interface
module.exports = MainWindow;
