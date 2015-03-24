define([
  'views/card-view',
  'common/data/states',
  'common/util/oe-date-util',
  'text!templates/forms/_applicant-checklist.html',
  'text!templates/additional-coverage-questions.html',
  'util/analytics',
  'moment'
], function(
  CardView,
  States,
  OeDateUtil,
  applicantChecklistTemplate,
  additionalCoverageTemplate,
  Analytics,
  moment
) {

/**
 * A view that asks miscellaneous questions about their current coverage.
 */
var AdditionalCoverageQuestionsView = CardView.extend({
  templateText: additionalCoverageTemplate,
  cardName: 'additional-coverage-questions',
  className: CardView.prototype.className + ' additional-coverage-questions',

  partials: _.extend({}, CardView.prototype.partials, {
    'forms/_applicant-checklist': applicantChecklistTemplate
  }),

  events: _.extend({}, CardView.prototype.events, {
    'click .btn-submit': '_onSubmitClicked',
    'change .currently-covered-question input[type="radio"]': '_onCurrentlyCoveredChanged',
    'change .existing-coverage-types input[type="checkbox"]': '_onExistingCoverageTypeChanged',
    'change .special-enrollment-questions input[type="checkbox"]': '_onSpecialEnrollmentQuestionCheckboxChanged',
    'change .existing-coverage-types input': '_onCoverageSelection',
    'change .tax-penalty-sep-question input[type="radio"]': '_onIsEligibleForTaxPenaltySepChanged',
    'change [name="tendon:agreedToRenewEligibility"]': '_onEligibilityRenewalChanged',
    'change #not-medicaid-chip-eligible input': '_onMedicaidCHIPIneligibleChanged'
  }),

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
    Analytics.track('MPL App Additional Qs 2 Load');

    _.each(this.model.get('people'), function(person, i) {
      this.bindValidationEvents(person, 'tendon:people[' + i + '].');
    }, this);

    this.onSuccess = options.onSuccess || function() {};
  },

  getRenderData: function() {
    var notMedicaidCHIPEligibleDateKey = 'notMedicaidCHIPEligibleDate' +
      this.model.get('coverageYear');
    var appliedAtStateDuringOEPDateKey = 'appliedAtStateDuringOEPDate' +
      this.model.get('coverageYear');
    return _.extend(CardView.prototype.getRenderData.call(this), {
      chipWaitingPeriod: States.getChipWaitingPeriod(
        this.model.get('coverageState')),
      notMedicaidCHIPEligibleDateKey: notMedicaidCHIPEligibleDateKey,
      appliedAtStateDuringOEPDateKey: appliedAtStateDuringOEPDateKey,
      isTaxPenaltySepPeriod: OeDateUtil.isTaxPenaltySepPeriod
    });
  },

  postRenderHooks: function() {
    CardView.prototype.postRenderHooks.apply(this, arguments);

    this.loadFromModel();

    this._onIsEligibleForTaxPenaltySepChanged();

    this.$('.question')
      .filter(function() {
        return $(this)
          .closest('.checkbox')
          .find('input[type="checkbox"]')
          .prop('checked');
      })
      .removeClass('hidden');

    var agreedToRenew = this.model.get('agreedToRenewEligibility');
    var showRenewalYears = agreedToRenew === null ? true : agreedToRenew;
    this.$('.eligibility-renewal-years').toggleClass('hidden', showRenewalYears);

    _.each(this.model.getIndexedPeopleApplyingForInsurance(), function(indexedPerson) {
      var i = indexedPerson[1];
      var person = indexedPerson[0];
      var current = person.get('currentCoverage');
      var sectionSelector = '.person-coverage-section[data-person-index=' + i + ']';

      // show coverage types if we have some already
      if (current && current.length > 0) {
        this.$(sectionSelector + ' .existing-coverage-types').removeClass('hidden');
      }

      // show other coverage type input forms if 'other' is checked
      if (current && current.indexOf('OTHER') !== -1) {
        this.$(sectionSelector + ' .other-coverage').removeClass('hidden');
      }
    }, this);
  },

  _onCoverageSelection: function(e) {
    // When you select certain coverage types, you need to put up
    // some help text. Once the help text goes up, leave it up

    var type = $(e.target).attr('value');

    if (type === 'MEDICAID') {
      if ($(e.target).parentsUntil('.existing-coverage-types').find('.message').length === 0) {
        var message = $('<div>').addClass('message alert alert-info').html(this.getContent().medicaidMessage);
        $(e.target).parentsUntil('.form-group').after(message);
      }
    } else if (type === 'CHIP') {
      if ($(e.target).parentsUntil('.existing-coverage-types').find('.message').length === 0) {
        var message = $('<div>').addClass('message alert alert-info').html(this.getContent().chipMessage);
        $(e.target).parentsUntil('.form-group').after(message);
      }
    }
  },

  _onCurrentlyCoveredChanged: function(e) {
    var $target = $(e.currentTarget);
    var $personSection = $target.closest('.person-coverage-section');
    var personIndex = parseInt($personSection.data('person-index'), 10);

    $personSection
        .find('.existing-coverage-types')
        .toggleClass('hidden', $target.val() !== 'true');

    // if we say 'no' current coverage, clear the current coverage values
    if ($target.val() === 'false') {
      this.model.get('people')[personIndex].clearCurrentCoverage();
    }
  },

  _onExistingCoverageTypeChanged: function(e) {
    var type = $(e.target).attr('value');

    if (type === 'OTHER') {
      var showOtherCoverage = $(e.target).prop('checked');
      $('.other-coverage').toggleClass('hidden', !showOtherCoverage);
    }
  },

  _onSpecialEnrollmentQuestionCheckboxChanged: function(e) {
    var $target = $(e.currentTarget);
    var isChecked = $target.prop('checked');

    $target
      .closest('.checkbox')
      .find('.question')
      .toggleClass('hidden', !isChecked);
  },

  _onEligibilityRenewalChanged: function() {
    var isRenewalAgreed = this.$('[name="tendon:agreedToRenewEligibility"]:checked').val() === 'true';

    // we set/update/validate the field here instead of waiting for saveToModel
    // because when you select "i disagree", new ui appears below, and it
    // feels weird and wrong to have new ui appear, but have the error
    // message remain (as if you haven't corrected the error yet)
    // Also must set validate because appModel is special and doesn't validate
    // everything on set
    this.model.set('agreedToRenewEligibility', isRenewalAgreed, {validate: 'agreedToRenewEligibility'});
    this.$('.eligibility-renewal-years').toggleClass('hidden', isRenewalAgreed);

    // update the hidden radio buttons (0-5 years) when you agree/disagree to coverage renewal
    if (isRenewalAgreed) {
      this.model.set({'numYearsForEligibilityRenewal': 5});
    } else {
      this.model.set({'numYearsForEligibilityRenewal': null});

      // make sure we don't have any active classes on these radio buttons
      this.$('[name="tendon:numYearsForEligibilityRenewal"]').each(function(i, e) {
        $el = $(e);
        $el.prop('checked', false);
        $el.closest('.btn').removeClass('active');
      });
    }
  },

  _onIsEligibleForTaxPenaltySepChanged: function() {
    var isEligibleForTaxPenaltySep = this.$('[name="tendon:isEligibleForTaxPenaltySep"]:checked').val() === 'true';
    this.$('.prior-year-tax-penalty-question').toggleClass('hidden', !isEligibleForTaxPenaltySep);

    // if we say 'no' current coverage, clear the current coverage values
    if (!isEligibleForTaxPenaltySep) {
      this.model.set('owePriorYearTaxPenalty', null);
    }
  },

  _clearDeniedDuringOpenEnrollmentCheckbox: function(personIndex) {
    var checkbox = $('[name="tendon:people[' + personIndex + '].appliedAtStateDuringOEP"]');
    checkbox.prop('checked', false);
  },

  _clearOpenEnrollmentCheckboxIfNecessary: function(e) {
    var $target = $(e.currentTarget);
    var medicaidDeniedCheckboxCleared = !$target.is(':checked');

    if (medicaidDeniedCheckboxCleared) {
      var personIndex = $target.attr('data-person-index');
      this._clearDeniedDuringOpenEnrollmentCheckbox(personIndex);
    }
  },

  _shouldHideOpenEnrollmentQuestion: function() {
    // count any applicants who have been found ineligible
    var medicaidIneligibles = this.$('#not-medicaid-chip-eligible input[type="checkbox"]:checked');
    return medicaidIneligibles.length === 0;
  },

  _clearAllOpenEnrollmentCheckboxes: function() {
    $('#applied-at-state-during-open-enrollment-question input:checkbox').each(function(i,checkbox){
      checkbox.checked = false;
    });
  },

  _showOpenEnrollmentQuestionIfNecessary: function(e) {
    var question = this.$('#applied-at-state-during-open-enrollment-question');
    var shouldHide = this._shouldHideOpenEnrollmentQuestion();
    question.toggleClass('hidden', shouldHide);
    if (shouldHide){
      this._clearAllOpenEnrollmentCheckboxes();
    }
  },

  _onMedicaidCHIPIneligibleChanged: function(e) {
    this._showOpenEnrollmentQuestionIfNecessary(e);
    this._clearOpenEnrollmentCheckboxIfNecessary(e);
  },

  // TODO(benkomalo): DRY this up. A few views that act as
  // "page level controllers" all share similar logic.
  _onSubmitClicked: function(e) {
    e.preventDefault();

    // TODO come up with a better way to do page-specific validation
    this.model.set('complete', true);

    if (!this.saveToModel()) {
      this._scrollTo(this.$('.has-error').first());
      this.$('.has-error input').first().focus();
      Analytics.track('MPL App Additional Qs 2 Invalid', {
        message: this.$('.has-error :first .error-message').text(),
        invalidFields: this.$('.has-error input').map(
          function() {return $(this).attr('name'); })
      });
      return;
    }

    if (!this.model.isValid()) {
      console.log('Unexpected validation failure!');
      console.log(JSON.stringify(this.model.validationError));
      Analytics.track('MPL App Additional Qs 2 Invalid', {
        message: JSON.stringify(this.model.validationError)
      });
      return;
    }

    var onSuccess = this.onSuccess;
    Analytics.track('MPL App Additional Qs 2 Submit');

    var submitBtn = this.$('.btn-submit');
    submitBtn.prop('disabled', true);

    this.model.save(null, {
      success: function(app, response, xhr) {
        Analytics.track('MPL App Additional Qs 2 Success');
        onSuccess();
      },
      error: function(app, response, options) {
        Analytics.track('MPL App Additional Qs 2 Error', {
          message: response.status || 'error saving'
        });
      },
      complete: function() {
        submitBtn.prop('disabled', false);
      }
    });
  }
});


return AdditionalCoverageQuestionsView;

});
