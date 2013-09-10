//var clickX = new Array();
//var clickY = new Array();
//var clickDrag = new Array();
//var paint;
//
//var imagewidth = 125;
//var imageheight = 125;
//
//function onload() {
//
//    // Set URL of your WebSocketMain.swf here:
//    WEB_SOCKET_SWF_LOCATION = "/static/asserts/WebSocketMain.swf";
//    // Set this to dump debug message from Flash to console.log:
//    WEB_SOCKET_DEBUG = true;
//    
//    // Everything below is the same as using standard WebSocket.
//      msg = new WebSocket("ws://120.209.194.240:8080/msg");
//      img = new WebSocket("ws://120.209.194.240:8080/img");
//      img.onopen = function() {
//        output("onopen2");
//      };
//      img.onmessage = function(e) {
//        var data = e.data;
//	$("#log").append("<img src=" + data + ">");
//      };
//      img.onclose = function() {
//      };
//      img.onerror = function() {
//      };
//      // Set event handlers.
//      msg.onopen = function() {
//        $.globalMessenger().post("asdffa");
//      };
//      msg.onmessage = function(e) {
//        var data = e.data;
//        $.globalMessenger().post(data);
//      };
//      msg.onclose = function() {
//      };
//      msg.onerror = function() {
//      };
//
//
////http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple
//
//	context = document.getElementById("canvas").getContext("2d");
//	myCanvas = document.getElementById('canvas');
//	
//	myCanvas.addEventListener('mousedown',function (e){
//  		var mouseX = e.pageX - this.offsetLeft;
//		var mouseY = e.pageY - this.offsetTop;
//		
//  		paint = true;
//  		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
//  		redraw();		
//	});
//
//	myCanvas.addEventListener('mousemove',function (e){
//		if(paint){
//			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
//			redraw();
//  		}
//  	});
//
//  	myCanvas.addEventListener('mouseup',function (e) {
//  		paint = false;
//  	});
//
//  	myCanvas.addEventListener('mouseleave',function (e) {
//  		paint = false;
//  	});
//
//}
//
//function redraw(){
//  canvas.width = canvas.width;
//  
//  context.strokeStyle = "#df4b26";
//  context.lineJoin = "round";
//  context.lineWidth = 5;
//			
//  for(var i=0; i < clickX.length; i++)
//  {		
//    context.beginPath();
//    if(clickDrag[i] && i){
//      context.moveTo(clickX[i-1], clickY[i-1]);
//     }else{
//       context.moveTo(clickX[i]-1, clickY[i]);
//     }
//     context.lineTo(clickX[i], clickY[i]);
//     context.closePath();
//     context.stroke();
//  }
//}
//
//
//function addClick(x, y, dragging) {
//  clickX.push(x);
//  clickY.push(y);
//  clickDrag.push(dragging);
//}
//
//function sendphoto() {
//
//	imagedata = context.getImageData(0, 0, imagewidth,imageheight);
//	var canvaspixelarray = imagedata.data;
//	var canvaspixellen = canvaspixelarray.length;
//	var bytearray = new Uint8Array(canvaspixellen);
//  console.log(bytearray);
//
//	// connection.send(bytearray.buffer);
//	context.fillStyle = '#ffffff';
//	context.fillRect(0, 0, imagewidth,imageheight);	
//}

function onSubmit() {
      var input = document.getElementById("input");
      msg.send(input.value);
      output("send: " + input.value);
      input.value = "";
    }
    
function output(str) {
      var log = document.getElementById("msglog");
      var escaped = str.replace(/&/, "&amp;").replace(/</, "&lt;").
        replace(/>/, "&gt;").replace(/"/, "&quot;"); // "
      log.innerHTML = escaped + "<br>" + log.innerHTML;
    }

// TODO: Clear out the text and canvas so you can draw other things.
