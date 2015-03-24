/**
 * Initialization for the standalone landing page + account creation.
 */
window.initStandaloneWelcomePage = function() {
  require([
    'common/constants',
    'init/common-init',
    'app-router'
  ], function (
    Constants,
    initCommon,
    AppRouter
  ) {
    initCommon({requireCsrf: false});

    new AppRouter({standaloneMode: true});

    Backbone.history.start({pushState: true, root: Constants.APP_ROOT});
  });
};


// Kick off any DOM initialization for the header.
require(['util/header-init'], function(unused) {});
