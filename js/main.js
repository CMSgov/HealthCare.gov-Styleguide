(function(){

})();

$(document).ready(function() {
	var clip = new ZeroClipboard($(".copy-button"));

  	clip.on("ready", function() {
    	//console.log("Flash movie loaded and ready.");

		this.on("aftercopy", function(event) {
      		//console.log("Copied text to clipboard: " + event.data["text/plain"]);
    	});
  	});

	clip.on("error", function(event) {
    	$(".demo-area").hide();
    	console.og('error[name="' + event.name + '"]: ' + event.message);
    	ZeroClipboard.destroy();
	});
});
