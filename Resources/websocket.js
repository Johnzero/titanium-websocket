
ws = null;

var userInfo = Ti.App.Properties.getList("user",false);
if (userInfo) {
    if (userInfo[0]) {
        username = userInfo[0]["username"];
        password = userInfo[0]["password"];
    }else {ws.close();};
}else {ws.close();};

var uri = "ws://120.209.194.240:8080/msg";
//  + "?username=" + username + "&password=" + Ti.Utils.sha1(password);

var times = 1;
var WebSocket = require('/lib/ti-websocket-client').WebSocket;
var data = [];

ws = new WebSocket(uri,['WebManagerSocket',],'','',{"username":username,"password":Ti.Utils.sha1(password)});
bind(ws);


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
        ConnectState = 0;
        Ti.App.Properties.setBool("service_running", false);
    };

    ws.onmessage = function (message) {

        message.data = unescape(message.data.replace(/&#x/g,'%u').replace(/;/g,''));
        log("> "+message.data);
        if (message.data.length > 20) {
            var txt = message.data.substr(0, 20) + "...";
        }else {
            var txt = message.data;
        };
        data.push({
            rowtitle : {text: txt},
            username : {text: username},
            properties : {
                itemId: 'row',
                backgroundColor:"rgb(239,239,239)",
                accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
            }
        });
        sectionList.appendItems(data);
        data = [];
        txt = '';
        if (IsBackground) {
            var createNotificationViaService = require('lib/intent');
            new createNotificationViaService(message.data);
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