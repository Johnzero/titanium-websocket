
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
		minRowHeight:"60dp",
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
	    bottom: "5dp",
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
	    bottom: "5dp",
	    zIndex : 2500,
	    right: "5dp"
	});

	var bottom = Ti.UI.createLabel ({
		backgroundColor:'darkgray',
		text: '',
		textAlign: 'center',
		bottom:"0",
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
	while (currentmsg.isValidRow())
	{	
		var row = Ti.UI.createTableViewRow({
		    minRowHeight:"60dp"
		});
		var IMG_BASE = '/new' + "/" + "emoji_" + Math.ceil(Math.random()*(470-1)+1) + ".png";
		var imageAvatar = Ti.UI.createImageView({
		    image: IMG_BASE,
		    top:"15dp",
		    left:"5dp",
		  });
		row.add(imageAvatar);
		var labelDetails = Ti.UI.createLabel({
			color:'#222',
			font:{fontSize:"18dp", fontWeight:'blod'},
			text:currentmsg.fieldByName("message"),
			left:"30dp",
			right:"10dp",
			top:"10dp",
			bottom:"10dp",
			textAlign:"left",
			width:Ti.UI.SIZE,
			accessibilityLabel:"label",
			backgroundImage:"chatfrom_bg_normal.9.png",
			backgroundSelectedImage:"/chatfrom_bg_pressed.9.png"
		});
		labelDetails.addEventListener("click",function(e) {
			alert(labelDetails.toImage().width);
		})

		row.add(labelDetails);
		tableView.appendRow(row);
		row = '';
	    currentmsg.next();
	}
	currentmsg.close();
	db.close();

	self.addEventListener("open",function(e) {
		Ti.API.error(JSON.stringify(tableView.sections[0].rows));
	})
	return self;
				
}

module.exports = ChatWindow;
