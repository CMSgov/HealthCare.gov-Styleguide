var gov = gov || {};
gov.hc = gov.hc || {};

// Utility functions
gov.hc.util = {
  getUID : function (identifier) {
      return identifier + ~~(Math.random() * 1000000);
  }
};

// Sidr Navigation
gov.hc.sidr = {
  init: function() {
    
    // Attach mobile flyout click command
    $('#hc-gov-assets .mobile-menu-btn').on('click.show', gov.hc.sidr.showMobileNav);

    // on click, update section colors
    $('#hc-gov-assets #sidr .header-actions a').click(function (e) {
      
      e.preventDefault();

      var css = "visible-xs visible";

        switch ($(this).attr("data-tab-name"))
        {
            case "learn":

                css += " learn-menu";

            break;

            case "marketplace":

                css += " marketplace-menu"; 

            break;

        }

      $('#hc-gov-assets #sidr').attr("class",css);

    });
  },
  showMobileNav: function(e) {

    if (e) {
      e.preventDefault();
    }

    $('#hc-gov-assets .mobile-menu-btn').off('click.show');

    $('#hc-gov-assets #wrapper').addClass('pushed');

    var $nav = $('#hc-gov-assets #sidr');
    $nav.addClass('visible');

    _.defer(function() {
      $(document.body).on('click.mobilenav', function(e) {

        if (!$.contains($nav[0], e.target) && !$nav.is($(e.target))) {
          gov.hc.sidr.hideMobileNav();
          $nav = null;
        }
      });
    });

  },
  hideMobileNav: function() {
    $('#hc-gov-assets #wrapper').removeClass('pushed');
    $('#hc-gov-assets #sidr').removeClass('visible');

    $(document.body).off('click.mobilenav');
    $('#hc-gov-assets .mobile-menu-btn').on('click.show', gov.hc.sidr.showMobileNav);
  }
};

$(function() {
  gov.hc.sidr.init();
});

// Glossary Terms
gov.hc.glossaryTerms = {
  options_tooltip : {
    placement: function (context, source) {
      var position = $(source).offset();
      var rtOffset = ($(window).width() - ($(source).offset().left + $(source).outerWidth()));
      var lftOffset = (position.left - $(window).scrollLeft());
      var topOffset = (position.top - $(window).scrollTop());
      var bottomOffset = ($(window).height() - topOffset);

      if (rtOffset > lftOffset) {
          if (topOffset < 300) {
              return "bottom";
          } else if (bottomOffset < 300) {
              return "top";
          }
          return "right";
      }
      else {
          if (topOffset < 300) {
              return "bottom";
          } else if (bottomOffset < 300) {
              return "top";
          }
          return "left";
      }
    },
    trigger: "hover focus",
    container: "#hc-gov-assets"
  },
  setAria: function(terms) {

    $(terms).each(function(){
        var uid = gov.hc.util.getUID('tooltip'), //Polyfill
            className = 'popover',
            $this = $(this);
        if(this.className.indexOf('tooltip') !== -1){
            className += ' fade left';
            $this.attr('aria-label','tooltip');
        } else {
            className += ' popover-glossary';
        }
        // Polyfill
        gov.hc.glossaryTerms.options_tooltip.template = '<div aria-role="tooltip" class="'+ className + '" id="' + uid + '"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';
        $this.attr({
                'aria-describedby': uid
              })
              .popover(gov.hc.glossaryTerms.options_tooltip);

        // prevent link from firing natural event
        // and appending a "#" to the url.
        $this.click(function(event){
            event.preventDefault();
        });
        // for keyboard users - enter key prevent
        // link from firing natural event.
        // and appending a "#" to the url.
        $this.keypress(function(event) {
            if(event.which == '13') {
                event.preventDefault();
            }
        });
    });

  }  
};

$(function() {
  gov.hc.glossaryTerms.setAria(".glossary-term");
})