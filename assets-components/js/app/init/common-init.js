define([
  'backbone',
  'models/base-model',
  'util/csrf-util',
  'util/strings',
  'backbone-validation'
], function(
  Backbone,
  BaseModel,
  CsrfUtil,
  Strings,
  BackboneValidation
) {

/**
 * An error formatter that uses a string resource file.
 *
 * The underlying file is found in common/locale/<locale>/models.js. This
 * uses the normal string utility to load the resource from the appropriate
 * location based on whether or not this is in dev or prod.
 *
 * @see BaseModel#registerCustomErrorFormatter
 *
 * @param {string} The code which references the string resource entry.
 * @this {BaseModel}
 */
var formatModelErrorMessage = function(code) {
  var stringGroup = Strings.getGroup('models');
  return stringGroup[code] || '';
};


/**
 * Read localized strings for model validation messages and register
 * the formatters appropriately.
 */
var setupModelErrorFormatters = function() {
  var modelStrings = Strings.getGroup('models');

  // There are two distinct classes of error messages that may be rendered to
  // a user to due a failed validation in a Model:

  // 1. The "default" validation messages provided in the Backbone.Validation
  // library. There's a limited set of these; one for each type of "default"
  // validation function (like a "requires" function). These are essentially
  // formatter strings with placeholders for the actual model field name.
  // The Backbone.Validation library uses a separate "labelFormatter" to
  // customize how those model fields are formatted, so we override that
  // below as well.
  _.extend(BackboneValidation.messages, modelStrings.defaultErrors);

  var fieldStrings = modelStrings.fields || {};
  BackboneValidation.configure({
    labelFormatter: function(attrName, model) {
      return fieldStrings[attrName] ||
          Backbone.Validation.labelFormatters.sentenceCase(attrName);
    }
  });

  // 2. Custom error messages are messages that can be returned from a custom
  // validation functions defined on a submodel. These just have straight
  // up individual entries in the string bundle.
  BaseModel.registerCustomErrorFormatter(formatModelErrorMessage);
};


/**
 * Common initialization functions to trigger on application start.
 * @param {Object} options A parameter bag, which can include:
 *     - requireCsrf (default: true) - initialize CSRF hooks.
 */
return function(options) {
  options = options || {};

  // IE doesn't have console object, so give them a dummy.
  if (!window.console) { window.console = {};}
  if (!window.console.log) { window.console.log = function() {};}
  if (!window.console.info) { window.console.info = function() {};}
  if (!window.console.warn) { window.console.warn = function() {};}
  if (!window.console.error) { window.console.error = function() {};}

  if (_.isUndefined(options.requireCsrf) || options.requireCsrf) {
    CsrfUtil.initCsrfHooks();
  }

  // Always use POST rather than PUT or DELETE requests to avoid complexities
  // around Akamai configuration. For example, Akamai defaults to denying PUT
  // requests. Also, Akamai's WAF configuration also caused issues. Just
  // using POST requests avoids these issues altogether
  Backbone.emulateHTTP = true;

  setupModelErrorFormatters();
};

});
