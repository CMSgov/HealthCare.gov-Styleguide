define([
  'common/constants',
  'data/states',
  'views/card-view',
  'util/analytics',
  'util/browser-utils',
  'text!templates/lite-screener.html'
], function(
  Constants,
  StatesData,
  CardView,
  Analytics,
  BrowserUtils,
  liteScreenerTemplate
) {

  /**
   * The initial card where user selects the coverage state.
   */
  var LiteScreenerView = CardView.extend({
    templateText: liteScreenerTemplate,
    className: function() {
      return (this.options.isOpenEnrollmentPeriod) ? 'lite-screener' : 'lite-screener post-enrollment';
    },
    cardName: 'lite-screener',

    events: _.extend({}, CardView.prototype.events, {
      'change [name="tendon:coverageState"]': 'onStateChanged',
      'click .success-container .btn-submit': '_onSubmitClicked'
    }),

    initialize: function(options) {
      CardView.prototype.initialize.call(this, _.defaults(options, {
        onSuccess: null,
        isOpenEnrollmentPeriod: false
      }));
      Analytics.track('MPL Welcome Load');

      if (!this.options.isOpenEnrollmentPeriod) {
        this.cardName = 'lite-screener-post-enrollment';
      }

      this.listenTo(this.model, 'change:coverageState', this.updateFromStateSelect);
    },

    getRenderData: function() {
      return _.extend(CardView.prototype.getRenderData.apply(this, arguments), {
        isOpenEnrollmentPeriod: this.options.isOpenEnrollmentPeriod
      });
    },

    /**
     * When user navigates back in their browser to the screener page,
     * a number of things happens by default:
     * - model remains unchanged (contains a state)
     * - view is recreated from scratch and shows default option which is
     *   "select a state", so is now inconsistent with model
     *   - onStateChanged is not fired, since the view was just created
     */
    postRenderHooks: function() {
      CardView.prototype.postRenderHooks.call(this);
      this.loadFromModel();

      // Restore state if navigating back to this page.
      this.updateFromStateSelect();

      if (BrowserUtils.needHackySelectStyling(window.navigator.userAgent)) {
        this.$('select').addClass('hacky-windows-select');
      }
    },

    _onInputFocused: function(e) {
      // Unfortunately, we can't do the hover effect purely in CSS since
      // the input/select elements have a wrapping form-group/form-select
      // which is the thing that needs focus styling.
      $(e.target).closest('.form-group,.form-select').addClass('focus');
    },

    _onInputBlurred: function(e) {
      $(e.target).closest('.form-group,.form-select').removeClass('focus');
    },

    onStateChanged: function(e) {
      this.saveToModel('coverageState');
    },

    /**
     * Called when select changes or from postRenderHooks on back navigate.
     */
    updateFromStateSelect: function() {
      var $target = this.$('[name="tendon:coverageState"]');
      var coverageState = $target.val();
      var coverageYear = Constants.DEFAULT_COVERAGE_YEAR;

      if (!coverageState) {
        return;
      }

      this._fullOpacity($target);
      Analytics.track('MPL Welcome Select State', {state: coverageState});

      this.model.set(
        'coverageState', coverageState, {validate: 'coverageState'});

      var sbmInfo = StatesData.getStateMarketplaceInfo(
        coverageYear, coverageState);

      var content = this.getContent(this.cardName);
      if (sbmInfo && !sbmInfo.shopOnly && !sbmInfo.infoOnly) {
        Analytics.trackLinks(
            '.fail-state-container .btn-submit',
            'MPL Welcome Sent to SBM',
            function(outgoingLink) {
              return {state: $(outgoingLink).data('state')};
            });

        this.$('.fail-territory-container').addClass('hidden');
        this.$('.success-container').addClass('hidden');

        // TODO(benkomalo): do a proper i18n solution where we can format
        // strings
        this.$('.fail-state-container')
            .find('.msg-success')
              .text(content
                  .stateBaseMarketMessageFormat
                  .replace('{0}', sbmInfo.siteName))
            .end()
            .find('.btn-submit')
                .text(content
                    .stateBaseMarketLinkFormat
                    .replace('{0}', sbmInfo.stateName))
                .data('state', coverageState)
                .attr('href', sbmInfo.url)
            .end()
            .removeClass('hidden');
      } else if (StatesData.isUncoveredTerritory(coverageState)) {
        this.$('.fail-state-container').addClass('hidden');
        this.$('.fail-territory-container').removeClass('hidden');
        this.$('.success-container').addClass('hidden');
      } else {
        // Normal state covered by the FFM.
        this.$('.fail-state-container').addClass('hidden');
        this.$('.fail-territory-container').addClass('hidden');
        this.$('.success-container').removeClass('hidden');

        // For states with an info-only site, display a link to the site but
        // have the apply button go to FFM
        if (sbmInfo && sbmInfo.infoOnly) {
          this.$('.state-info-site-container')
            .find('.msg-info-site')
              .html(content
                  .stateInfoSiteMessageFormat
                  .replace('{0}', sbmInfo.stateName)
                  .replace('{1}', sbmInfo.url)
                  .replace('{2}', sbmInfo.siteName))
            .end()
            .removeClass('hidden');
        } else {
          this.$('.state-info-site-container').addClass('hidden');
        }
      }

      // Once a state has been selected by the user,
      // remove the "Select a state" default option.
      this.$('.state [value=""]').remove();
    },

    _fullOpacity: function($target) {
      $target.addClass('selected');
    },

    _onSubmitClicked: function(e) {
      e.preventDefault();

      var state = this.model.get('coverageState');
      Analytics.track('MPL Welcome Submit', {state: state});

      if (this.options.onSuccess) {
        this.options.onSuccess();
      }
    }
  });

return LiteScreenerView;

});
