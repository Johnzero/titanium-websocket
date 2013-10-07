
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

        message.data = unescape(message.data.replace(/&#x/g,'%u').replace(/;/g,""));
        message.data = eval("(" + message.data + ")");
        var db = Ti.Database.open('websocketDB');
        db.execute('INSERT INTO message (sender, receiver, receivetime, read, message, type) VALUES (?,?,?,?,?,?)', message.data["sender"], username, message.data["time"], false, message.data["data"],message.data["type"]);  
        db.close();
        log("> "+message.data);
        if (message.data["data"].toString().length > 20) {
            var txt = message.data["data"].toString().substr(0, 20) + "...";
        }else {
            var txt = message.data["data"];
        };
        var exsit = false;
        if (sectionList.getItemAt(0) == null) {
            data.push({
                rowtitle : {text: txt},
                time : {text:message.data["time"]},
                username : {text: message.data["sender"]},
                properties : {
                    itemId: message.data["sender"],
                    backgroundImage:"/pay_bill_success_bg.png",
                    accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
                }
            });
            sectionList.appendItems(data);
        }else {
            for (var i = 0;i < sectionList.items.length; i++ ) {
                if(sectionList.items[i].username.text == message.data["sender"]) {
                    var item = sectionList.getItemAt(i);
                    item.rowtitle.text = txt;
                    item.time.text = message.data["time"];
                    // sectionList.deleteItemsAt(i,1);
                    sectionList.updateItemAt(i,item);
                    // sectionList.appendItems(data);
                    exsit = true;
                }
            }
            if (!exsit) {
                data.push({
                    rowtitle : {text: txt},
                    time : {text:message.data["time"]},
                    username : {text: message.data["sender"]},
                    properties : {
                        itemId: message.data["sender"],
                        backgroundImage:"/pay_bill_success_bg.png",
                        accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
                    }
                });
                sectionList.appendItems(data);
            }
        };
        if (ChatWindowOpen) {
            insertLeft(txt);
        };
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
