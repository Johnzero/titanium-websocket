
function register(path,method,username,password) {

	var url = "http://" + localhost + "/" + path + "/" + username + "/" + password;
	// var url = "http://www.cngulu.com/wp-content/themes/gulutech/test.php";
	var client = Ti.Network.createHTTPClient({

		onload : function(e) {
		    var data = this.responseText;
		    if (data == "true") {
				Ti.App.fireEvent("MainWindowOpen",{});
		    }else if (data == "IntegrityError") {
		    	alert("换个姓名试试！");
		    }else if (data == "ServerError") {
		    	alert("服务器有个Bug！玩不下去了。");
		    };
		},
		onerror : function(e) {
		    alert(e.error+"连接失败，请检查网络");
		},
		timeout : 5000
	});
	client.open(method, url);
	client.send();
}

module.exports = register;