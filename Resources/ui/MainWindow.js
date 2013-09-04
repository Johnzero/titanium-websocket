//Application Window Component Constructor
function MainWindow() {

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
	var FirstView = require('ui/common/FirstView');
	var firstview = new FirstView();
	var ChatView = require('ui/common/ChatView');
	var chatview = new ChatView();
	var FriendsView = require('ui/common/FriendsView');
	var friendsview = new FriendsView();

	var bottom = Ti.UI.createLabel ({
		backgroundColor:'darkgray',
		text: '',
		textAlign: 'center',
		bottom:0,
		width: Titanium.UI.FILL, 
		backgroundImage:"/grad.png",
		zIndex : 600,
		height:"50dp"
	});

	var weixin = Ti.UI.createButton({
		backgroundImage : "/tab_weixin_pressed.png",
		zIndex : 800,
		bottom:"15dp",
		left:"20dp",
		height:"30dp",
		width:"30dp"
	});
	var weixinlabel = Ti.UI.createLabel({
		text:"微信",
		textAlign: 'center',
		backgroundColor:'transparent',
		zIndex : 900,
		bottom:0,
		left:"20dp",
		width:"30dp",
		font: {
		    fontSize: '11dp'
		},
		touchEnabled:false
	});


	var address = Ti.UI.createButton({
		backgroundImage : "/tab_address_normal.png",
		zIndex : 800,
		bottom:"15dp",
		left:"105dp",
		height:"30dp",
		width:"30dp"
	});
	var addresslabel = Ti.UI.createLabel({
		text:"通讯录",
		textAlign: 'center',
		backgroundColor:'transparent',
		zIndex : 900,
		bottom:0,
		left:"102dp",
		width:"35dp",
		touchEnabled:false,
	    font: {
		    fontSize: '11dp'
		}
	});

	var friends = Ti.UI.createButton({
		backgroundImage : "/tab_find_frd_normal.png",
		zIndex : 800,
		bottom:"15dp",
		left:"187dp",
		height:"30dp",
		width:"30dp"
	});
	var friendslabel = Ti.UI.createLabel({
		text:"朋友圈",
		textAlign: 'center',
		backgroundColor:'transparent',
		zIndex : 900,
		bottom:0,
		left:"182dp",
		width:"40dp",
	    font: {
		    fontSize: '11dp'
		},
		touchEnabled:false
	});

	var settings = Ti.UI.createButton({
		backgroundImage : "/tab_settings_normal.png",
		zIndex : 800,
		bottom:"15dp",
		right:"20dp",
		height:"30dp",
		width:"37dp"
	});
	var settingslabel = Ti.UI.createLabel({
		text:"设置",
		textAlign: 'center',
		backgroundColor:'transparent',
		zIndex : 900,
		bottom:0,
		right:"20dp",
		width:"40dp",
	    font: {
		    fontSize: '11dp'
		},
		touchEnabled:false
	});

	weixin.addEventListener("click",function () {

		if (weixin.backgroundImage == "/tab_weixin_pressed.png") {
			return ;
		};

		weixin.backgroundImage = "/tab_weixin_pressed.png";
		address.backgroundImage = "/tab_address_normal.png";
		friends.backgroundImage = "/tab_find_frd_normal.png";
		settings.backgroundImage = "/tab_settings_normal.png";

		hideview();
		firstview.visible = true;

	});

	address.addEventListener("click",function () {

		if (address.backgroundImage == "/tab_address_pressed.png") {
			return ;
		};

		weixin.backgroundImage = "/tab_weixin_normal.png";
		address.backgroundImage = "/tab_address_pressed.png";
		friends.backgroundImage = "/tab_find_frd_normal.png";
		settings.backgroundImage = "/tab_settings_normal.png";

		hideview();

		chatview.visible = true;

	});

	friends.addEventListener("click",function () {

		if (friends.backgroundImage == "/tab_find_frd_pressed.png") {
			return ;
		};

		weixin.backgroundImage = "/tab_weixin_normal.png";
		address.backgroundImage = "/tab_address_normal.png";
		friends.backgroundImage = "/tab_find_frd_pressed.png";
		settings.backgroundImage = "/tab_settings_normal.png";

		hideview();
		friendsview.visible = true;
		
	});

	settings.addEventListener("click",function () {
		
		if (settings.backgroundImage == "/tab_settings_pressed.png") {
			return ;
		};

		weixin.backgroundImage = "/tab_weixin_normal.png";
		address.backgroundImage = "/tab_address_normal.png";
		friends.backgroundImage = "/tab_find_frd_normal.png";
		settings.backgroundImage = "/tab_settings_pressed.png";
	});

	self.add(bottom);
	self.add(weixin);
	self.add(weixinlabel);
	self.add(address);
	self.add(addresslabel);
	self.add(friends);
	self.add(friendslabel);
	self.add(settings);
	self.add(settingslabel);

	// self.addEventListener('android:back', function(){
		
	// });

	self.add(firstview);
	self.add(chatview);
	self.add(friendsview);
	chatview.visible = false;
	friendsview.visible = false;

	function hideview () {

		for (var i = 0;i<self.children.length;i++) {

			if (self.children[i].accessibilityHint == "view") {
				self.children[i].visible = false;
			};
		};
	}

	return self;
				
}

//make constructor function the public component interface
module.exports = MainWindow;
