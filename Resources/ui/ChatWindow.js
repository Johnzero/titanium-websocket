
function ChatWindow(id) {

	var self = Ti.UI.createWindow({
		backgroundColor:'#222',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		fullscreen: false,
		navBarHidden : true,
		zIndex:2000
	});

	var listView = Ti.UI.createListView({
		accessibilityLabel:"chatview",
		accessibilityHint: "view",
		backgroundColor:"white",
		visible:true,
		top:"50dp",
		bottom:"50dp"
	});

	var top = Ti.UI.createLabel ({
		text: id,
		textAlign: 'center',
		top:0,
		width: Titanium.UI.FILL, 
		backgroundImage:"/title_bar.9.png",
		height:"50dp",
		color:"white",
		font: {
		    fontSize: '20dp',fontWeight :"bold"
		},
	});

	var messageField = Ti.UI.createTextField({
	    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	    width: Ti.UI.width,
	    height: "40dp",
	    bottom: "0dp",
	    right: "60dp",
	    zIndex : 2500,
	    value:"Hello World From 泰坦!"
	});

	var sendBtn = Titanium.UI.createButton({
	    title: '发送',
	    font: {
	        fontSize: 20,
	        fontFamily: 'Helvetica Neue'
	    },
	    textAlign: 'center',
	    width: "40dp",
	    height: "40dp",
	    // backgroundImage:"/mmfooter_list_moreframebg.9.png",
	    bottom: "0dp",
	    zIndex : 2500,
	    right: "5dp"
	});

	var bottom = Ti.UI.createLabel ({
		backgroundColor:'darkgray',
		text: '',
		textAlign: 'center',
		bottom:0,
		width: Titanium.UI.FILL, 
		backgroundImage:"/mmfooter_text_tabbutton_normal.9.png",
		zIndex : 2000,
		height:"50dp"
	});

	sendBtn.addEventListener('click', function() {
	    var text = messageField.value;
	    send(text,'text');
	    messageField.blur();
	});

	self.add(bottom);
	self.add(sendBtn);
	self.add(messageField);
	self.add(top);
	self.add(listView);

	return self;
				
}

module.exports = ChatWindow;
