//FirstView Component Constructor
function SettingsView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		accessibilityLabel:"settingsview",
		accessibilityHint: "view",
		visible:true,
		backgroundColor : '#333'
	});

	var listView = Ti.UI.createListView({

	});


					

	return self;
}

module.exports = SettingsView;
