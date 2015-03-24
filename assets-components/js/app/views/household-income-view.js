define([
  'util/income',
  'models/income-source',
  'views/income-view',
  'views/card-view',
  'util/strings',
  'util/analytics',
  'text!templates/household-income.html'
], function(
  IncomeUtil,
  IncomeSource,
  IncomeView,
  CardView,
  Strings,
  Analytics,
  householdIncomeTemplate
) {

/**
 * An aggregate view that collects income information for the household.
 */
var HouseholdIncomeView = CardView.extend({
  templateText: householdIncomeTemplate,
  cardName: 'household-income',
  className: CardView.prototype.className + ' household-income',

  events: {
    'click .btn-submit': '_onSubmitClicked'
  },

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
    Analytics.track('MPL App Income Load');

    this.subViews = _.map(this.model.get('people'), function(person, i) {
      return new IncomeView({model: this.model, personIndex: i});
    }, this);

    this.onSuccess = options.onSuccess || function() {};
  },

  getContent: function() {
    return _.extend({},
      CardView.prototype.getContent.apply(this, arguments),
      Strings.getGroup('income-source-model')
    );
  },

  getRenderData: function() {
    return _.extend(
        CardView.prototype.getRenderData.call(this), {
          IncomeSource: IncomeSource,
          people: this.model.get('people')
        });
  },

  render: function() {
    CardView.prototype.render.call(this);

    var $container = this.$('.individual-content-section');
    _.each(this.subViews, function(view) {
      $container.append(view.render().el);
    });

    // defer because doing it immediately doesn't focus properly.
    var self = this;
    _.defer(function() {
      self.$('.income-table-form-container .add').first().focus();
    });

    return this;
  },

  _onSubmitClicked: function(e) {
    e.preventDefault();

    // TODO come up with a better way to do page-specific validation
    this.model.set('complete', false);

    if (!this.saveToModel()) {
      this._scrollTo(this.$('.error-message').first());
      Analytics.track('MPL App Income Invalid', {
        message: this.$('.error-message:first').text(),
        invalidFields: this.$('.has-error input').map(
          function() { return $(this).attr('name'); })
      });
      return;
    }

    // Perform manual validation of isYearlyIncomeAccurate radio toggles
    // since those are not directly tied to any model/tendon properties.
    // Check each person and validate the 'expectedAnnualIncome' attribute. If there
    // is a validation error in expectedAnnualIncome and the radio toggle is not
    // selected then render an invalid marker. The actual expectedAnnualIncome field is
    // not validated here. That should be validated in the saveToModel call above.
    // Does the same for numHoursWorkedPerWeek.
    var inputsWithError = _.compact(_.map(this.model.get('people'),
        function(person, i) {
      var validationError = person.validate(person.attributes, {
        validate: ['expectedAnnualIncome', 'numHoursWorkedPerWeek']
      });
      if (!validationError) { return null; }
      if (validationError.expectedAnnualIncome) {
        if (this.$('#annual-income-' + i)
              .find('[name="isYearlyIncomeAccurate"]:checked')
              .length === 0) {

          var $input = this.$('#annual-income-' + i)
                .find('[name="isYearlyIncomeAccurate"]');
          this.renderInvalidMarker($input, this.getContent().incomeRequired);
          return $input;
        }
      }
      return null;
    }, this));

    if (inputsWithError.length > 0) {
      this._scrollTo(inputsWithError[0].closest('.form-group'));
      Analytics.track('MPL App Income Invalid', {
        message: this.$('.error-message:first').text(),
        invalidFields: inputsWithError.map(
          function(el) { return $(el).closest('input').attr('name'); })
      });
      return;
    }

    if (!this.model.isValid()) {
      console.log('Unexpected validation failure!');
      console.log(JSON.stringify(this.model.validationError));
      Analytics.track('MPL App Income Invalid', {
        message: JSON.stringify(this.model.validationError)
      });
      return;
    }

    Analytics.track('MPL App Income Submit');

    var onSuccess = this.onSuccess;
    var submitBtn = this.$('.btn-submit');
    submitBtn.prop('disabled', true);

    this.model.save(null, {
      success: function(app, response, xhr) {
        Analytics.track('MPL App Income Success');
        onSuccess();
      },
      error: function(app, response) {
        Analytics.track('MPL App Income Error', {
          message: response.status || 'error saving'
        });
      },
      complete: function() {
        submitBtn.prop('disabled', false);
      }
    });
  }
});


return HouseholdIncomeView;

});
