/*
* EaselJS Paint2 UI
* Copyright (c) 2012 drowsepost.com
* required CreateJS 0.4.2 and up
*
* MIT License
*/
function uiForPaint2(){
	var self = this;
	
	self.init = function(element_id) {
		canvas = document.getElementById(element_id);
		canvas_ctx = canvas.getContext("2d");
		
		stage = new Stage(canvas);
		stage.autoClear = false;
		stage.snapToPixelEnabled = true;
		stage.onMouseDown = handleMouseDown;
		stage.onMouseUp = handleMouseUp;
		stage.onMouseMove = handleMouseMove;
		
		//Ticker.setFPS(30);
		//Ticker.addListener(window);
		Touch.enable(stage);
		stage.update();
	}
	
}
