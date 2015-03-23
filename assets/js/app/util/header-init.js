require([
  'bootstrap-dropdown',
  'util/strings'
], function(
  jQueryBootstrap,
  Strings
) {

var showMobileNav = function(e) {
  if (e) {
    e.preventDefault();
  }

  // removing the click event to show the sidebar
  // this resolves a bug where if you keep clicking the menu button
  // it will try to run "showMobileNav" and "hideMobileNav" at the same time
  $('.mobile-menu-btn').off('click.show');

  $('#wrapper').addClass('pushed');

  var $nav = $('#sidr');
  $nav.addClass('visible');

  // allow the entire document to be a trigger to clear the mobile nav
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


$(function() {
  $('.help-menu.dropdown .dropdown-toggle').dropdown();
  $('.mobile-menu-btn').on('click.show', showMobileNav);

  $('.toggle-language').on('click', function(e) {
    window.location = Strings.toggleUrlLanguage(window.location.href);

    e.preventDefault();

    // Ugh. Not sure why jQuery's preventDefault isn't working above. For some
    // reason in IE, it seems to not actually preventDefault.
    return false;
  });
});

});
