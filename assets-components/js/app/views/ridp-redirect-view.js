/**
 * A view to render the failure of RIDP.
 */
define([
  'common/constants',
  'views/card-view',
  'util/app-context',
  'text!templates/ridp-redirect.html'
], function(
  Constants,
  CardView,
  AppContext,
  ridpRedirectTemplate
) {

var RidpRedirectView = CardView.extend({
  templateText: ridpRedirectTemplate,
  className: CardView.prototype.className + ' ridp-redirect blue-bg',
  cardName: 'ridp-redirect',

  events: {
    'click .btn-submit': '_onSubmitClick'
  },

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
  },

  _onSubmitClick: function(e) {
    // TODO: i18n this string and put it somewhere better
    // TODO: figure out why it's not updating with the fact that
    // they've already tried
    // TODO: Why is state in the url
    var langTerritory = AppContext.getLocale() === 'es' ? 'es_MX' : 'en_US';
    var url = '/marketplace/auth/VA/' +  langTerritory + '/myAccount?from=myProfile#IDProofingResults:E100';
    window.location = url;
  }
});

return RidpRedirectView;
});
