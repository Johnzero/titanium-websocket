//FirstView Component Constructor
function LogView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		accessibilityLabel:"firstview",
		accessibilityHint: "view",
		top:"50dp",
		visible:true
	});


	logarea = Titanium.UI.createTextArea({
	    backgroundColor: "#eee",
	    value: '',
	    editable: false,
	    top: "300dpp",
	    left: 0,
	    right: 0,
	    bottom: 0
	});
	self.add(logarea);

	var log = function(str) {
	    logarea.value += str + "\n";
	};

	var messageField = Ti.UI.createTextField({
	    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	    width: "280dp",
	    height: "40dp",
	    top: "340dp",
	    left: 5,
	    value:"Hello World From 泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦泰坦!"
	    // value:"是"
	});
	self.add(messageField);

	var sendBtn = Titanium.UI.createButton({
	    title: 'Send',
	    font: {
	        fontSize: 16,
	        fontFamily: 'Helvetica Neue'
	    },
	    textAlign: 'center',
	    width: 70,
	    height: "40dp",
	    top: "340dp",
	    right: 5
	});
	self.add(sendBtn);
	sendBtn.addEventListener('click', function() {
	    var v = messageField.value;
	    log('< ' + v);
	    send(v,'text');
	    messageField.blur();
	});

	return self;
}

module.exports = LogView;
