define([
  'util/strings',
  'util/grammar',
  'util/input-util',
  'util/income',
  'models/income-source',
  'models/deduction',
  'views/card-view',
  'views/table-form-view',
  'text!templates/income.html',
  'text!templates/income/_headers.html',
  'text!templates/income/_item.html',
  'text!templates/income/_item-fields.html',
  'text!templates/deductions/_headers.html',
  'text!templates/deductions/_item.html',
  'text!templates/deductions/_item-fields.html'
], function (
  Strings,
  Grammar,
  InputUtil,
  IncomeUtil,
  IncomeSource,
  Deduction,
  CardView,
  TableFormView,
  incomeTemplate,
  incomeHeadersTemplate,
  incomeItemTemplate,
  incomeItemFieldsTemplate,
  deductionHeadersTemplate,
  deductionItemTemplate,
  deductionItemFieldsTemplate
) {

/**
 * A view to show a table of income for a person and let the user add/remove
 * sources of income individually.
 */
var IncomeView = CardView.extend({
  templateText: incomeTemplate,
  className: CardView.prototype.className + ' income',
  cardName: 'income',

  events: function() {
    var events = _.extend({}, CardView.prototype.events, {
      'change .income-type-dropdown select': 'changeIncomeType',
      'change .income-frequency-dropdown select': 'changeIncomeFreq',
      'change [name="hasDeductions"]': 'showHideDeductions',
      'change [name="isYearlyIncomeAccurate"]': 'updateExpectedAnnualIncome',

      'focus .income-employer-street-address': 'showIncomeEmployerExtraAddressFields',
      'click .help-calculate-income': 'showIncomeCalculator',
      'click .income-calculator .cancel': 'hideIncomeCalculator',
      'click .income-calculator .save': 'saveCalculatedIncome',

      'change .deduction-type-dropdown': 'showHideOtherType'
    });

    // Use feature detection to see if we can use the 'input' DOM event
    // to detect text changes as a result of key inputs. Short of that,
    // we'll just approximate with a more crude keyup.
    var dummyInput = $('<input />').attr('oninput', 'return;')[0];
    var inputEventSupported = typeof dummyInput.oninput === 'function';
    var keyEvent = inputEventSupported ? 'input' : 'keyup';
    events[keyEvent + ' [name=incomeCalculator]'] = 'calculateIncome';
    return events;
  },

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);

    // Index of the person within this.model.get('people')
    this.personIndex = options.personIndex;

    this.person = this.model.get('people')[this.personIndex];

    _.bindAll(this,
      'renderIncomeHeaders',
      'renderIncomeItem',
      'renderIncomeItemFields',
      'onEditIncomeItem',
      'onCompleteEditingIncomeItem',
      'renderDeductionHeaders',
      'renderDeduction',
      'renderDeductionFields',
      'onEditDeduction',
      'onCompleteEditingDeduction',
      'onMAGIChanged');

    this.person
        .get('incomeSources')
        .on('add change remove reset', this.onMAGIChanged);
    this.person
        .get('deductions')
        .on('add change remove reset', this.onMAGIChanged);

    this.incomeTableFormView = new TableFormView({
      id: 'income-source-' + this.personIndex,
      model: this.model,
      collection: this.person.get('incomeSources'),
      addItemText: Strings.getGroup('income').addIncomeSource,
      tendonPrefix: 'tendon:people[' + this.personIndex + '].incomeSources',
      renderHeaders: this.renderIncomeHeaders,
      renderItem: this.renderIncomeItem,
      renderItemFields: this.renderIncomeItemFields,
      onEditItem: this.onEditIncomeItem,
      onSaveItem: this.onCompleteEditingIncomeItem,
      onCancelEditingItem: this.onCompleteEditingIncomeItem,
      onRemoveItem: this.onCompleteEditingIncomeItem
    });

    this.deductionsTableFormView = new TableFormView({
      id: 'deduction-' + this.personIndex,
      model: this.model,
      collection: this.person.get('deductions'),
      addItemText: Strings.getGroup('income').addDeduction,
      tendonPrefix: 'tendon:people[' + this.personIndex + '].deductions',
      renderHeaders: this.renderDeductionHeaders,
      renderItem: this.renderDeduction,
      renderItemFields: this.renderDeductionFields,
      onEditItem: this.onEditDeduction,
      onSaveItem: this.onCompleteEditingDeduction,
      onCancelEditingItem: this.onCompleteEditingDeduction,
      onRemoveItem: this.onCompleteEditingDeduction
    });
  },

  render: function() {
    CardView.prototype.render.apply(this, arguments);

    this.$('.income-table-form-container')
      .empty()
      .append(this.incomeTableFormView.render().el);

    this.$('.deductions-table-form-container')
      .empty()
      .append(this.deductionsTableFormView.render().el);

    this.onMAGIChanged();
    return this;
  },

  renderIncomeHeaders: function() {
    return this.renderTemplate(incomeHeadersTemplate, this.getRenderData());
  },

  renderIncomeItem: function(item, i) {
    return this.renderTemplate(incomeItemTemplate, _.extend(
      this.getRenderData(),
      {
        incomeSources: this.person.get('incomeSources'),
        incomeSource: item,
        i: i,
        IncomeSource: IncomeSource
      }
    ));
  },

  renderIncomeItemFields: function(item, i) {
    return this.renderTemplate(incomeItemFieldsTemplate, _.extend(
      this.getRenderData(),
      {
        incomeSources: this.person.get('incomeSources'),
        incomeSource: item,
        i: i,
        IncomeSource: IncomeSource
      }
    ));
  },

  onEditIncomeItem: function() {
    this.$('.income-table-form-container .income-type-dropdown select')
      .focus();
  },

  onCompleteEditingIncomeItem: function() {
    this.$('.income-table-form-container .add').first().focus();
  },

  renderDeductionHeaders: function() {
    return this.renderTemplate(deductionHeadersTemplate, this.getRenderData());
  },

  renderDeduction: function(item, i) {
    return this.renderTemplate(deductionItemTemplate, _.extend(
      this.getRenderData(),
      {
        deductions: this.person.get('deductions'),
        deduction: item,
        i: i,
        Deduction: Deduction
      }
    ));
  },

  renderDeductionFields: function(item, i) {
    return this.renderTemplate(deductionItemFieldsTemplate, _.extend(
      this.getRenderData(),
      {
        deductions: this.person.get('deductions'),
        deduction: item,
        i: i,
        Deduction: Deduction
      }
    ));
  },

  onMAGIChanged: function() {
    // Update the annual amount the user has to attest to
    this.$('.magi').text(Grammar.currencyFormat(this.person.getMAGI()));

    this.updateExpectedAnnualIncome();
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
          appModel: this.model,
          person: this.person,
          personIndex: this.personIndex,
          hasDeductions: this.person.get('deductions').length > 0,
          IncomeUtil: IncomeUtil
        });
  },

  showHideDeductions: function() {
    var $hasDeductions = this.$('[name="hasDeductions"]:checked');
    if ($hasDeductions.length === 0) {
      return;
    }

    this.clearInvalidMarker($hasDeductions);

    var hasDeductions = $hasDeductions.val() === 'true';

    this.$('.deductions-fieldset')
      .toggleClass('hidden', !hasDeductions);

    if (!hasDeductions) {
      this.deductionsTableFormView.clearItems();
    }
  },

  updateExpectedAnnualIncome: function() {
    var $isYearlyIncomeAccurate = this.$('[name="isYearlyIncomeAccurate"]:checked');
    if ($isYearlyIncomeAccurate.length === 0) {
      this.person.set('expectedAnnualIncome', null);
      // uncheck the radio button that confirms the now outdated income estimate
      this.$el.find('.income-attestation .active').removeClass('active');
      return;
    }

    this.clearInvalidMarker($isYearlyIncomeAccurate);

    var isYearlyIncomeAccurate = $isYearlyIncomeAccurate.val() === 'true';

    if (isYearlyIncomeAccurate) {
      this.person.set('expectedAnnualIncome', this.person.getMAGI());
    } else {
      var $input = this.$('.expected-annual-income');
      var expectedAnnualIncome = $input.val();
      this.person.set('expectedAnnualIncome', expectedAnnualIncome);
    }

    this.$('.expected-annual-income-container')
      .toggleClass('hidden', isYearlyIncomeAccurate);

    // Since the user is explicitly setting their yearly income, we should make sure to reset the incomeUnknown
    // flag that might be set if they used the "i don't know" income calculator.
    this.person.set('incomeUnknown', false);
  },

  onEditDeduction: function(deduction, i) {
    if (deduction.get('type') === Deduction.TYPE.OTHER) {
      this.$('.hidden-other-type').removeClass('hidden');

      this.$('.amount-container')
        .removeClass('col-sm-6')
        .addClass('col-sm-3');
    }
    this.$('.deduction-type-dropdown').focus();
  },

  onCompleteEditingDeduction: function() {
    this.$('.deductions-table-form-container .add').first().focus();
  },

  showHideOtherType: function(e) {
    var $target = $(e.currentTarget);

    this.$('.hidden-other-type')
      .toggleClass('hidden', $target.val() !== Deduction.TYPE.OTHER);

    this.$('.amount-container')
      .toggleClass('col-sm-6', $target.val() !== Deduction.TYPE.OTHER)
      .toggleClass('col-sm-3', $target.val() === Deduction.TYPE.OTHER);
  },

  changeIncomeType: function(e) {
    var $newEl = this._rerenderIncomeRow(e);
    $newEl.find('input').first().focus();
  },

  changeIncomeFreq: function(e) {
    // focus to next row, or save if no next inputs
    var $newEl = this._rerenderIncomeRow(e);
    var nextFields = $newEl.find('.income-frequency-dropdown')
      .closest('.row').nextAll('.row').find('input');
    if (nextFields.length) {
      nextFields.first().focus();
    } else {
      $newEl.parents('.table-form').find('.save').focus();
    }
  },

  _rerenderIncomeRow: function(e) {
    var group = $(e.target).closest('.income-source-edit');
    var selectedType = group.find('.income-type-dropdown select').val();

    var selectedFrequency;
    if ($(e.target).attr('name').indexOf('frequency') !== -1) {
      // Only keep how often if that was the thing that changed
      selectedFrequency = group.find('.income-frequency-dropdown select').val();
    }

    var i = group.attr('data-i');
    var content = this.renderTemplate(
      incomeItemFieldsTemplate,
      _.extend(this.getRenderData(), {
        incomeSources: this.person.get('incomeSources'),
        personIndex: this.personIndex,
        incomeSource: this.person.get('incomeSources').at(i),
        i: i,
        IncomeSource: IncomeSource,
        options: {
          selectedType: selectedType,
          selectedFrequency: selectedFrequency,
          selectedDescription: group.find('.income-description').val(),
          selectedAmount: group.find('.income-how-much').val(),
          selectedFrequencyMultiplier: group.find('.income-frequency-multiplier').val(),
          selectedEmployerPhoneNumber: group.find('.income-employer-phone-number').val(),
          selectedEmployerStreetAddress: group.find('.income-employer-street-address').val(),
          selectedEmployerSuiteNumber: group.find('.income-employer-suite-number').val(),
          selectedEmployerCity: group.find('.income-employer-city').val(),
          selectedEmployerState: group.find('.income-employer-state-dropdown select').val(),
          selectedEmployerZipCode: group.find('.income-employer-zipcode').val(),
          selectedEin: group.find('.income-employer-ein').val()
        }
      }
    ));
    $(e.target).closest('.income-source-edit').replaceWith(content);
    var $newEl = this.$('.income-source-edit[data-i="' + i + '"]');
    this.postRenderHooks();
    return $newEl;
  },

  showIncomeEmployerExtraAddressFields: function(e) {
    this.$('.income-employer-extra-address-info').removeClass('hidden');
    this.postRenderHooks(); // Rerender polyfill for ie8
  },

  showIncomeCalculator: function(e) {
    this.$('.income-calculator').removeClass('hidden');
    this.$('.income-estimate').addClass('hidden');
    this.$('.help-calculate-income').addClass('hidden');
  },

  hideIncomeCalculator: function(e) {
    this.$('.income-calculator').addClass('hidden');
    this.$('.income-estimate').removeClass('hidden');
    this.$('.help-calculate-income').removeClass('hidden');
  },

  calculateIncome: function(e) {
    var $months = this.$('[name=incomeCalculator]');

    // Sum up the monthly income inputs
    var total = _.reduce($months, function (total, item) {
      var $input = $(item);
      $input.val($input.val().match(/\d*\.?\d+/));
      total += Number($input.val());
      return total;
    }, 0);

    this.$('.income-calculator-total-value').text(Grammar.currencyFormat(total, true));
    return total;
  },

  saveCalculatedIncome: function(e) {
    this.hideIncomeCalculator();

    var calculatedTotal = this.calculateIncome();
    this.$('.expected-annual-income').val(calculatedTotal);

    var $isYearlyIncomeAccurate = this.$('[name="isYearlyIncomeAccurate"]:checked');
    if ($isYearlyIncomeAccurate.length > 0 &&
        $isYearlyIncomeAccurate.val() === 'false') {
      this.person.set('expectedAnnualIncome', calculatedTotal);
      this.person.set('incomeUnknown', true);
    }
  }

});

return IncomeView;

});
