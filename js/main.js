// Show mobile flyout navigation
var showMobileNav = function(e) {
  if (e) {
    e.preventDefault();
  }

  $('.mobile-menu-btn').off('click.show');

  $('#wrapper').addClass('pushed');

  var $nav = $('#sidr');
  $nav.addClass('visible');

  var $header = $('.header-wrap');
  $header.addClass('pushed');

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
  $('.header-wrap').removeClass('pushed');

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

  // Bootstrap based select component modifcation
  $('.form-control').selectpicker({
    style: 'btn-info',
    size: 4
  });

  // Go to Top button
  $('#back-to-top a').click(function(){
    window.scrollTo(0, 0);
  });


  // Toggle submenu in interior navigation
  $('.toggle-interior-nav').click(function(){
    $(this).toggleClass('closed');
    $(this).siblings('ul').toggle();
  });

  // Sticky left navigation
  $('.subnav').affix({
    offset: {
      top: $('.subnav').offset() - 84,
      bottom: ($('.site-footer').outerHeight(true) + $('.sub-footer').outerHeight(true)) + 40
    }
  });
});
