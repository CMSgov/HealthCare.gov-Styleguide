define([
  'backbone',
  'views/card-view',
  'util/analytics',
  'text!templates/privacy-policy.html'
], function(
  Backbone,
  CardView,
  Analytics,
  privacyPolicyTemplate
) {

var PrivacyPolicyView = CardView.extend({
  className: CardView.prototype.className + ' privacy-policy',
  cardName: 'privacy-policy',
  templateText: privacyPolicyTemplate,

  events: _.extend({}, CardView.prototype.events, {
    'change [name="privacy-policy-attestation"]': '_onAttestationChanged',
    'click .btn-submit': '_onSubmitClick'
  }),

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
    Analytics.track('MPL Privacy Policy Load');
    this.csr = options.csr;
  },

  /** @override */
  getRenderData: function() {
    return _.extend(CardView.prototype.getRenderData.call(this), {
      showVerifiedMsg: !this.csr
    });
  },

  _onAttestationChanged: function(e) {
    var attested = this.$('[name="privacy-policy-attestation"]').prop('checked');

    this.$('.btn-submit').toggleClass('disabled', !attested);
  },

  _onSubmitClick: function(e) {
    e.preventDefault();
    Analytics.track('MPL Privacy Policy Submit');
    this.model.save(null, {
      success: this.options.onSuccess,
      error: function() {
        Analytics.track('MPL Privacy Policy Error');
      }
    });
  }
});

return PrivacyPolicyView;

});
