
function register(path,method,username,password) {

	var url = "http://" + localhost + "/" + path + "/" + username + "/" + password;
	// var url = "http://www.cngulu.com/wp-content/themes/gulutech/test.php";
	var client = Ti.Network.createHTTPClient({

		onload : function(e) {
		    var data = this.responseText;
		    if (data == "true") {
		    	Ti.UI.currentWindow.close();
				Ti.App.Properties.setBool("login", true);
				Ti.App.Properties.setList("user",[{"username":username,"password":password}]);
				var mainWindow = require("/ui/MainWindow");
				actInd.hide();
				new mainWindow().open();
		    }else if (data == "IntegrityError") {
		    	actInd.hide();
		    	alert("换个姓名试试！");
		    }else if (data == "ServerError") {
		    	actInd.hide();
		    	alert("服务器有个Bug！玩不下去了。");
		    };
		},
		onerror : function(e) {
			actInd.hide();
		    alert(e.error+"连接失败，请检查网络");
		},
		timeout : 5000
	});
	client.open(method, url);
	client.send();
}

module.exports = register;