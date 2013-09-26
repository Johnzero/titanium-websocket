
function ChatWindow(id) {

	var self = Ti.UI.createWindow({
		backgroundColor:'#222',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		fullscreen: false,
		navBarHidden : true,
		zIndex:2000
	});


	var tableView = Ti.UI.createTableView({
		accessibilityLabel:"chatview",
		accessibilityHint: "view",
		visible:true,
		top:"50dp",
		bottom:"50dp",
		backgroundColor:'white',
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
	        fontSize: 16,
	        fontFamily: 'Helvetica Neue'
	    },
	    textAlign: 'center',
	    width: "50dp",
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
	self.add(tableView);

	var db = Ti.Database.open('websocketDB');
	var currentmsg = db.execute('SELECT sender, receiver, receivetime, read, message, type FROM message WHERE sender = ?',id);
	var row = Ti.UI.createTableViewRow({
	    backgroundSelectedColor:'white',
	    minRowHeight:"100dp",
	    backgroundColor:"transparent"
	});

	while (currentmsg.isValidRow())
	{	
		var row = Ti.UI.createTableViewRow({
		    backgroundSelectedColor:'white',
		    minRowHeight:"100dp",
		    backgroundColor:"transparent"
		});
		var IMG_BASE = '/new' + "/" + "emoji_" + Math.ceil(Math.random()*(470-1)+1) + ".png";
		var imageAvatar = Ti.UI.createImageView({
		    image: IMG_BASE,
		    left:"5dp",
		  });
		row.add(imageAvatar);
		var labelDetails = Ti.UI.createLabel({
			color:'#222',
			font:{fontFamily:'Arial', fontSize:"16dp", fontWeight:'normal'},
			text:currentmsg.fieldByName("message"),
			left:"70dp",
			right:"10dp",
			top:"10dp",
			bottom:"10dp",
			width:Ti.UI.SIZE,
			height:"100dp",
			backgroundImage:"/favorite_bg_voice.9.png"
		});
		row.add(labelDetails);
		tableView.appendRow(row);
		row = '';
	    currentmsg.next();
	}
	currentmsg.close();
	db.close();

	return self;
				
}

module.exports = ChatWindow;
