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

function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

$(document).ready(function() {
  // Attach mobile flyout click command
  $('.mobile-menu-btn').on('click.show', showMobileNav);

  if(!isIE() || (isIE() > 8)){
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
  }
});

$(document).ready(function() {

  // Toggle submenu in interior navigation
  $('.toggle-interior-nav').click(function(){
    $(this).toggleClass('closed');
    var ul = $(this).siblings('ul');
    ul.toggle();
    var ariaHiddenBoolean = true;
    var chevron = $(this).siblings('.glyphicon');

    if(chevron.hasClass('glyphicon-chevron-right')){
      chevron.removeClass('glyphicon-chevron-right');
      chevron.addClass('glyphicon-chevron-down');
      ariaHiddenBoolean = false;
    
    } else{
      chevron.removeClass('glyphicon-chevron-down');
      chevron.addClass('glyphicon-chevron-right');
      
    }
    
    ul.attr("aria-hidden", ariaHiddenBoolean);
  });

  if($("#landing-page").length > 0) {
    
    $(window).scroll(function() {
      var subnav = $(".subnav");
      var y = Math.floor(subnav[0].getBoundingClientRect().top) - $(window).scrollTop();

      if (y < 0)
          subnav.addClass("fixed-nav");
      else
          subnav.removeClass("fixed-nav");
    });

  } else if($("#detail-page").length > 0)
    $("#detail-page .subnav").addClass("fixed-nav");

});
