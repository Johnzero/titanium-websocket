//FirstView Component Constructor
function ChatWindow(navController) {

		var ChatView = require('/ui/common/ChatView');

		var chatview = new ChatView();

		var self = Ti.UI.createWindow({
			title:ChatWindow,
			backgroundColor:'white',
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

		var button = Ti.UI.createButton({
			title: 'close',
			height: '50dp',
			width: '200dp',
			top: '50dp'
		});

		button.addEventListener('click', function(e) {
			navController.home();
			
		});
					
		self.add(button);
		// self.add(chatview);
		
		self.addEventListener("open", function() {

	    	var activitysss = Ti.Android.currentActivity;

		});

		var BottomView = require('ui/common/BottomView');
		var bottomview = new BottomView(navController);
		
		self.add(bottomview);

		return self;
			
}

module.exports = ChatWindow;