define([
  'data/states',
  'util/strings',
  'util/grammar',
  'util/analytics',
  'util/browser-utils',
  'models/app-model',
  'views/card-view',
  'util/app-context',
  'common/util/ffm-util',
  'text!templates/help/_popover-label.html',
  'text!templates/basic-info-screener.html'
], function(
  StatesData,
  Strings,
  Grammar,
  Analytics,
  BrowserUtils,
  AppModel,
  CardView,
  AppContext,
  FFMUtil,
  helpPopoverLabelTemplate,
  basicInfoScreenerTemplate
) {

  /**
   * The initial card that collects information about the household contact.
   * Note that the contact may or may not be an applicant themselves.
   */
  var BasicInfoScreenerView = CardView.extend({
    templateText: basicInfoScreenerTemplate,
    className: CardView.prototype.className + ' basic-info-screener blue-bg',
    cardName: 'basic-info-screener',

    events: function() {
      var events = {
        'change [name="isMarried"]': 'onMaritalStatusChanged',
        'change [name="tendon:coverageState"]': 'onStateSelectChanged',
        'change [name="tendon:numDependents"]': 'onNumDependentsChanged',
        'change [name="isIncomeBelowFACutoff"]': 'onIncomeChanged',
        'change [name="tendon:requireFinancialInfo"]': 'onRequireFinancialInfoChanged',
        'click .btn-retry-check-existing': 'onShouldCheckExistingApplications',
        'submit form': '_onFormSubmit',
        'submit .btn-submit': '_onFormSubmit',

        // Hide state input unless user needs to change it
        'click .show-state-input': 'onShowStateInput'
      };

      return events;
    },

    initialize: function(options) {
      CardView.prototype.initialize.call(this, _.defaults(options, {
        onSuccess: null
      }));
      Analytics.track('MPL Screener Load');

      _.bindAll(this, [
        'onShouldCheckExistingApplications',
        'onApplicationIndexRetrieved',
        'onApplicationIndexError',
        'onModelChanged',
        'postRenderHooks'
      ]);

      this.listenTo(this.model, 'change', this.onModelChanged);
      this.listenTo(this.model, 'change:coverageState', this.onShouldCheckExistingApplications);
    },

    /**
     * When user navigates back in their browser to the screener page,
     * a number of things happens by default:
     * - model remains unchanged (contains a state)
     * - view is recreated from scratch and shows default option which is
     *   "select a state", so is now inconsistent with model
     *   - onStateSelectChanged is not fired, since the view was just created
     */
    postRenderHooks: function() {
      CardView.prototype.postRenderHooks.call(this);
      this.$submit = this.$('.state-success-container .btn-submit');

      this.loadFromModel();

      this.onModelChanged();

      // Restore state if navigating back to this page.
      this.onCoverageStateChanged();

      // Refer to the household if there is a spouse or dependents
      this._updateHouseholdNoun();

      // Use the full state name not just the two-letter abbreviation from the model
      this.$('.state-name').html(this.$('[name="tendon:coverageState"] option:selected').text());

      this._updateFPLCutoff();

      if (BrowserUtils.needHackySelectStyling(window.navigator.userAgent)) {
        this.$('select').addClass('hacky-windows-select');
      }

      var self = this;
      _.defer(function() { self.$('.radio-label').first().focus(); });
    },

    /** @override */
    renderInvalidMarkers: function(prefix, errors) {
      // We only do validation if the application is marked as complete,
      // which isn't the case after the user fills in the basic info screener.
      // So here we call isBasicInfoValid in onModelChanged instead
      // and enable or disable the continue button instead of showing errors.
    },

    getRenderData: function() {
      return _.extend(CardView.prototype.getRenderData.call(this), {
        coverageYear: this.model.get('coverageYear'),
        ffmLink: this.getFFMlink()
      });
    },

    getFFMlink: function() {
      // Generate state-specific link for using FFM instead of MPL.
      // Used when MPL doesn't handle a particular situation.
      // User is already logged in at this point and their coverage state
      // is set in FFM, so we can take them directly to the start application screen
      var state = this.model.get('coverageState');
      var year = this.model.get('coverageYear');
      return FFMUtil.getApplicationUrl(AppContext.getLocale(), state, year);
    },

    onMaritalStatusChanged: function(e) {
      var isMarried = $('[name="isMarried"]:checked').val() === 'true';

      this.model.set('isMarried', isMarried, {validate: 'isMarried'});

      if (isMarried) {
        this.model.addSpouse();
      } else {
        this.model.removeSpouse();
      }

      this._updateHouseholdNoun();
      this._showFAQuestionsIfHouseholdSizeComplete();
      this._updateDependentInfoHelpText(isMarried);

      // If our dependents change, we need to force the user to reconfirm FA/non-FA flow
      this._clearFASelections();
      this._removeSubsequentSections();
    },

    onNumDependentsChanged: function(e) {
      var $target = $(e.target);

      if ($target.val() === '') {
        // user just changed dropdown back to the default "Select",
        $target.removeClass('selected');
      } else {
        var numDependents = Number($target.val());

        // Don't use parseInt so that '1a0' won't parse as 1; it goes to NaN.
        this.model.set(
            'numDependents', numDependents, {validate: 'numDependents'});
        this._fullOpacity($target);

        if (numDependents > this.model.getDependents().length) {
          while (numDependents > this.model.getDependents().length) {
            this.model.addDependent();
          }
        } else if (numDependents < this.model.getDependents().length) {
          while (numDependents < this.model.getDependents().length) {
            if (!this.model.removeDependent()) {
              break;
            }
          }
        }

        this._updateHouseholdNoun();
        this._showFAQuestionsIfHouseholdSizeComplete();

        // If our dependents change, we need to force the user to reconfirm FA/non-FA flow
        this._clearFASelections();
        this._removeSubsequentSections();
      }
    },

    /**
     * Removes sections that follow basic info screener if basic info is changed
     * in a way that requires the user to change data already entered (or reconfirm
     * that it is valid).
     * @private
     */
    _removeSubsequentSections: function() {
      $('.special-cases-screener').remove();
      $('.non-fa-last-step').remove();
    },

    onRequireFinancialInfoChanged: function(e) {
      var requireFinancialInfo = $('[name="tendon:requireFinancialInfo"]:checked').val() === 'true';

      this.model.set('requireFinancialInfo', requireFinancialInfo, {validate: 'requireFinancialInfo'});
      this._removeSubsequentSections();
    },

    onShowStateInput: function(e) {
      this.$('.state-update').removeClass('hidden');
      this.$('.current-state').addClass('hidden');
      this._removeSubsequentSections();
      // hide the normal state success container
      this.$('.state-success-container').addClass('hidden');
    },

    onStateSelectChanged: function(e) {
      var $target = $(e.target);
      this._fullOpacity($target);
      this.saveToModel('coverageState');
      // this information also needs to be saved in the household contact
      var state = this.model.get('coverageState');
      this.model.get('householdContact').set('state', state);
    },

    /**
     * Called when model.coverageState changes or from postRenderHooks on back
     * navigate.
     */
    onCoverageStateChanged: function() {
      var coverageState = this.model.get('coverageState');
      var coverageYear = this.model.get('coverageYear');

      if (!coverageState) {
        this.$('[name="tendon:coverageState"]').val('');

        this.$('.fail-state-container').addClass('hidden');
        this.$('.fail-territory-container').addClass('hidden');
        this.$('.state-success-container').addClass('hidden');
        this.$('.state-update').removeClass('hidden');

        this._removeSubsequentSections();

        return;
      }

      this.$('[name="tendon:coverageState"]').val(coverageState);

      var sbmInfo = StatesData.getStateMarketplaceInfo(
        coverageYear, coverageState);

      var content = this.getContent(this.cardName);
      if (sbmInfo && !sbmInfo.shopOnly && !sbmInfo.infoOnly) {
        Analytics.trackLinks(
            '.fail-state-container .btn-submit',
            'MPL Screener Sent To SBM',
            function(outgoingLink) {
              return {state: $(outgoingLink).data('state')};
            });

        this.$('.fail-territory-container').addClass('hidden');
        this.$('.state-success-container').addClass('hidden');

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
        this.$('.state-success-container').addClass('hidden');
      } else {
        // Normal state covered by the FFM.
        this.$('.fail-state-container').addClass('hidden');
        this.$('.fail-territory-container').addClass('hidden');
        this.$('.state-success-container').removeClass('hidden');
      }
    },

    _fullOpacity: function($target) {
      $target.addClass('selected');
    },

    _updateHouseholdNoun: function() {
      var content = this.getContent();
      var single = this.model.getHouseholdSize() === 1;
      var askIncomeText = single ? content.askIncomeSingle : content.askIncomeMultiple;

      // this partial is originally rendered in basic-info-screener.html, make sure to update it there
      var askIncomeHTML = this.renderTemplate(helpPopoverLabelTemplate, {
        label: askIncomeText,
        content: Strings.format(content.askIncomeHelp, {coverageYear: this.model.get('coverageYear')}),
        options: {
          append: true,
          escapePopover: false
        }
      });

      this.$('.ask-income .question-text').html(askIncomeHTML);

      this.postPopoverRender();
    },

    _updateDependentInfoHelpText: function(isMarried) {
      var content = this.getContent();
      var numDependentsContent = isMarried ?
        content.numDependentsInfoMarried : content.numDependentsInfo;
      var numDependentsText = Strings.format(numDependentsContent,
        {coverageYear: this.model.get('coverageYear')});
      this.$('#dependent-info-help-text').html(numDependentsText);
    },

    _clearFASelections: function() {
      var clearRadio = function (i, e) {
        var $el = $(e);
        $el.prop('checked', false);
        $el.closest('.btn').toggleClass('active', false);
      };

      this.$('[name="tendon:requireFinancialInfo"]').each(clearRadio);
      this.$('[name="isIncomeBelowFACutoff"]').each(clearRadio);
      this.$('.fa-eligibility').addClass('hidden');

      this.model.set('isUnderFACutoff', null);
      this.model.set('requireFinancialInfo', null);
    },

    _updateFADefaultChoice: function() {
      var isMaybeEligible = this.model.isMaybeEligibleForSubsidy();

      this._setFAChoice(isMaybeEligible);
      this._updateFPLCutoff();
    },

    _setFAChoice: function(choice) {
      this.$('[name="tendon:requireFinancialInfo"]').each(function (i, e) {
        var $el = $(e);
        var checked = choice ? $el.val() === 'true' : $el.val() === 'false';

        // using the pattern from card-view.js to select these radio buttons
        $el.prop('checked', checked);
        // handle bootstrap buttons
        $el.closest('.btn').toggleClass('active', checked);
      });

      this.model.set('requireFinancialInfo', choice, {validate: 'requireFinancialInfo'});
      this._removeSubsequentSections();
    },

    _updateFPLCutoff: function() {
      // round the cutoff to thousands
      var roundedCutoff = Math.round(this.model.getBufferedFPLCutoff() / 1000) * 1000;
      var cutoff = Grammar.currencyFormat(roundedCutoff, true);
      var content = this.getContent();

      // we deliberately don't use isMaybeEligibleForSubsidy() here because it's
      // equal to true when isUnderFACutoff is null, which we don't want here--
      // we want to find out if the user has selected one of the income options
      var isMaybeEligible = this.model.get('isUnderFACutoff');

      var eligibilityText;
      if (!_.isNull(isMaybeEligible)) {
        eligibilityText = Strings.format(isMaybeEligible ?
          content.faUserChoice.askIfLikelyEligible :
          content.faUserChoice.askIfNotLikelyEligible,
          {coverageYear: this.model.get('coverageYear')});
      } else {
        eligibilityText = content.faUserChoice.askIfIncomeUnknown;
      }

      var eligibilityHTML = this.renderTemplate(helpPopoverLabelTemplate, {
        label: eligibilityText,
        content: content.faUserChoiceHelp,
        options: {
          append: true,
          escapeLabel: false,
          escapePopover: false
        }
      });

      this.$('.fa-choice .question-label').html(eligibilityHTML);

      this.postPopoverRender();

      this.$('.cutoff').each(function(i, e) {
        $(e).text(cutoff);
      });
    },

    _showFAQuestionsIfHouseholdSizeComplete: function() {
      if (!_.isNull(this.model.get('isMarried')) &&
          !_.isNull(this.model.get('numDependents'))) {
        this.$('.household-size-success-container').removeClass('hidden');
      }
    },

    onModelChanged: function(e) {
      // show/hide the continue button
      if (this.$submit) { // added submit check to work with phantomjs tests
        if (!this.model.isBasicInfoValid()) {
          this.$submit.prop('disabled', true);
        } else {
          this.$submit.prop('disabled', false);
        }
      }
      // Keep the 420% FPL consistent as the model changes
      this._updateFPLCutoff();
    },

    onIncomeChanged: function(e) {
      var isUnderFACutoff = this.$('[name="isIncomeBelowFACutoff"]:checked').val() === 'true';
      this.model.set('isUnderFACutoff', isUnderFACutoff, {validate: 'isUnderFACutoff'});

      this._updateFADefaultChoice();
    },

    _onFormSubmit: function(e) {
      e.preventDefault();

      // for keyboard 'return' keypresses, which can submit even if this field
      // is disabled
      if (this.$submit.prop('disabled')) { return; }

      // TODO come up with a better way to do page-specific validation
      this.model.set('complete', false);

      if (!this.saveToModel()) {
        return;
      }

      var state = this.model.get('coverageState');
      Analytics.track('MPL Screener Submit');

      var onSuccess = this.options.onSuccess;

      var submitBtn = this.$submit;
      submitBtn.prop('disabled', true);

      this.model.set('specialCasesStatus',
        AppModel.SPECIAL_CASES_STATUS.INCOMPLETE);
      this.model.save(null, {
        success: function(app, response, xhr) {
          Analytics.track('MPL Screener Success');
          if (onSuccess) {
            onSuccess();
          }
          // keep focus on submit button so next tab keypress doesn't cycle to
          // top of page before screener question dynamic content loads
          $('.state-success-container').find('.btn-submit').focus();
        },
        error: function(app, response) {
          Analytics.track('MPL Screener Error', {
            message: response.status || 'error saving'
          });
        },
        complete: function() {
          submitBtn.prop('disabled', false);
        }
      });
    },

    onShouldCheckExistingApplications: function(e) {
      // make sure the old state sections are removed
      this._removeSubsequentSections();
      // make the network call to find applications
      $.ajax('/marketplace/b/data/application/index', {
        type: 'get',
        data: { state: this.model.get('coverageState')},
        timeout: 20000, //milliseconds
        contentType: 'application/json',
        processData: true,
        success: this.onApplicationIndexRetrieved,
        error: this.onApplicationIndexError
      });
      this.onWaitingForApplicationIndex();
    },

    onWaitingForApplicationIndex: function(e) {
      this.$('.state-results-container').addClass('hidden');
      // make sure previous status information for existing apps is removed
      this.hideCheckExistingApplications();
      // set the spinner running
      this.$('.waiting-for-application-index-container').removeClass('hidden');
    },

    onFinishedWaitingForApplicationIndex: function(e) {
      this.$('.waiting-for-application-index-container').addClass('hidden');
    },

    hideCheckExistingApplications: function() {
      this.$('.waiting-for-application-index-container').addClass('hidden');
      this.$('.submittable-application-container').addClass('hidden');
      this.$('.non-submittable-application-container').addClass('hidden');
      this.$('.application-index-error-container').addClass('hidden');
    },

    onNoExistingApplication: function(index) {
      this.hideCheckExistingApplications();
      // show the state success container
      this.$('.state-results-container').removeClass('hidden');
      // show continue button
      this.onCoverageStateChanged();
      // also load marital status if it just appeared
      this.onMaritalStatusChanged();
    },

    onSubmittableClassicApplication: function(index) {
      var ffmAppId = index.applications[0].insuranceAppId;
      var state = this.model.get('coverageState');
      var locale = AppContext.getLocale();

      // show button to classic application
      this.$('.submittable-application-container')
            .find('.btn-continue-existing')
                .attr('href', FFMUtil.getResumeApplicationUrl(locale, state, ffmAppId))
            .end();
      this.$('.submittable-application-container').removeClass('hidden');
    },

    onSubmittableApp2Application: function(index) {
      this.$('.submittable-application-container').removeClass('hidden');
      var ffmAppId = index.applications[0].insuranceAppId;
      var state = this.model.get('coverageState');
      var locale = AppContext.getLocale();

      // show button to rejoin v2 application
      this.$('.submittable-application-container')
            .find('.btn-continue-existing')
                .attr('href', FFMUtil.getApp2ResumeApplicationUrl(locale, state, ffmAppId))
            .end();
    },

    onNonSubmittableApplication: function(index) {
      // show manage applications button or modal
      this.$('.non-submittable-application-container')
            .find('.btn-manage')
                .attr('href', FFMUtil.getManageApplicationsUrl(AppContext.getLocale()))
            .end();
      this.$('.non-submittable-application-container').removeClass('hidden');
    },

    onApplicationIndexError: function(xhr, status, error) {
      this.onFinishedWaitingForApplicationIndex(error);
      // show retry later message
      this.$('.application-index-error-container').removeClass('hidden');
    },

    onApplicationIndexRetrieved: function(index, status, xhr) {
      var self = this;
      // stop spinner
      this.onFinishedWaitingForApplicationIndex(index);

      // call the appropriate handler
      switch(index.code) {
        case 'NoExistingApplication':
            self.onNoExistingApplication(index);
            break;
        case 'SubmittableClassicApplication':
            self.onSubmittableClassicApplication(index);
            break;
        case 'SubmittableApp2Application':
            self.onSubmittableApp2Application(index);
            break;
        case 'NonSubmittableApplication':
            self.onNonSubmittableApplication(index);
            break;
        default:
            self.onNonSubmittableApplication(index);
      }
    }

  });
return BasicInfoScreenerView;

});
