// Sidr Navigation

$(function() {

  // Attach mobile flyout click command
  $('.mobile-menu-btn').on('click.show', showMobileNav);

});

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


var hideMobileNav = function() {
  $('#wrapper').removeClass('pushed');
  $('#sidr').removeClass('visible');

  $(document.body).off('click.mobilenav');
  $('.mobile-menu-btn').on('click.show', showMobileNav);
};

$(function(){

    $('#sidr .header-actions a').click(function (e) {
      
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

      $('#sidr').attr("class",css);

    });

})