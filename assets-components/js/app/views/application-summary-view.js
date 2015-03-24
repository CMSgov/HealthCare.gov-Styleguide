define([
  'underscore',
  'moment',
  'util/async-submit',
  'util/income',
  'util/screener',
  'common/util/oe-date-util',
  'views/card-view',
  'models/app-model',
  'text!templates/application-summary/_applicant-checklist-summary.html',
  'text!templates/application-summary.html',
  'util/analytics'
], function(
  _,
  moment,
  AsyncSubmissionUtil,
  IncomeUtil,
  ScreenerUtil,
  OeDateUtil,
  CardView,
  AppModel,
  applicantChecklistSummaryTemplate,
  applicationSummaryTemplate,
  Analytics
) {

/**
 * The card after filling out the application for the user to review all the
 * details before actually submitting the application.
 */
var ApplicationSummaryView = CardView.extend({
  templateText: applicationSummaryTemplate,
  className: CardView.prototype.className + ' application-summary',
  cardName: 'application-summary',

  partials: _.extend({}, CardView.prototype.partials, {
    'application-summary/_applicant-checklist-summary': applicantChecklistSummaryTemplate
  }),

  events: _.extend({}, CardView.prototype.events, {
    'click .btn-submit': '_onSubmitClick',
    'change .radio-label': '_renderAndValidateAttestations',
    'click .attestation-warning-close': '_closeModal',
    'click .attestation-warning-continue': '_closeModal',
    'click .attestation-warning-cancel': '_closeModalWithCancel'
  }),

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
    Analytics.track('MPL App Completion Load');
  },

  postRenderHooks: function() {
    CardView.prototype.postRenderHooks.apply(this, arguments);
    this.loadFromModel();
    // Set this value to true so that if, on initialization, there are some
    // warnings, the modal doesn't show up right away.
    this._hasShownAttestationWarning = true;
    this._renderAndValidateAttestations(null, false);

    var self = this;
    _.defer(function() { self.$('a').first().focus(); });
  },

  getRenderData: function() {
    return _.extend(
        CardView.prototype.getRenderData.call(this), {
          getScreenerQuestionText: this.getScreenerQuestionText, // from card-view.js
          groupedAffirmations: this.getGroupedAffirmations(),
          formatAffirmation: this.formatAffirmation,
          isTaxPenaltySepPeriod: OeDateUtil.isTaxPenaltySepPeriod,
          IncomeUtil: IncomeUtil
        });
  },

  /**
   * Check for the validity of the attestations -- they are valid as long as
   * an option is explicitly selected for each attestation. Also render any
   * warnings that are necessary.
   */
  _renderAndValidateAttestations: function(e, opt_showNothingChosenError) {
    var attestationNames = ['medicaidRights', 'absentParent',
      'informMarketplace', 'perjury', 'taxPenalty'];

    // User must respond to all attestations that appear for their scenario
    var attestations = {};
    _.each(attestationNames, function(name) {
      var elName = 'tendon:' + name + 'Attestation';
      var $trueEl = this.$('[name="' + elName + '"][value=true]');
      var $falseEl = this.$('[name="' + elName + '"][value=false]');
      // Set attestation value to true or false if it is explicitly checked
      if ($falseEl.is(':checked')) {
        attestations[name] = false;
      } else if ($trueEl.is(':checked')) {
        attestations[name] = true;
      // Otherwise, it's visible but not checked, so set it to null.
      } else if (!_.isEmpty($falseEl)) {
        attestations[name] = null;
      }
      // if the radio group is not visible, don't include the key in the
      // attestations object.

      // Set warning message if relevant.
      var stringContent = this.getContent(this.cardName);
      if (attestations[name] === null && opt_showNothingChosenError) {
        this.renderInvalidMarker(elName, stringContent.attestations.error);
      } else if (attestations[name] === false) {
        this.renderInvalidMarker(elName, stringContent.attestations.warning,
          true);
      } else {
        this.clearInvalidMarker(elName);
      }
    }, this);

    // Show attestation modal if any are false and we haven't just shown it.
    // Don't show if this._hasShownAttestationWarning is undefined, because
    // that means this view was loaded with attestations being false, so
    // showing the warning is redundant.
    var didRefuseAnAttestation = _.contains(_.values(attestations), false);
    if (didRefuseAnAttestation && !this._hasShownAttestationWarning) {
      this._hasShownAttestationWarning = true;
      var $modal = this.$('.attestation-warning-modal').show();
      // Defer adding the 'in' class so the CSS transition will happen.
      _.defer(function() { $modal.addClass('in'); });
    }
    // Show attestation warning again if all values are set to true.
    if (!didRefuseAnAttestation) {
      this._hasShownAttestationWarning = false;
    }

    return attestations;
  },

  /**
   * Close the modal without making any changes to the data
   */
  _closeModal: function(e) {
    e.preventDefault();
    var $modal = this.$('.attestation-warning-modal').removeClass('in');
    // defer hiding element until transition is done.
    _.defer(function() { $modal.hide(); }, 150);
  },

  /**
   * Remove any "No" attestations, then close the model. There should only be
   * one "No" attestation at any time that the modal is opened, because it's
   * only opened when 'didRefuseAnAttestation' goes from false to true.
   */
  _closeModalWithCancel: function(e) {
    this._closeModal(e);
    var $falseAttestations = this.$('input[type=radio][value=false]:checked');
    $falseAttestations.each(function() {
      // Clear the "No" attestation, returning the radio group to an unselected
      // state.
      $(this).prop('checked', false);
      $(this).parent().removeClass('active');
      $(this).change();
    });
  },

  _onSubmitClick: function(e) {
    e.preventDefault();

    // User must have entered a "signature", aka any text
    var hasSigned = false;
    if (_.isEmpty(this.$('[name=esignature]').val())) {
      var stringContent = this.getContent(this.cardName);
      this.renderInvalidMarker('esignature', stringContent.esign.error);
      hasSigned = false;
    } else {
      this.clearInvalidMarker('esignature');
      hasSigned = true;
    }

    var attestations = this._renderAndValidateAttestations(e, true);
    var hasMissingAttestation = _.contains(_.values(attestations), null);

    // If we haven't signed, or any visible attestation is null, don't
    // allow you to submit
    if (hasMissingAttestation || !hasSigned) {
      this._scrollTo(this.$('.has-error').first());
      Analytics.track('MPL App Completion Invalid', {
        message: this.$('.has-error :first .error-message').text(),
        invalidFields: this.$('.has-error input').map(
          function() { return $(this).attr('name'); })
      });
      return;
    }

    // Saving to model can't be invalid because all attestations are optional.
    this.saveToModel();

    // Disable form during model save even thought it'll be disabled again by
    // AsyncSubmissionUtil.
    var self = this;
    this._disableForm();
    this.model.save(null, {
      success: function(app, response, xhr) {
        AsyncSubmissionUtil.startSubmitThenPoll(
          self, 'MPL App Completion', self.model.url() + '/submit/');
      },
      error: function(app, response) {
        self._enableForm();
        Analytics.track('MPL App Completion Error', {
          message: response.status || 'error saving'
        });
      }
    });
  },

  /**
   * Returns a group name of affirmations that this affirmation belongs to.
   * Matches the preamble of the affirmation against an array of affirmation
   * group preambles.
   *
   * Note: set affirmationGroups for a particular locale
   * in the content strings file for this class - that way each local can
   * have groups that make sense for the users language.
   *
   * @param {string} affirmationText eg "Everyone applying for coverage has the same
   *    permanent home address"
   * @returns {string} A group name of affirmations that this affirmation belongs to.
   *    eg "Everyone applying for coverage"
   */
  getAffirmationGroup: function(affirmationText) {
    var self = this;
    var content = self.getContent();

    var matchedGroups = _.filter(content.affirmationGroups, function(g){
      return g && g.length>0 && affirmationText.indexOf(g) === 0;
    });

    // find the longest match - breaks the tie between two group matches
    // (say "Nobody in my household" and "Nobody in my household on my tax return".
    if (matchedGroups.length > 0){
      return _.max(matchedGroups, function(g){ return g.length; });
    }

    // by default the group is just whatever the affirmation text is
    return affirmationText;
  },

  /**
   * Returns a list of affirmation groups.
   *
   * This allows us to group affirmations together for example:
   * Everyone applying for coverage...
   * - has the same permanent home address
   * - is not temporarily living out of state
   *
   * without repeating Everyone applying for coverage
   *
   * Note: See getAffirmationGroup for more detail on how this is done
   */
  getGroupedAffirmations: function() {
    var self = this;

    return _.groupBy(this.getAffirmations(), function(affirmation){
      return self.getAffirmationGroup(affirmation);
    });
  },

  /**
   * Returns a list of affirmations. This is basic household information
   * that come from the basic screener and is now in affirmative form.
   *
   * These affirmations are set in the content strings for this class.
   * Each question may have more than one affirmation to allow them to be
   * grouped.
   *
   * Because these are complex to read we group them together to minimize
   * the amount of text the user has to encounter.
   */
  getAffirmations: function() {
    var self = this;
    var content = self.getContent();
    var sections = ScreenerUtil.getSectionedScreenerQuestions(this.model);

    // Some questions don't need to have their answers displayed
    // on the summary screen, or have their answers combined
    // with other answers. Put them in the blacklist.
    var SUMMARY_QUESTION_BLACKLIST = ['ssn', 'stepchild'];

    var affirmationKeys =
      _.difference(
        _.flatten(
          _.pluck(sections, 'questions')
        ),
        SUMMARY_QUESTION_BLACKLIST
      );

    var affirmations = _.map(affirmationKeys, function(affirmationKey){
      return ScreenerUtil.getScreenerQuestionText(
        self.model, content, affirmationKey);
    });
    return _.flatten(affirmations);
  },

  /**
   * Strips the group name from the affirmation so it doesn't have
   * to be repeated
   *
   * @param {string} affirmationGroup eg "Everyone applying for coverage"
   * @param {string} affirmation eg "Everyone applying for coverage has the
   *    same permanent home address"
   * @returns {string} An affirmation without the group name repeated.
   *    eg "has the same permanent home address"
   */
  formatAffirmation: function(affirmationGroup,affirmation){
    // careful since we're dealing with strings file
    affirmation = affirmation || '';
    affirmationGroup = affirmationGroup || '';
    return affirmation.slice(affirmationGroup.length);
  }


});

return ApplicationSummaryView;

});
