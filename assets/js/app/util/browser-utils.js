define(['underscore'], function(_) {

/**
 * Hacky attempt to fix custom <select> styling.
 * Windows does some weird things with not respecting <select> background
 * styling, but respects the foreground styling. This detects situations
 * in which that happens.
 */
var needHackySelectStyling = _.memoize(function(ua) {
  // Sadly, no feature detection exists here; we have to do useragent
  // sniffing. As far as we can tell, this affects all browsers in windows,
  // except for Gecko which does its own thing with <select>
  var isWindows = ua.indexOf('Windows') > -1;
  if (!isWindows) {
    return false;
  }

  // Note we want actual Gecko browsers. Webkit still shows "like Gecko".
  var geckoBased = ua.indexOf('Gecko') > -1 &&
      ua.indexOf('like Gecko') === -1;
  return !geckoBased;
});

/**
 * Check if we are using a mobile device, because there is an issue on iOS and
 * Android where long lines on selects get cut off.
 *
 * We are checking only for mobile because our fix requires adding an
 * empty <optgroup> element, which looks broken when used on web.
 *
 * Info from: http://stackoverflow.com/questions/19398154/how-to-fix-truncated-text-on-select-element-on-ios7
 *
 */
var needHackyOptgroupSelect = _.memoize(function(ua) {
  var isMobile = (/android|iphone|ipad|ipod|opera mini/i.test(ua.toLowerCase()));
  return isMobile;
});

return {
  needHackySelectStyling: needHackySelectStyling,
  needHackyOptgroupSelect: needHackyOptgroupSelect
};

});

