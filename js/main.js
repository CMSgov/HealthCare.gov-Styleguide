var gov = gov || {};
gov.hc = gov.hc || {};
gov.hc.sg = gov.hc.sg || {};

// Utils
gov.hc.sg.utils = {
  isIE: function() {
      var myNav = navigator.userAgent.toLowerCase();
      return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }
};

// Styleguide Mobile Navigation
gov.hc.sg.sidr = {
  init: function() {

    // Attach mobile flyout click command
    $('.mobile-menu-btn').on('click.show', gov.hc.sg.sidr.showMobileNav);

  },
  showMobileNav: function(e) {
    
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
          gov.hc.sg.sidr.hideMobileNav();
          $nav = null;
        }
      });
    });

  },
  hideMobileNav: function() {

    $('#wrapper').removeClass('pushed');
    $('#sidr').removeClass('visible');

    $(document.body).off('click.mobilenav');
    $('.mobile-menu-btn').on('click.show', gov.hc.sg.sidr.showMobileNav);

  }
};

$(function() {
  gov.hc.sg.sidr.init();
});

// Zero Clipboard
gov.hc.sg.zeroclipboard = {
  init: function() {

    if(!gov.hc.sg.utils.isIE() || (gov.hc.sg.utils.isIE() > 8)){
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
    };

  }
};

$(function() {
  gov.hc.sg.zeroclipboard.init();
});

// Interior Left Navigation
gov.hc.sg.interiorNav = {
  init: function() {
 
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

    gov.hc.sg.interiorNav.fixToTop();
  },
  fixToTop: function() {

    // fix to top of page
    if($("#landing-page").length > 0) {
      
      $(window).scroll(function() {
        var subnav = $(".subnav-wrapper");
        var y = Math.floor(subnav[0].getBoundingClientRect().top) - $(window).scrollTop();

        if (y < 0)
            subnav.addClass("fixed-nav");
        else
            subnav.removeClass("fixed-nav");

      });

    } else if($("#detail-page").length > 0)
      $("#detail-page .subnav-wrapper").addClass("fixed-nav");
  }
};

$(function() {
  gov.hc.sg.interiorNav.init();
});
