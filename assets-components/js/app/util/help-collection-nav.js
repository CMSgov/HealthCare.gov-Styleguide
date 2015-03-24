/**
 *
 * Javascript to add the Bootstrap tab logic to Help Collection pages, and
 * respect things like the hash updating, loading the url without a hash,
 * and navigating using the dropdown.
 *
 **/
define([
  'bootstrap-tab'
], function(
  BootstrapTab
) {
  // Using this prefix for dyanmic updates to the page (vs linking to
  // the actual #href element).
  var prefix = 'tab-';

  // Javascript to enable link to tab.
  // This prevents a weird scrolling error when refreshing, from this:
  // http://stackoverflow.com/questions/7862233/twitter-bootstrap-tabs-go-to-specific-tab-on-page-reload
  var updateTab = function() {
    var hash = document.location.hash;
    if (hash) {
      $('.nav-tabs a[href=' + hash.replace(prefix, '') + ']').tab('show');
    } else {
      // Select the first tab if we have an empty hash
      $('.nav-tabs a').first().tab('show');
    }
  };

  var initialize = function() {
    // Tie the tab select dropdown we use on mobile to the default
    // Bootstrap tab logic, so that we can update the hash + etc.
    $('.tabbed-article-select').change(function(e) {
      var selectedTab = $('.tabbed-article-select').val();
      $('.nav-tabs a[href="#' + selectedTab + '"]').tab('show');
    });

    // Update the hash for page-reload
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
      // Update the header on the page to match the help content
      $('.help-heading').text($('.tab-pane.active .tab-title').html());
      window.location.hash = e.target.hash.replace('#', '#' + prefix);
    });

    // Check the current hash and update our tab based on it
    updateTab();

    // Also listen to the hashchange event when people click on other help
    // content that's pointed at this same window.
    $(window).on('hashchange', updateTab);
  };

  return {
    initialize: initialize
  };

});
