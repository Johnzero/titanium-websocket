//FirstView Component Constructor
function SettingsView() {

	var listView = Ti.UI.createListView({

	});

	// var self = Ti.UI.createListView({
	// 	accessibilityLabel:"settingsview",
	// 	accessibilityHint: "view",
	// 	visible:true,
	// 	backgroundColor : 'white'
	// });

	// function getSection(count){
	// 	var data = [
	// 		{properties:{title:'ITEM 0 in Section '+count}},
	// 		{properties:{title:'ITEM 1 in Section '+count}},
	// 		{properties:{title:'ITEM 2 in Section '+count}},
	// 	]
	// 	var section = Ti.UI.createListSection({
	// 		headerTitle:''
	// 	})
	// 	section.setItems(data);
	// 	return section;
	// }

	var button = Ti.UI.createButton({
		right:0,
		title:'APPEND'
	});

	var plainTemplate = {
	    childTemplates: [
	        {
	            type: 'Ti.UI.Label', // Use a label
	            bindId: 'rowtitle',  // Bind ID for this label
	            properties: {        // Sets the Label.left property
	                left: '10dp'
	            }
	        },
	        {
	            type: 'Ti.UI.ImageView',  // Use an image view
	            bindId: 'pic',            // Bind ID for this image view
	            properties: {             // Sets the ImageView.image property
	            	image: 'KS_nav_ui.png'
	            }
	        },                    
	        {
	            type: 'Ti.UI.Button',   // Use a button
	            bindId: 'button',       // Bind ID for this button
	            properties: {           // Sets several button properties
	                width: '80dp',
	                height: '40dp',                        	
	                right: '10dp',
	                title: 'press me'
	            },
	            events: { click : report }  // Binds a callback to the button's click event
	        }
	    ]
	};

	function report(e) {
		Ti.API.info(e.type);
	}

	var listView = Ti.UI.createListView({
		accessibilityLabel:"settingsview",
		accessibilityHint: "view",
		backgroundColor:"#333",
		visible:true,
	    // Maps the plainTemplate object to the 'plain' style name
	    templates: { 'plain': plainTemplate },
	    // Use the plain template, that is, the plainTemplate object defined earlier
	    // for all data list items in this list view
	    defaultItemTemplate: 'plain'               
	});

	var data = [];
	for (var i = 0; i < 5; i++) {
	    data.push({
	        // Maps to the rowtitle component in the template
	        // Sets the text property of the Label component
	        rowtitle : { text: 'Row ' + (i + 1) },
	        // Sets the regular list data properties
	        properties : {
	            itemId: 'row' + (i + 1),
	            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
	        }
	    });
	}

	var sectionList = Ti.UI.createListSection({items: data});
	
	listView.sections = [sectionList];
	listView.addEventListener('itemclick', function(e){
	    // Only respond to clicks on the label (rowtitle) or image (pic)
	    if (e.bindId == 'rowtitle' || e.bindId == 'pic') {
	        var item = e.section.getItemAt(e.itemIndex);
	        if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
	            item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
	        }
	        else {
	            item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
	        }
	        e.section.updateItemAt(e.itemIndex, item);
	    }      
	});

	button.addEventListener('click',function(){
		// self.appendSection(getSection(appendCount));
		// appendCount++;
		sectionList.appendItems(data);
	})

	listView.add(button);

	return listView;
}

module.exports = SettingsView;
