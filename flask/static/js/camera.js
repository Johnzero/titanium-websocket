$(document).ready(function() {
    $("#webcam").scriptcam({
        width: 320,
        path:'/static/ScriptCam/',
        height: 240,
        onWebcamReady:onWebcamReady,
        onError:onError,
        showMicrophoneErrors:false,
        cornerRadius:0,
        onPictureAsBase64:base64_tofield_and_image
    });
})
			function base64_tofield() {
				$('#formfield').val($.scriptcam.getFrameAsBase64());
			};
			function base64_toimage() {
				$('#image').attr("src","data:image/png;base64,"+$.scriptcam.getFrameAsBase64());
                img.send($.scriptcam.getFrameAsBase64());
			};
			function base64_tofield_and_image(b64) {
				$('#formfield').val(b64);
				$('#image').attr("src","data:image/png;base64,"+b64);
			};
			function changeCamera() {
				$.scriptcam.changeCamera($('#cameraNames').val());
			}
			function onError(errorId,errorMsg) {
				$( "#btn1" ).attr( "disabled", true );
				$( "#btn2" ).attr( "disabled", true );
				alert(errorMsg);
			}			
			function onWebcamReady(cameraNames,camera,microphoneNames,microphone,volume) {
				$.each(cameraNames, function(index, text) {
					$('#cameraNames').append( $('<option></option>').val(index).html(text) )
				}); 
				$('#cameraNames').val(camera);
                var frame = $.scriptcam.getFrameAsBase64();
                img.send(frame);
			}
            function sendFrame () {
                var frame = $.scriptcam.getFrameAsBase64();
                img.send(frame);
            }