define([
  'views/card-view',
  'common/util/oe-date-util',
  'util/analytics',
  'text!templates/forms/_applicant-checklist.html',
  'text!templates/non-fa-sep.html'
], function(
  CardView,
  OeDateUtil,
  Analytics,
  applicantChecklistTemplate,
  nonFaSepTemplate
) {

/**
 * A view that asks miscellaneous questions about their current coverage.
 */
var NonFaSepView = CardView.extend({
  templateText: nonFaSepTemplate,
  cardName: 'non-fa-sep',
  className: CardView.prototype.className + ' non-fa-sep',

  partials: _.extend({}, CardView.prototype.partials, {
    'forms/_applicant-checklist': applicantChecklistTemplate
  }),

  events: _.extend({}, CardView.prototype.events, {
    'click .btn-submit': '_onSubmitClicked',
    'change .tax-penalty-sep-question input[type="radio"]': '_onIsEligibleForTaxPenaltySepChanged',
    'change .special-enrollment-questions input[type="checkbox"]': '_onSpecialEnrollmentQuestionCheckboxChanged'
  }),

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
    Analytics.track('MPL App Non-FA SEP Load');

    _.each(this.model.get('people'), function(person, i) {
      this.bindValidationEvents(person, 'tendon:people[' + i + '].');
    }, this);

    this.onSuccess = options.onSuccess || function() {};
  },

  getRenderData: function() {
    return _.extend(CardView.prototype.getRenderData.call(this), {
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
  },

  _onIsEligibleForTaxPenaltySepChanged: function() {
    var isEligibleForTaxPenaltySep = this.$('[name="tendon:isEligibleForTaxPenaltySep"]:checked').val() === 'true';
    this.$('.prior-year-tax-penalty-question').toggleClass('hidden', !isEligibleForTaxPenaltySep);

    // if we say 'no' current coverage, clear the current coverage values
    if (!isEligibleForTaxPenaltySep) {
      this.model.set('owePriorYearTaxPenalty', null);
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

  // TODO(benkomalo): DRY this up. A few views that act as
  // "page level controllers" all share similar logic.
  _onSubmitClicked: function(e) {
    e.preventDefault();

    if (!this.saveToModel()) {
      this._scrollTo(this.$('.has-error').first());
      this.$('.has-error input').first().focus();
      Analytics.track('MPL App Non-FA SEP Invalid', {
        message: JSON.stringify(this.model.validationError),
        invalidFields: this.$('.has-error input').map(
          function() { return $(this).attr('name'); })
      });
      return;
    }

    if (!this.model.isValid()) {
      console.log('Unexpected validation failure!');
      console.log(JSON.stringify(this.model.validationError));
      Analytics.track('MPL App Non-FA SEP Invalid', {
        message: JSON.stringify(this.model.validationError)
      });
      return;
    }

    this.model.set('complete', true);
    Analytics.track('MPL App Non-FA SEP Submit');

    var onSuccess = this.onSuccess;

    var submitBtn = this.$('.btn-submit');
    submitBtn.prop('disabled', true);

    this.model.save(null, {
      success: function(app, response, xhr) {
        Analytics.track('MPL App Non-FA SEP Success');
        onSuccess();
      },
      error: function(app, response, options) {
        Analytics.track('MPL App Non-FA SEP Error', {
          message: response.status || 'error saving'
        });
      },
      complete: function() {
        submitBtn.prop('disabled', false);
      }
    });
  }
});


return NonFaSepView;

});
