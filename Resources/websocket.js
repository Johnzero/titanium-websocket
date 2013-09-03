
ws = null;

var uri = "ws://120.209.194.240:8080/msg";
var times = 1;
var WebSocket = require('/lib/ti-websocket-client').WebSocket;

ws = new WebSocket(uri,['WebManagerSocket',]);

var ConnectState = 0;

ws.onopen = function () {
	log("Connected");
    ConnectState = 1;
    Ti.App.Properties.setBool("service_running", true);
};

ws.onclose = function () {
	log("连接断开！");
    Ti.App.Properties.setBool("service_running", false);
    setTimeout(function() {
        ws = new WebSocket(uri,['WebManagerSocket',]);
        times = times * 2;
    },2000*times);
};

ws.onmessage = function (message) {
    if (IsBackground) {
        var createNotificationViaService = require('lib/intent');
        new createNotificationViaService(message.data);
        log("> "+message.data);
    }
    else {
        log("> "+message.data);
    }

};

ws.onerror = function (e) {
    Ti.App.Properties.setBool("service_running", false);
    if (ConnectState == 1) {
        ws.onclose();
        return ;
    };

	log('Error: ' + (e ? JSON.stringify(e) : 'A unknown error occurred'));
    setTimeout(function() {
        ws = new WebSocket(uri,['WebManagerSocket',]);
        times = times * 2;
    },2000*times);
};

send = function(message) {

	var data = function() {
        ws.send(
        	"{'send':1,'type':'text','message':" + message +",'random:'" + Math.random() + "}"
        );
    };

    if (ws.readyState !== 1) {
        ws.close();
        ws = new WebSocket(uri,['WebManagerSocket',]);
        if (ws.readyState !== 1) {
        	alert("网络异常，请重新连接！");
        	return ;
        };
        setTimeout(function() {
            data();
        }, 250);
    } else {
        data();
    };

};

log = function(str) {
	logarea.value += str + "\n";
	if (logarea.value.length > 180) {
		logarea.value = "";
	}
};



// var message = {
//   time: new Date(),
//   text: "Hello World!",
//   clientId: "adkeig393g8dk"
// };      

// socket.send(JSON.stringify(message));