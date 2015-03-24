define([
  'underscore',
  'util/ab-util'
], function(
  _,
  ABUtil
) {


/**
 * A simple wrapper around the main event tracking call.
 * https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track
 */
function track(name, props, cb) {
  if (!window.mixpanel || !window.mixpanel.track) {
    // If mixpanel is not loaded, still allow the cb to fire.
    if (cb) {
      _.defer(cb);
    }
    return;
  }

  // Add properties from A/B tests
  props = (typeof props !== 'undefined') ? props : {};
  var augmentedProps = _.merge({}, props, ABUtil.abProperties());

  window.mixpanel.track(name, augmentedProps, cb);
  if(window.mixpanel.secondary) {
    window.mixpanel.secondary.track(name, augmentedProps, cb);
  }
}


/**
 * Track a click on a link. Waits a maximum of up to 300ms before giving up
 * and just following the link.
 * https://mixpanel.com/help/reference/javascript-full-api-reference#mixpanel.track_links
 */
function trackLinks(selector, name, props) {
  if (!window.mixpanel || !window.mixpanel.track_links) {
    // track_links does not take callback argument.
    return;
  }
  window.mixpanel.track_links(selector, name, props);
  if(window.mixpanel.secondary) {
    window.mixpanel.secondary.track_links(selector, name, props);
  }
}

return {
  track: track,
  trackLinks: trackLinks
};

});

