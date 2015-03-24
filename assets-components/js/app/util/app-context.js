/**
 * Holds all "global" information about the app and how it's configured.
 *
 * This acts as somewhat of a singleton that should be available in most
 * places. Ideally, this should be injectable in any environment, including
 * unit tests, so avoid having this have hard dependencies on other components.
 */
define([
], function(
) {


var options = {};
var optionsInitialized = false;


/**
 * Initialize the app context with options, likely from the server.
 */
var configureApp = function(opt_options) {
  if (optionsInitialized) {
    throw new Error('Application already configured!');
  }

  optionsInitialized = true;
  options = _.defaults(opt_options || {}, {
    faFlowEnabled: false
  });
};


/**
 * Returns the environment the code is running in based on the host name.
 */
var getEnvironment = _.memoize(function() {
  var hostname = window.location.hostname;
  var len = hostname.length;
  if (hostname === 'www.healthcare.gov' ||
      hostname === 'www.cuidadodesalud.gov') {
    return 'production';
  }
});



/**
 * Semi-hackily detect the locale based on the hostname.
 */
var getLocale = _.memoize(function() {
  var hostname = window.location.hostname;
  var len = hostname.length;
  if (len > 19 && hostname.indexOf('.cuidadodesalud.gov') === len - 19) {
    return 'es';
  }

  return 'en';
});


/* return true/false if this is a CSR request */
var isCallCenter = _.memoize(function() {
  return !!options.csr;
});

return {
  configureApp: configureApp,
  getEnvironment: getEnvironment,
  getLocale: getLocale,
  isCallCenter: isCallCenter,

  faFlowEnabled: function() {return options.faFlowEnabled;}
};


});
