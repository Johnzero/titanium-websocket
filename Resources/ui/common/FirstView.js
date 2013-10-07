//FirstView Component Constructor
function FirstView() {

	var plainTemplate = {
	    childTemplates: [
	        {
	            type: 'Ti.UI.Label', // Use a label
	            bindId: 'rowtitle',  // Bind ID for this label
	            properties: {
	            	height: '30dp',
	                  // Sets the Label.left property
	                left: '55dp',
	                top:"30dp",
	                color : "gray",
	                font:{fontSize:"15dp"}
	            }
	        },
	        {
	            type: 'Ti.UI.Label', // Use a label
	            bindId: 'username',  // Bind ID for this label
	            properties: {
	                left: '55dp',
	                top:"5dp",
	                color : "black",
	                font:{fontSize:"20dp", fontWeight:'bold'}
	            }
	        },
	        {
	            type: 'Ti.UI.ImageView',  // Use an image view
	            bindId: 'pic',            // Bind ID for this image view
	            properties: {    
	            	left:"5dp", 
	            	width:"30dp",   
	            	image: '/ic_launcher.png'
	            }
	        },
	        {
	            type: 'Ti.UI.Label', // Use a label
	            bindId: 'time',  // Bind ID for this label
	            properties: {
	            	height: '50dp',
	            	top:"-10dp",
	                  // Sets the Label.left property
	                right: '0dp',
	                color : "gray",
	                font:{fontSize:"13dp", fontWeight:'bold'}
	            }
	        },                  
	    ]
	};

	var listView = Ti.UI.createListView({
		accessibilityLabel:"firstview",
		accessibilityHint: "view",
		backgroundColor:"white",
		visible:true,
		top:"50dp",
		bottom:"50dp",
	    // Maps the plainTemplate object to the 'plain' style name
	    templates: { 'plain': plainTemplate },
	    // Use the plain template, that is, the plainTemplate object defined earlier
	    // for all data list items in this list view
	    defaultItemTemplate: 'plain'               
	});

	var data = [];

	sectionList = Ti.UI.createListSection();

	var db = Ti.Database.open('websocketDB');
	var currentmsg = db.execute('SELECT id, sender, receiver, receivetime, read, message, type FROM message ORDER BY id asc');
	while (currentmsg.isValidRow())
	{	
        if (sectionList.getItemAt(0) == null) {
            data.push({
                rowtitle : {text: currentmsg.fieldByName("message")},
                time : {text: currentmsg.fieldByName("receivetime")},
                username : {text: currentmsg.fieldByName("sender")},
                properties : {
                    itemId: currentmsg.fieldByName("sender"),
                    backgroundImage:"/pay_bill_success_bg.png",
                    accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
                }
            });
            sectionList.appendItems(data);
            data = [];
        }else {
            for (var i = 0;i < sectionList.items.length; i++ ) {
                if(sectionList.items[i].username.text == currentmsg.fieldByName("sender")) {
                    var item = sectionList.getItemAt(i);
                    item.rowtitle.text = currentmsg.fieldByName("message");
                    item.time.text = currentmsg.fieldByName("receivetime");
                    // sectionList.deleteItemsAt(i,1);
                    sectionList.updateItemAt(i,item);
                    // sectionList.appendItems(data);
                    exsit = true;
                }
            }
            if (!exsit) {
	            data.push({
	                rowtitle : {text: currentmsg.fieldByName("message")},
	                time : {text: currentmsg.fieldByName("receivetime")},
	                username : {text: currentmsg.fieldByName("sender")},
	                properties : {
	                    itemId: currentmsg.fieldByName("sender"),
	                    backgroundImage:"/pay_bill_success_bg.png",
	                    accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
	                }
	            });
	            sectionList.appendItems(data);
            	data = [];
            }
        };
	    currentmsg.next();
	}
	
	currentmsg.close();
	db.close();

	listView.sections = [sectionList];
	listView.addEventListener('itemclick', function(e){

	    // if (e.bindId == 'rowtitle' || e.bindId == 'pic') {
	    //     var item = e.section.getItemAt(e.itemIndex);
	    //     if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
	    //         item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
	    //     }
	    //     else {
	    //         item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
	    //     }
	    //     e.section.updateItemAt(e.itemIndex, item);
	    // }
	    var ChatWindow = require("/ui/ChatWindow");
		setTimeout(function () {IsBackground = false;},500);
		new ChatWindow(e.itemId).open();
	});

	return listView;
}

module.exports = FirstView;
