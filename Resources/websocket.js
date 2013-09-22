
ws = null;

var uri = "ws://" + localhost + "/msg";
var times = 1;
var WebSocket = require('/lib/ti-websocket-client').WebSocket;

ws = new WebSocket(uri,['WebManagerSocket',]);
bind(ws);

var userInfo = Ti.App.Properties.getList("user",false);
if (userInfo) {
    if (userInfo[0]) {
        username = userInfo[0]["username"];
        password = userInfo[0]["password"];
    }else {ws.close();};
}else {ws.close();};

send = function(message,type) {

    message = message.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"&#x$2;")}); 
    
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

    ws.onclose = function (e) {
        log(e);
        log("连接断开！");
        Ti.API.error("clse+{+++++++++++");
        ConnectState = 0;
        Ti.App.Properties.setBool("service_running", false);
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
        Ti.API.error(e.error);
        Ti.API.error("onerror++++++++++++");
        Ti.App.Properties.setBool("service_running", false);
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

// if (ConnectState == 1) {
//             ws.onclose();
//             setTimeout(function() {
//                 ws._connect();
//                 // times = times * 2;
//             },500*times);
//             return ;
//         };
//         log('Error: ' + (e ? JSON.stringify(e) : 'A unknown error occurred'));
//         setTimeout(function() {
//             ws._connect();
//             times = times * 2;
//         },100*times);