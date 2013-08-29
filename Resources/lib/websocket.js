
var uri = "ws://120.209.194.240:8080/msg";

var WebSocket = require('/lib/ti-websocket-client').WebSocket;

ws = new WebSocket(uri,['WebManagerSocket',]);

ws.onopen = function () {
	Ti.API.info("message Connected");
	log("Connected");
};

ws.onclose = function () {
	log("Disconnected");
};

ws.onmessage = function (message) {
	log("> "+message.data);
};

ws.onerror = function (e) {
	log('Error: ' + (e ? JSON.stringify(e) : 'A unknown error occurred'));
};

var log = function(str) {
	logarea.value += str + "\n";
	if (logarea.value.length > 200) {
		logarea.value = "";
	}
};