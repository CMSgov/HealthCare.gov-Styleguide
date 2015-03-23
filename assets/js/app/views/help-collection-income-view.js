define([
  'underscore',
  'util/strings',
  'common/constants',
  'views/card-view',
  'bootstrap-tab',
  'util/analytics',
  'util/help-collection-nav',
  'text!templates/help-collection-income.html'
], function(
  _,
  Strings,
  Constants,
  CardView,
  BootstrapTabUnused,
  Analytics,
  HelpCollectionNav,
  helpCollectionIncomeTemplate
) {

/**
 * A view that holds all extended help content
 */
var HelpCollectionIncomeView = CardView.extend({
  templateText: helpCollectionIncomeTemplate,
  cardName: 'help-collection-income',
  className: CardView.prototype.className + ' help-collection-income',

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
    Analytics.track('MPL App Help Collection Income Load');
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

return HelpCollectionIncomeView;

});
