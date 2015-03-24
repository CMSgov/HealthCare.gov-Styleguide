// Show mobile flyout navigation
var showMobileNav = function(e) {
  if (e) {
    e.preventDefault();
  }

  $('.mobile-menu-btn').off('click.show');

  $('#wrapper').addClass('pushed');

  var $nav = $('#sidr');
  $nav.addClass('visible');

  _.defer(function() {
    $(document.body).on('click.mobilenav', function(e) {
      if (!$.contains($nav[0], e.target) && !$nav.is($(e.target))) {
        hideMobileNav();
        $nav = null;
      }
    });
  });
};

// Hide mobile flyout navigation
var hideMobileNav = function() {
  $('#wrapper').removeClass('pushed');
  $('#sidr').removeClass('visible');

  $(document.body).off('click.mobilenav');
  $('.mobile-menu-btn').on('click.show', showMobileNav);
};

$(document).ready(function() {
  // Attach mobile flyout click command
  $('.mobile-menu-btn').on('click.show', showMobileNav);

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
  	console.log('error[name="' + event.name + '"]: ' + event.message);
  	ZeroClipboard.destroy();
  });

});

$(document).ready(function() {

  // Toggle submenu in interior navigation
  $('.toggle-interior-nav').click(function(){
    $(this).toggleClass('closed');
    $(this).siblings('ul').toggle();
    var chevron = $(this).siblings('.glyphicon');

    if(chevron.hasClass('glyphicon-chevron-right')){
      chevron.removeClass('glyphicon-chevron-right');
      chevron.addClass('glyphicon-chevron-down');
    } else{
      chevron.removeClass('glyphicon-chevron-down');
      chevron.addClass('glyphicon-chevron-right');
    }
  });

  // Landing page sticky left navigation, separated for different offset
  if($('#landing-page .subnav').length){
    $('#landing-page .subnav').affix({
      offset: {
        top: $('#landing-page .subnav').offset().top - 150,
        bottom: ($('.site-footer').outerHeight(true) + $('.sub-footer').outerHeight(true)) + 40
      }
    });
  }

  // Detail page sticky left navigation, separated for different offset
  if($('#detail-page .subnav').length){
    $('#detail-page .subnav').affix({
      offset: {
        top: $('#detail-page .subnav').offset().top - 200,
        bottom: ($('.site-footer').outerHeight(true) + $('.sub-footer').outerHeight(true)) + 40
      }
    });
  }
});
