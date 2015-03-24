/**
 * Utilities for A/B testing. For background, see "Marketplace A/B Tests 101":
 * https://docs.google.com/a/hcgov.us/document/d/1HfiFqF7J8ehbIFdd5clgjzEjNelhjNaB0E0nFmzled0/edit#heading=h.6a8tbvhv40w4
 *
 * Basic Terminology:
 * Flag: a discrete value that changes the user experience, e.g., the color of
 *       a button or whether to show a confirm password field. window.flags
 *       contains all currently-active flags for the user.
 * Variation: a version of the UI shown to a percentage of users. Each
 *       variation sets a group of flags.
 * Experiment: a set of variations with the same targeting (set of users).
 *       Generally speaking, we have one experiment active at a given
 *       time, and use variations as the unit of change.
 */
define([
  'util/ab-defaults',
  'util/app-context',
], function(
  ABDefaults,
  AppContext
) {
  // Whether an experiment flag was ever missing (e.g., because Optimizely had
  // not yet loaded) when the app requested its value.
  var flagsMissing = false;

  /**
   * @return the value of the flag, or the default value if the flag isn't set
   * in one of the user's current variations.
   */
  function flag(name) {
    if (!window.flags) {
      flagsMissing = true;
    } else if (window.flags.hasOwnProperty(name)) {
      return window.flags[name];
    }
    if (!ABDefaults.hasOwnProperty(name)) {
      console.log('Flag not found: ' + name);
      return;  // undefined
    }
    return ABDefaults[name];
  }

  /**
   * @return {string[][]} an array of pairs of
   * [Optimizely experiment id, Optimizely variation name]
   * that are active for the user at this time. We return an array of arrays
   * rather than an object since we want to guarantee consistent ordering
   * for experiment variations.
   */
  function currentVariations() {
    if (!window.optimizely || !window.optimizely.activeExperiments) {
      return [];
    }

    active = [];
    // Cap num experiments to iterate through to guard against bad configs
    var len = Math.min(window.optimizely.activeExperiments.length, 100);
    for (var i = 0; i < len; i++) {
      var experiment = window.optimizely.activeExperiments[i];
      active.push([experiment, window.optimizely.data.state.variationNamesMap[experiment]]);
    }
    return active;
  }

  /**
   * @return {Object} a set of properties related to A/B tests, e.g., the
   * set of currently active variations. These are used by Analytics.track.
   */
  function abProperties() {
    var flags = window.flags || {};

    var variations = currentVariations();
    var variationNames = _.map(variations, function(v) {return v[1];});

    var extras = {
      // Whether ab flags were missing, i.e., whether Optimizely failed to
      // load in time to adjust the flags. When comparing A/B test results,
      // you probably want to filter out traffic where A/B flags were missing.
      'flagsMissing': flagsMissing,

      // The list of Optimizely variations that are active for this experiment.
      // We use these to compare conversion funnels between different
      // variations in MixPanel.
      'variations': variationNames,

      // a few global variables that help us split out requests.
      'locale': AppContext.getLocale(),
      'ccr': AppContext.isCallCenter() ? 'yes' : 'no'
    };

    for (var i = 0; i < variations.length; i++) {
      extras['exp' + variations[i][0]] = variations[i][1];
    }

    return _.merge(extras, flags);
  }

  return {
    flag: flag,
    currentVariations: currentVariations,
    abProperties: abProperties
  };
});
