//FirstView Component Constructor
function FirstView() {

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

	var plainTemplate = {
	    childTemplates: [
	        {
	            type: 'Ti.UI.Label', // Use a label
	            bindId: 'rowtitle',  // Bind ID for this label
	            properties: {
	            	height: '30dp',
	                  // Sets the Label.left property
	                left: '50dp',
	                top:"30dp",
	                color : "gray",
	                font:{fontSize:"15dp"}
	            }
	        },
	        {
	            type: 'Ti.UI.Label', // Use a label
	            bindId: 'username',  // Bind ID for this label
	            properties: {
	                left: '50dp',
	                top:"5dp",
	                color : "black",
	                font:{fontSize:"20dp", fontWeight:'bold'}
	            }
	        },
	        {
	            type: 'Ti.UI.ImageView',  // Use an image view
	            bindId: 'pic',            // Bind ID for this image view
	            properties: {    
	            	left:0,         // Sets the ImageView.image property
	            	image: 'ic_launcher.png'
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
	                text : CurentTime(),
	                font:{fontSize:"13dp", fontWeight:'bold'}
	            }
	        },                  
	        // {
	        //     type: 'Ti.UI.Button',   // Use a button
	        //     bindId: 'button',       // Bind ID for this button
	        //     properties: {           // Sets several button properties
	        //         width: '80dp',
	        //         height: '40dp',                        	
	        //         right: '10dp',
	        //         title: 'press me'
	        //     },
	        //     events: { click : report }  // Binds a callback to the button's click event
	        // }
	    ]
	};

	function report(e) {
		Ti.API.info(e.type);
	}

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
	// for (var i = 0; i < 5; i++) {
	//     data.push({
	//         // Maps to the rowtitle component in the template
	//         // Sets the text property of the Label component
	//         rowtitle : { text: 'Row ' + (i + 1) },
	//         // Sets the regular list data properties
	//         properties : {
	//             itemId: 'row' + (i + 1),
	//             accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
	//         }
	//     });
	// }

	sectionList = Ti.UI.createListSection();
	
	listView.sections = [sectionList];
	listView.addEventListener('itemclick', function(e){

		Ti.API.error(e.itemIndex);
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
		new ChatWindow(e.itemId).open();     
	});

	return listView;
}

module.exports = FirstView;
