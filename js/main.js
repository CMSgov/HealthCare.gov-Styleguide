(function(){

})();

$(document).ready(function() {
  // Zero Clipboard
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

  // Popover Initialization
  $('body').popover({
        selector: 'a[data-toggle=popover]',
        container: 'body'
    }).tooltip({
        selector: "a[data-toggle=tooltip]",
        container: 'body'
  });
});
