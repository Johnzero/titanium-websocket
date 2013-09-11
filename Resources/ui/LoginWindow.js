
function LoginWindow() {

	var self = Ti.UI.createWindow({
		backgroundImage : "/login.png",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		fullscreen: true,
		activity : {
			onCreateOptionsMenu : function(e) {
				var menu = e.menu;
				var m1 = menu.add({ title : '退出程序' });
				m1.setIcon(Ti.Android.R.drawable.ic_menu_close_clear_cancel);
				m1.addEventListener('click', function(e) {
					Ti.Android.currentActivity.finish();
				});
			}
		}
	});

	// 	e.actInd = Titanium.UI.createActivityIndicator({
	// 	bottom : "6dp",
	// 	width : Ti.UI.SIZE,
	// 	height : Ti.UI.SIZE
	// });
	// if (ActivityIndicatorStyle) {
	// 	e.actInd.style = ActivityIndicatorStyle.PLAIN;
	// }
	// e.actInd.font = {
	// 	fontFamily : 'Helvetica Neue',
	// 	fontSize : 15,
	// 	fontWeight : 'bold'
	// };
	// e.actInd.color = 'white';
	// e.actInd.message = 'Loading...';
	// e.actInd.width = 210;

	var username = Ti.UI.createTextField({
		value:Math.ceil(Math.random()*35),
		top : "100dp",
		width : "300dp",
		height : Ti.UI.SIZE
	});
	var password = Ti.UI.createTextField({
		value:"123",
		top : "150dp",
		width : "300dp",
		height : Ti.UI.SIZE
	});

	var register = Ti.UI.createButton({
		top : "200dp",
		left: "100dp",
		title : "注册"
	});
	var login = Ti.UI.createButton({
		top : "200dp",
		right: "100dp",
		title : "登陆"
	});

	login.addEventListener("click", function () {
		alert("fuck!");
	});

	register.addEventListener("click", function () {

		var register = require("/lib/register");
		var registerfunc = new register("register","POST",username.value,password.value);
		
	});


	Ti.App.addEventListener("MainWindowOpen",function(e) {
		self.close();
		self = null;
		alert("run");
		Ti.App.Properties.setBool("login", true);
		var Window = require("/ui/MainWindow");
		new Window().open();

	});

	// self.add(imageLeft);
	// self.add(imageRight);
	self.add(username);
	self.add(password);
	self.add(login);
	self.add(register);

	return self;
				
}

module.exports = LoginWindow;
