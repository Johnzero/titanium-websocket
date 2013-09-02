
var uri = "ws://120.209.194.240:8080/msg";

var WebSocket = require('/lib/ti-websocket-client').WebSocket;

ws = new WebSocket(uri,['WebManagerSocket',]);

ws.onopen = function () {
	Ti.API.info("message Connected");
	log("Connected");
};

ws.onclose = function () {
	alert("Disconnect!");
};

ws.onmessage = function (message) {
    if (IsBackground == true) {
        var createNotificationViaService = require('lib/intent');
        new createNotificationViaService(message.data);
    	log("> "+message.data);
    }else {
        log("> "+message.data);
    }

};

ws.onerror = function (e) {
	log('Error: ' + (e ? JSON.stringify(e) : 'A unknown error occurred'));
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

var log = function(str) {
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