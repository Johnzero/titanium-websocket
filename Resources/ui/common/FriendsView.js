//FirstView Component Constructor
function FriendsView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		accessibilityLabel:"friendsview",
		accessibilityHint: "view",
		visible:true,
		backgroundColor : '#333'
	});
					

	return self;
}

module.exports = FriendsView;
