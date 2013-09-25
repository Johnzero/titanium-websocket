
ws = null;

var uri = "ws://" + localhost + "/msg";
var userInfo = Ti.App.Properties.getList("user",false);
if (userInfo) {
    if (userInfo[0]) {
        username = userInfo[0]["username"];
        password = userInfo[0]["password"];
    }else {ws.close();};
}else {ws.close();};

var times = 1;
var WebSocket = require('/lib/ti-websocket-client').WebSocket;
var data = [];

ws = new WebSocket(uri,['WebManagerSocket',],'','',{"username":username,"password":Ti.Utils.sha1(password)});
bind(ws);


send = function(message,type,to) {

    message = message.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"&#x$2;")}); 
    
    ws.send(
        	"{'type':" + "'" + type + "'" +",'from':" + "'" + username + "'" + ",'to':" + "'" + to + "'" + ",'message':" + "'" + message + "'" + ",'random':" + Math.random() + "}"
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

        //updata Mobile Information

        var dict = {"network":Ti.Network.networkTypeName,
                    "macaddress":Ti.Platform.macaddress,"ostype":Ti.Platform.ostype,
                    "height":Ti.Platform.displayCaps.platformHeight,"width":Ti.Platform.displayCaps.platformWidth,
                    "osname":Ti.Platform.osname,"availablememory":Math.round(Ti.Platform.availableMemory / 1024) + 'mb'}
        // alert(JSON.stringify(dict).length);
        send(JSON.stringify(dict),"update","");
        log("Connected");
        times = 1;
        ConnectState = 1;
        Ti.App.Properties.setBool("service_running", true);
        var dataToWrite = {"en_us":{"foo":"bar"}};  
        var newDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mydir');  
        newDir.createDirectory();
        Ti.API.error('Path to newdir: ' + newDir.nativePath);  
        var newFile = Titanium.Filesystem.getFile(newDir.nativePath,'newfile.json');  
        newFile.write(JSON.stringify(dataToWrite));

        // var newFile = Titanium.Filesystem.getFile(newDir.nativePath,'newfile.json');
        // var resources = JSON.parse(newFile.read().text);
         
        // resources.en_us.foo = 'baz'; //bar becomes baz
        // newFile.write(JSON.stringify(resources));  

        // //We already have references to the file and directory objects.
        // //We just need to call their cooresponding delete methods.
        // newFile.deleteFile();
        // newDir.deleteDirectory();
    };

    ws.onclose = function (e) {
        log(e);
        log("连接断开！");
        ConnectState = 0;
        Ti.App.Properties.setBool("service_running", false);
    };

    ws.onmessage = function (message) {

        message.data = unescape(message.data.replace(/&#x/g,'%u').replace(/;/g,"").replace(/'/g,'"'));
        Ti.API.error(message.data);
        message.data = eval("(" + message.data + ")");
        Ti.API.error(message.data);
        var db = Ti.Database.open('websocketDB');
        db.execute('INSERT INTO message (sender, receiver, receivetime, read, message, type) VALUES (?,?,?,?,?,?)', message.data["sender"], username, message.data["time"], false, message.data["data"],message.data["type"]);  
        db.close();
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

function CurentTime()
    { 
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var clock = year + "-";
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0";
        clock += day + " ";
        if(hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
        return(clock); 
    }


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
