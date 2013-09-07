
ws = null;

var uri = "ws://120.209.194.240:8080/msg";
var times = 1;
var WebSocket = require('/lib/ti-websocket-client').WebSocket;

ws = new WebSocket(uri,['WebManagerSocket',]);
bind(ws);

var ConnectState = 0;

send = function(message,type) {

        ws.send(
        	"{'send':1,'type':" + "'" + type + "'" + ",'message':" + "'" + message + "'" + ",'random':" + Math.random() + "}"
        );

    // if (ws.readyState !== 1) {
    //     ws.close();
    //     ws = new WebSocket(uri,['WebManagerSocket',]);
    //     if (ws.readyState !== 1) {
    //     	alert("网络异常，请重新连接！");
    //     	return ;
    //     };
    //     setTimeout(function() {
    //         data();
    //     }, 250);
    // } else {
    //     data();
    // };

};


function bind(ws) {

    ws.onopen = function () {
        log("Connected");
        times = 1;
        ConnectState = 1;
        Ti.App.Properties.setBool("service_running", true);
    };

    ws.onclose = function () {
        log("连接断开！");
        Ti.App.Properties.setBool("service_running", false);
        setTimeout(function() {
            log('cccccccc');
            ws = null;
            ws = new WebSocket(uri,['WebManagerSocket',]);
            bind(ws);
            times = times * 2;
        },100*times);
    };

    ws.onmessage = function (message) {

        message.data = unescape(message.data.replace(/&#x/g,'%u').replace(/;/g,''));
        
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
            log('ddddddd');
            ws = null;
            ws = new WebSocket(uri,['WebManagerSocket',]);
            bind(ws);
            times = times * 2;
        },100*times);
    };

}

log = function(str) {
    logarea.value += str + "\n";
    if (logarea.value.length > 400) {
        logarea.value = "";
    }
};



// var message = {
//   time: new Date(),
//   text: "Hello World!",
//   clientId: "adkeig393g8dk"
// };      

// socket.send(JSON.stringify(message));