//Application Window Component Constructor
function MainWindow(navController) {

	IsBackground = false;
	//load component dependencies
	var FirstView = require('ui/common/FirstView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#222',
		navBarHidden:false,
		exitOnClose:false,
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

	Ti.include("/lib/websocket.js");

	// firstView.visible = true;
	// var ChatView = require('ui/common/ChatView');
	// var chatview = new ChatView();

	var BottomView = require('ui/common/BottomView');
	var bottomview = new BottomView(navController);
	self.add(bottomview);

			
	self.addEventListener("open", function() {
		
	    var activity = self.activity;
	    activity.addEventListener('resume', function (e) {
	    	IsBackground = false;
	    	// navController.home();
	    });
	    activity.addEventListener('pause', function (e) {
	    	IsBackground = true;
	    });
	    // activity.addEventListener('destroy', OnAppDestroy);
	});
			
	return self;
				
}

//make constructor function the public component interface
module.exports = MainWindow;
