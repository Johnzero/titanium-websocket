
function LoginWindow() {

	var self = Ti.UI.createWindow({
		backgroundImage : "/login.png",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		fullscreen: false,
		exitOnclose:true,
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
		value:Math.ceil(Math.random()*100000000),
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
		width:"50dp",
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

	// self.add(imageLeft);
	// self.add(imageRight);
	
	self.add(username);
	self.add(password);
	self.add(login);
	self.add(register);

	return self;
				
}

module.exports = LoginWindow;
