define([
  'views/card-view',
  'views/additional-coverage-questions-view',
  'util/analytics',
  'text!templates/forms/_applicant-checklist.html',
  'text!templates/additional-questions.html'
], function(
  CardView,
  AdditionalCoverageQuestionsView,
  Analytics,
  applicantChecklistTemplate,
  additionalQuestionsTemplate
) {

/**
 * A view that asks miscellaneous optional questions that may help them get more coverage.
 *
 * Note that 'additional-coverage-questions-view' is a subview that asks more qts on coverage.
 */
var AdditionalQuestionsView = CardView.extend({
  templateText: additionalQuestionsTemplate,
  cardName: 'additional-questions',
  className: CardView.prototype.className + ' additional-questions blue-bg',

  partials: _.extend({}, CardView.prototype.partials, {
    'forms/_applicant-checklist': applicantChecklistTemplate
  }),

  events: _.extend({}, CardView.prototype.events, {
    'click .btn-submit': '_onSubmitClicked'
  }),

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
    Analytics.track('MPL App Additional Qs 1 Load');

    _.each(this.model.get('people'), function(person, i) {
      this.bindValidationEvents(person, 'tendon:people[' + i + '].');
    }, this);
  },

  postRenderHooks: function() {
    CardView.prototype.postRenderHooks.apply(this, arguments);

    this.loadFromModel();
  },

  saveToModel: function() {
    var self = this;
    var uncheckedCheckboxes = this.$('input[type="checkbox"]')
        .filter(function() {
          return !$(this).prop('checked');
        })
        .each(function() {
          var question = $(this).closest('.question').data('question');
          var personIndex = $(this).data('person-index');
          self.model.get('people')[personIndex].set(question, false);
        });

    return CardView.prototype.saveToModel.apply(this, arguments);
  },

  _onSubmitClicked: function(e) {
    // TODO come up with a better way to do page-specific validation
    this.model.set('complete', false);

    if (!this.saveToModel()) {
      return;
    }

    if (!this.model.isValid()) {
      console.log('Unexpected validation failure!');
      console.log(JSON.stringify(this.model.validationError));
      Analytics.track('MPL App Additional Qs 1 Invalid', {
        message: JSON.stringify(this.model.validationError)
      });
      return;
    }

    var self = this;
    Analytics.track('MPL App Additional Qs 1 Submit');

    var submitBtn = this.$('.btn-submit');
    submitBtn.prop('disabled', true);

    this.model.save(null, {
      success: function(app, response, xhr) {
        var coverageView = self.renderSubView(AdditionalCoverageQuestionsView);

        // Longer than usual animation because we're skipping an entire card
        $('html, body').animate({scrollTop: coverageView.$el.offset().top},
          800);

        // delay since the field is not visibile for focussing immediately.
        _.defer(function() {
          $('.additional-coverage-questions a:first').focus();
        });
        Analytics.track('MPL App Additional Qs 1 Success');
      },
      error: function(app, response, xhr) {
        Analytics.track('MPL App Additional Qs 1 Error', {
          message: 'error saving'
        });
      },
      complete: function() {
        submitBtn.prop('disabled', false);
      }
    });
    e.preventDefault();
  }
});

return AdditionalQuestionsView;

});

