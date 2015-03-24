define([
  'underscore',
  'util/strings',
  'common/constants',
  'views/card-view',
  'bootstrap-tab',
  'util/analytics',
  'util/help-collection-nav',
  'text!templates/help-collection.html'
], function(
  _,
  Strings,
  Constants,
  CardView,
  BootstrapTabUnused,
  Analytics,
  HelpCollectionNav,
  helpCollectionTemplate
) {

/**
 * A view that holds all extended help content
 */
var HelpCollectionView = CardView.extend({
  templateText: helpCollectionTemplate,
  cardName: 'help-collection',
  className: CardView.prototype.className + ' help-collection',

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
    Analytics.track('MPL App Help Collection Load');
  },

  postRenderHooks: function() {
    CardView.prototype.postRenderHooks.apply(this, arguments);
    _.defer(function() { HelpCollectionNav.initialize(); });
  },

  getRenderData: function() {
    return _.extend(CardView.prototype.getRenderData.call(this), {
      coverageYear: Constants.DEFAULT_COVERAGE_YEAR
    });
  }
});

return HelpCollectionView;

});
