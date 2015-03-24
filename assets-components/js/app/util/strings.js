define([
  'common/constants',
  'util/app-context'
], function(
  Constants,
  AppContext
) {

/**
 * The collated bundle of strings for the given locale, which is injected
 * into global scope by the page in minified/build mode.
 */
var bundle = window._stringBundle || null;

/**
 * This will toggle a url, for the language toggle button
 */
var toggleUrlLanguage = function(loc) {
  var a = document.createElement('a');
  a.href = loc;
  if (a.host.indexOf('healthcare.gov') > -1) {
    a.host = a.host.replace('healthcare.gov', 'cuidadodesalud.gov');
  } else {
    if (a.pathname.indexOf('/es') === 0){
      a.pathname = a.pathname.substring(3);
    }
    a.host = a.host.replace('cuidadodesalud.gov', 'healthcare.gov');
  }
  return a.href;
};



/**
 * Synchronously fetch an individual resource file.
 *
 * This is used in development, where the resource files are still separated
 * out into individual files, and can be loaded on demand for quick debugging.
 * In production, the resources files will be compiled together and
 * available via the _stringBundle variable above.
 */
var fetchFileContentsSync = _.memoize(function(file) {
  var locale = AppContext.getLocale();

  var commentedJs = $.ajax({
    type: 'GET',
    url: Constants.CONTENT_LOCATION + locale + '/' + file,
    async: false
  }).responseText;

  // These files are really plain JSON objects, but they're commented so that
  // content folks and translators can see them. Note that in production,
  // this should never get called.
  return window.eval('(' + commentedJs + ')');
});


/**
 * Get a group of localized string resources.
 *
 * Often, a "group" maps directly to a Backbone.View which renders the
 * strings for that view, but there's no hard requirement that that's always
 * the case.
 */
function getGroup(name) {
  if (bundle) {
    // TODO(benkomalo): Right now we only have a single bundle for each locale
    // but it shouldn't be too hard to support hierarchical bundles and having
    // separate individual files that are loaded at different times.
    return bundle[name];
  }

  return fetchFileContentsSync(name + '.js');
}


/**
 * Really crude string formatter.
 * This replaces placeholders like {0} and {1} with arguments at the specified
 * position. It will also replace keywords like {coverageYear} with
 * arguments[0].coverageYear, if arguments[0] is an object.
 * @param {string} template A localizable format string, possibly with
 *     placeholders in it.
 * @param {string...} var_args A variable number of arguments to pass in as
 *     replacement items. The first argument can be an object, in which case
 *     keyword replacement is enabled.
 */
function format(template, var_args) {
  if (!template) {
    return '';
  }
  var args = Array.prototype.slice.call(arguments, 1);
  // positional replacement.
  template = template.replace(/\{(\d+)\}/g, function(match, number) {
    // ignore objects as well because they will just insert "[object Object]"
    return typeof args[number] !== 'undefined' && typeof args[number] !== 'object' ? args[number] : match;
  });

  // keyword replacement.
  var keywords = args[args.length - 1];
  if(_.isObject(keywords)) {
    template = template.replace(/\{(\w+)\}/g, function(match, keyword) {
      // empty strings are allowed as values, so it is not sufficient to
      // check for truthiness via `if (keywords[keyword])`
      // note that numbers are also allowed as values, not just strings
      if (keywords[keyword] || keywords[keyword] === '') {
        return keywords[keyword];
      } else {
        return match;
      }
    });
  }
  return template;
}

return {
  format: format,
  getGroup: getGroup,
  toggleUrlLanguage: toggleUrlLanguage
};

});
