/**
 * @fileoverview All initialization/entry points to every page in our app.
 *
 * For simplicity, every page in Marketplace Lite/EZapp loads the same JS file
 * which is "compiled" with this file as the requirejs "main file" (meaning
 * all dependencies originate from this file).
 *
 * Each page may choose to kick off a different flow by calling the appropriate
 * init method below.
 */


/**
 * Entry point to the main "eligibility application form".
 * @param {Object} data The application form data for the logged in user.
 */
window.initAuthenticated = function(data) {
  require([
    'common/constants',
    'init/common-init',
    'util/app-context',
    'authenticated-app-router'
  ], function (
    Constants,
    initCommon,
    AppContext,
    AuthenticatedAppRouter
  ) {
    AppContext.configureApp(data);
    initCommon();

    new AuthenticatedAppRouter({data: data});
    Backbone.history.start({pushState: true, root: Constants.AUTHENTICATED_APP_ROOT});
  });
};

window.initRidp = function(data) {
  require([
    'common/constants',
    'init/common-init',
    'util/app-context',
    'ridp-router'
  ], function (
    Constants,
    initCommon,
    AppContext,
    RidpRouter
  ) {
    AppContext.configureApp(data);
    initCommon();

    new RidpRouter({data: data});
    Backbone.history.start({pushState: true, root: Constants.RIDP_ROOT});
  });
};

/**
 * The main entry point for the landing page.
 */
window.initWelcomePage = function(options) {
  require([
    'common/constants',
    'init/common-init',
    'util/app-context',
    'app-router'
  ], function (
    Constants,
    initCommon,
    AppContext,
    AppRouter
  ) {
    AppContext.configureApp(options);
    initCommon({requireCsrf: false});

    new AppRouter();

    Backbone.history.start({pushState: true, root: Constants.APP_ROOT});
  });
};

// Kick off any DOM initialization for the header.
require(['util/header-init'], function(unused) {});
