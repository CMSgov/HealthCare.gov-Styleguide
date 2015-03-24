define([
  'common/constants'
], function(
  Constants
) {

var CSRF_TOKEN_HEADER_NAME = 'X-CSRF-Token';
var CSRF_TOKEN_COOKIE_NAME = 'mplcsrf';


function readCsrfCookie() {
  var cookies = document.cookie.split(';');
  var match = _.find(cookies, function(cookie) {
    var kvPair = $.trim(cookie).split('=');
    return kvPair[0] === CSRF_TOKEN_COOKIE_NAME;
  });

  if (match) {
    return $.trim(match).split('=')[1];
  }
  return null;
}


// Debugging only.
var verbose = false;


/**
 * Install $.ajax hooks for sending CSRF token values on all requests.
 */
function initCsrfHooks() {
  var injectCsrfIntoAjax = function(xhr, settings) {
    var csrfToken = readCsrfCookie();
    if (csrfToken) {
      xhr.setRequestHeader(CSRF_TOKEN_HEADER_NAME, csrfToken);
    } else if (verbose) {
      console.log('Outgoing request with missing CSRF token: ' +
          settings.url);
    }
  };

  if (!readCsrfCookie()) {
    // If you don't have a csrf cookie, make a request to get one.
    // This request will hit node, not just the static nginx
    $.get(Constants.APP_ROOT + 'csrf', function(data) {});
  }

  // We need to use a beforeSend on the global AJAX setup, as well as the
  // Backbone specific use of it (since that bypasses the global config).
  $.ajaxSetup({beforeSend: injectCsrfIntoAjax});
  var origBackboneAjax = Backbone.ajax;
  Backbone.ajax = function(options) {
    var beforeSend = options.beforeSend;
    options.beforeSend = function(xhr) {
      injectCsrfIntoAjax(xhr);
      if (beforeSend) {
        // The original might return `false` to cancel the request.
        return beforeSend.apply(this, arguments);
      }
    };
    return origBackboneAjax.call(this, options);
  };

}

return {
  initCsrfHooks: initCsrfHooks
};

});

