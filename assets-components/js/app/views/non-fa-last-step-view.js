/**
 * The main application form that collects household information.
 *
 * This is the last step in the non-financial workflow, since we don't need
 * to collect income data, and all sorts of other information needed for
 * subsidiy eligibility determination. For financial assistance workflows,
 * this just collects household info, but is not actually the "last step".
 */
define([
  'bootstrap-button',
  'bootstrap-dropdown',
  'common/data/states',
  'models/assister',
  'models/person',
  'models/household-contact',
  'views/card-view',
  'util/async-submit',
  'util/strings',
  'util/analytics',
  'util/geo-util',
  'text!templates/non-fa-last-step.html'
], function(
  BootstrapButtonUnused,
  BootstrapDropdownUnused,
  States,
  Assister,
  Person,
  HouseholdContact,
  CardView,
  AsyncSubmissionUtil,
  Strings,
  Analytics,
  GeoUtil,
  nonFaLastStepTemplate
) {

var NonFaLastStepView = CardView.extend({
  templateText: nonFaLastStepTemplate,
  className: CardView.prototype.className + ' non-fa-last-step',
  cardName: 'non-fa-last-step',

  events: _.extend({}, CardView.prototype.events, {
    'click .btn-submit': '_onSubmitClick',
    'click #residential-address .update-address': '_onUpdateResidentialAddressClick',
    'click #mailing-address .update-address': '_onUpdateMailingAddressClick',
    'click .ethnicity-race-toggle': '_onEthnicityAndRaceToggleClick',
    'click .coverage-state-toggle': '_onCoverageStateClick',
    'click #change-coverage-state': '_onChangeCoverageStateClick',
    'keyup [name="tendon:householdContact.zipCode"]': '_onZipChanged',
    'change [name="tendon:householdContact.zipCode"]': function(e) {
      this._onZipChanged(e);
      this._onResidentialAddressChanged(e);
    },
    'change [name="tendon:householdContact.county"]': '_onCountyChanged',
    'change [name="tendon:householdContact.streetName"]': '_onResidentialAddressChanged',
    'change [name="tendon:householdContact.apartment"]': '_onResidentialAddressChanged',
    'change [name="tendon:householdContact.city"]': '_onResidentialAddressChanged',
    'change [name="tendon:householdContact.streetNameMailing"]': '_onMailingAddressChanged',
    'change [name="tendon:householdContact.apartmentMailing"]': '_onMailingAddressChanged',
    'change [name="tendon:householdContact.cityMailing"]': '_onMailingAddressChanged',
    'change [name="tendon:householdContact.stateMailing"]': '_onMailingAddressChanged',
    'change [name="tendon:householdContact.zipCodeMailing"]': '_onMailingAddressChanged',
    'change [name="tendon:householdContact.isMailingAddress"]': '_onInputChanged',
    'change [name="tendon:people[0].applyingForInsurance"]': '_onInputChanged',
    'change [name="tendon:people[1].applyingForInsurance"]': '_onInputChanged',
    'change [name="numDependentsApplying"]': '_onNumDependentsApplyingChanged',
    'click [name="hasAssister"]': '_onHasAssisterChanged',
    'change [name="tendon:assister.type"]': '_onAssisterTypeChanged',
    'click a.phoneType': '_onPhoneTypeClick',
    'click .suffixType a': '_onSuffixTypeClick',
    'change .other-checkbox': '_onOtherCheckboxClick',
    'change .hispanic-origin-checkbox': '_onHispanicOriginCheckboxClick',
    'click .screener-confirmation .edit-btn': '_onScreenerConfirmationEditClick'
  }),

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);

    // User must have a residence address in the state where they're applying
    // for coverage. If user entered an RIDP address in a state other than the
    // coverage state, we reset their address to be in the coverage state.
    if (this.model.get('coverageState') !==
        this.model.get('householdContact').get('state')) {
      var householdContact = this.model.get('householdContact');
      householdContact.clearHomeAddress();
      householdContact.set('state', this.model.get('coverageState'));
    }

    this.csr = options.csr;

    if (typeof options.onSuccess !== 'function') {
      throw new Error('onSuccess function required in options.');
    }
    this.onSuccess = options.onSuccess;

    if (typeof options.onChangeCoverageState !== 'function') {
      throw new Error('onChangeCoverageState function required in options.');
    }
    this.onChangeCoverageState = options.onChangeCoverageState;

    this.isResidentialAddressValidated = false;
    this.isMailingAddressValidated = false;

    this.scrubbedResidentialAddress = null;
    this.scrubbedMailingAddress = null;
  },

  delegateEvents: function() {
    CardView.prototype.delegateEvents.call(this);

    this.bindValidationEvents(this.model.get('householdContact'), 'tendon:householdContact.');
    _.each(this.model.get('people'), function(person, i) {
      this.bindValidationEvents(person, 'tendon:people[' + i + '].');
    }, this);

    this.listenTo(this.model.get('householdContact'), 'change:isMailingAddress', this._onIsMailingAddressChanged, this);

    _.each(this.model.get('people').slice(1), function(person) {
      this.listenTo(person, 'change:applyingForInsurance', this._onApplyingForInsuranceChanged, this);
    }, this);
  },

  /** @override */
  getRenderData: function() {
    return _.extend(CardView.prototype.getRenderData.call(this), {
      faFlow: this.model.get('requireFinancialInfo'),
      csr: this.csr,
      Person: Person,
      Assister: Assister,
      HouseholdContact: HouseholdContact,
      coverageStateName: States.getNameFromCode(this.model.get('coverageState'))
    });
  },

  /** @override */
  postRenderHooks: function() {
    CardView.prototype.postRenderHooks.apply(this, arguments);
    Analytics.track('MPL App People Load');

    this.loadFromModel();
    this._onIsMailingAddressChanged();
    this._onHasAssisterChanged();
    this._onAssisterTypeChanged();
    _.each(
      this.model.get('people').slice(1),
      this._onApplyingForInsuranceChanged,
      this
    );

    var numDependentsApplying = this.model.getNumDependentsApplying();
    this.$('[name="numDependentsApplying"][value="' + numDependentsApplying + '"]')
      .prop('checked', true)
      .closest('.btn')
      .addClass('active');

    this._populateCountyOptions(
      this.$('[name="tendon:householdContact.county"]'),
      this.$('[name="tendon:householdContact.zipCode"]').val()
    );

    // The state is likely populated from the screener, so autoload the
    // counties immediately.
    this.$('[name="tendon:householdContact.state"]').trigger('change');
  },

  _onUpdateResidentialAddressClick: function(e) {
    this.$('[name="tendon:householdContact.streetName"]').val(this.scrubbedResidentialAddress.streetName);
    this.$('[name="tendon:householdContact.apartment"]').val(this.scrubbedResidentialAddress.apartment);
    this.$('[name="tendon:householdContact.city"]').val(this.scrubbedResidentialAddress.city);

    var zipCodeInput = this.$('[name="tendon:householdContact.zipCode"]');
    var currentZipCode = zipCodeInput.val();
    var newZipCode = this.scrubbedResidentialAddress.zipCode;

    zipCodeInput.val(newZipCode);
    // We want to make sure to fetch updated counties for a new 5-digit zip
    // But we don't want to erase the user's current county selection if it's
    // just a slightly different zip+4 being returned by address validation
    if (currentZipCode.substr(0, 5) !== newZipCode.substr(0, 5)) {
      zipCodeInput.trigger('change');
    }

    $(e.target).closest('.scrubbed-address-message').addClass('hidden');
    var $zipField = self.$('#residential-address').find('.zip-field');
    // Only remove the .has-error class if there isn't a zip-code related
    // error message or else the error message will turn gray
    if ($zipField.find('.error-message').text() === '') {
      $zipField.removeClass('has-error');
    }
  },

  _onUpdateMailingAddressClick: function(e) {
    this.$('[name="tendon:householdContact.streetNameMailing"]').val(this.scrubbedMailingAddress.streetName);
    this.$('[name="tendon:householdContact.apartmentMailing"]').val(this.scrubbedMailingAddress.apartment);
    this.$('[name="tendon:householdContact.cityMailing"]').val(this.scrubbedMailingAddress.city);
    this.$('[name="tendon:householdContact.stateMailing"]').val(this.scrubbedMailingAddress.state);
    // No county on mailing address so no need to fetch updated county options
    this.$('[name="tendon:householdContact.zipCodeMailing"]').val(this.scrubbedMailingAddress.zipCode);
    $(e.target).closest('.scrubbed-address-message').addClass('hidden');
  },

  _onEthnicityAndRaceToggleClick: function(e) {
    e.preventDefault();
    var $currentTarget = $(e.currentTarget);
    var dropdownSelector = $currentTarget.data('target');

    // ensure we have loaded the state of the ethnicity information
    $('.hispanic-origin-checkbox').trigger('change');
    $('.other-checkbox').trigger('change');

    // TODO(brandon): Change direction of caret on ethnicity-race-expanded
    this.$(dropdownSelector).toggleClass('active');
    $currentTarget.toggleClass('ethnicity-race-expanded');
  },

  _onCoverageStateClick: function(e) {
    e.preventDefault();
    var $currentTarget = $(e.currentTarget);
    var dropdownSelector = $currentTarget.data('target');

    // TODO(brandon): Change direction of caret on coverage-state-expanded
    this.$(dropdownSelector).toggleClass('active');
    $currentTarget.toggleClass('coverage-state-expanded');
  },

  _onChangeCoverageStateClick: function(e) {
    e.preventDefault();
    this.model.set('coverageState', '');
    this.onChangeCoverageState();
  },

  _onSubmitClick: function(e) {
    e.preventDefault();
    var self = this;

    // TODO come up with a better way to do page-specific validation
    this.model.set('complete', false);

    if (!this.saveToModel() || !this.model.isValid()) {
      this._scrollTo(this.$('.has-error').first());
      this.$('.has-error input').first().focus();
      console.log(JSON.stringify(this.model.validationError));
      Analytics.track('MPL App People Invalid', {
        message: JSON.stringify(this.model.validationError),
        invalidFields: this.$('.has-error input').map(
          function() { return $(this).attr('name'); })
      });
      return;
    }

    this.beginSubmitting();
    this.model.save(null, {
      success: function(app, response, xhr) {
        AsyncSubmissionUtil.startSubmitThenPoll(
            self, 'MPL App People', self.model.url() + '/ffm-contact-info',
            self.onSuccess);
      },
      error: function(app, response, options) {
        Analytics.track('MPL App People Error', {
          message: response.status || 'error saving'
        });
        self.errorSubmitting();
      }
    });
  },

  _onZipChanged: function(e) {
    var $target = $(e.target);
    this._populateCountyOptions($target.closest('fieldset').find('.form-county'), $target.val());
  },

  _onResidentialAddressChanged: function(e) {
    this.isResidentialAddressValidated = false;
    var address = {
      streetName: this.$('[name="tendon:householdContact.streetName"]').val().trim(),
      apartment: this.$('[name="tendon:householdContact.apartment"]').val().trim(),
      city: this.$('[name="tendon:householdContact.city"]').val().trim(),
      state: this.model.get('householdContact').get('state'),
      zipCode: this.$('[name="tendon:householdContact.zipCode"]').val().trim()
    };
    this._scrubAddress(address, 'residential');
  },

  _onMailingAddressChanged: function(e) {
    this.isMailingAddressValidated = false;
    var address = {
      streetName: this.$('[name="tendon:householdContact.streetNameMailing"]').val().trim(),
      apartment: this.$('[name="tendon:householdContact.apartmentMailing"]').val().trim(),
      city: this.$('[name="tendon:householdContact.cityMailing"]').val().trim(),
      state: this.$('[name="tendon:householdContact.stateMailing"]').val().trim(),
      zipCode: this.$('[name="tendon:householdContact.zipCodeMailing"]').val().trim()
    };
    this._scrubAddress(address, 'mailing');
  },

  _scrubAddress: function(address, addressType) {
    var self = this;

    if (!address.streetName ||
        !address.city ||
        !address.state ||
        !address.zipCode) {
      return;
    }

    GeoUtil.scrubAddress(address).then(function(result) {
      var $address;
      if (addressType === 'residential') {
        $address = self.$('#residential-address');
      } else {
        $address = self.$('#mailing-address');
      }

      if (!result.success || !result.scrubbedAddress) {
        $address
          .find('.invalid-address-error')
            .siblings()
              .addClass('hidden')
            .end()
            .removeClass('hidden');
        return;
      }

      if (result.statusType === 'VERIFIED' ||
          result.statusType === 'CORRECTED') {
        if (addressType === 'residential') {
          self.isResidentialAddressValidated = true;
        } else {
          self.isMailingAddressValidated = true;
        }
      }

      if (result.statusType === 'VERIFIED') {
        $address
          .find('.scrubbed-address-message')
          .addClass('hidden')
          .siblings()
          .addClass('hidden');
        return;
      }

      if (addressType === 'residential') {
        self.scrubbedResidentialAddress = result.scrubbedAddress;
      } else {
        self.scrubbedMailingAddress = result.scrubbedAddress;
      }

      $address
        .find('.scrubbed-address-message')
        .siblings()
          .addClass('hidden')
        .end()
        .removeClass('hidden')
        .find('.scrubbed-address')
        .text(self._formatAddress(result.scrubbedAddress));
    });
  },

  _formatAddress: function(address) {
    var str = address.streetName;
    if (address.apartment) {
      str += ', ' + address.apartment;
    }
    str += ', ' + address.city;
    str += ', ' + address.state;
    str += ' ' + address.zipCode;
    return str;
  },

  _onHasAssisterChanged: function(e) {
    var checked = this.$('[name="hasAssister"]').prop('checked');

    if (checked && !this.model.get('assister')) {
      this.model.set('assister', new Assister());
      // normally, binding of validation events occurs during initialization, but...
      // Assister submodel is created based on user input (checkbox), so binding manually after instantiation
      this.bindValidationEvents(this.model.get('assister'), 'tendon:assister.');
    } else if (!checked && this.model.get('assister')) {
      this.model.set('assister', null);
    }

    this.$('#assister').toggleClass('hidden', !checked);

    // triggers the placeholder library to recalculate its size and position
    if (checked) {
      $('#assister input').trigger('resize');
    }
  },

  _onAssisterTypeChanged: function(e) {
    var assisterType = this.$('[name="tendon:assister.type"]').val();
    var requireNPN = assisterType === Assister.TYPES.AGENT_OR_BROKER;

    this.$('.national-producer-number').toggleClass('hidden', !requireNPN);

    // triggers the placeholder library to recalculate its size and position
    // only required for IE8; without it NPN placeholder doesn't appear
    if (requireNPN) {
      $('.national-producer-number input').trigger('resize');
    }
  },

   // TODO(randy): Handle householdContact.countyFipsCodeMailing later
  _onCountyChanged: function(e) {
    var $county = $(e.target);
    var householdContact = this.model.get('householdContact');
    var fipsCode = $county.find(':selected').data('fipsCode');

    householdContact.set('countyFipsCode', fipsCode);
  },

  _onInputChanged: function(e) {
    var name = $(e.currentTarget).attr('name').substr('tendon:'.length);
    this.saveToModel(name);
  },

  // could be called when radio button changed, or when dropdown changed, or when
  // bootstrap dropdown changed
  _onNumDependentsApplyingChanged: function() {
    var numDependentsApplying;

    // If there are 3 or more dependents a select is used, otherwise radio
    // buttons are used
    if (this.$('select[name="numDependentsApplying"]').length > 0) {
      numDependentsApplying = parseInt(
        this.$('select[name="numDependentsApplying"]').val(), 10);
    } else {
      numDependentsApplying = parseInt(
        this.$('[name="numDependentsApplying"]:checked').val(), 10);
    }

    _.each(this.model.getDependents().slice(0, numDependentsApplying), function(person) {
      person.set('applyingForInsurance', true);
    }, this);
    _.each(this.model.getDependents().slice(numDependentsApplying), function(person) {
      person.set('applyingForInsurance', false);
    }, this);
  },

  _onIsMailingAddressChanged: function(e) {
    // isMailingAddress could be null before the user fills out the field
    if (this.model.get('householdContact').get('isMailingAddress') !== false) {
      this.$('.mailing-address-fields').addClass('hidden');
    } else {
      this.$('.mailing-address-fields').removeClass('hidden');
    }
  },

  _onApplyingForInsuranceChanged: function(person) {
    // In the non-FA flow, we only care to collect data from applicants. In the
    // FA flow, this info is always expanded, since we always need it.
    if (!this.model.get('requireFinancialInfo')) {
      // applyingForInsurance could be null before the user fills out the field
      var applyingForInsurance = person.get('applyingForInsurance') === true;
      var i = _.indexOf(this.model.get('people'), person);

      this.$('.applicant[data-person-index="' + i + '"]')
        .toggleClass('hidden', !applyingForInsurance);
    }
  },

  _onPhoneTypeClick: function(e) {
    var $target = $(e.currentTarget);
    var isCell = $target.is('#isCellPhone');

    this.$('[name="isPhoneNumberCellphone"]').prop('checked', isCell);
    $('button span.phoneType').text($target.text());

    e.preventDefault();
  },

  _onSuffixTypeClick: function(e) {
    var $target = $(e.currentTarget);
    var $fakeSelect = $target.closest('.suffixType');

    // TODO(kalvin): make tendon work with js dropdowns so you can remove selects
    var defaultOption = $fakeSelect.find('a').first().text();
    var value = ($target.text() === defaultOption) ? '' : $target.text();

    $fakeSelect.find('select').val(value);
    $fakeSelect.find('.dropdown-name').text($target.text());

    e.preventDefault();
  },

  _onOtherCheckboxClick: function(e) {
    var $target = $(e.currentTarget);
    var checked = $target.prop('checked');

    if (!checked) {
      $target
        .closest('.checkbox')
        .find('.other-text')
        .val(''); // clear text box when no longer checked
    }

    $target
      .closest('.checkbox')
      .find('.other-race-text-container')
      .toggleClass('hidden', !checked);
  },

  _clearAllEthnicitySpecifiers: function(personIndex) {
    $('[name="tendon:people['+personIndex+'].ethnicities"]').each(function(i,checkbox){
      checkbox.checked = false;
    });
    $('[name="tendon:people['+personIndex+'].otherEthnicity"]').val(''); // clear text box when no longer checked
  },

  _onHispanicOriginCheckboxClick: function(e) {
    var $target = $(e.currentTarget);
    var checked = $target.prop('checked');

    if (!checked) {
      this._clearAllEthnicitySpecifiers($target.attr('data-person-index'));
    }

    $target
      .closest('.checkbox')
      .find('.hispanic-ethnicity-specifiers')
      .toggleClass('hidden', !checked);
  },

  // TODO(brandon): This is a temporary intermediate crutch. Ideally, we should
  //     allow the user to be able to directly edit the screener info, but
  //     we'll need to re-implement or refactor much of the welcome screener
  //     logic, to handle cases like if the user changes to a state offering
  //     marketplaces or a different FPL.
  _onScreenerConfirmationEditClick: function(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    $target.hide();
    this.$('.create-new-account-msg').show();
  },

  _populateCountyOptions: function($county, zipCode) {
    var content = this.getContent();

    $county.empty();

    // Either XXXXX or XXXXXX-XXXX
    if (zipCode.length !== 5 && zipCode.length !== 10) {
      return;
    }

    // Zip+4 (9-digit) zipcodes are supported, but there aren't
    // any zip+4-to-county mappings yet in our USPS db, so zip+4s will error
    var zipCode5Digits = zipCode.substr(0, 5);

    // If there's a saved county, we should reload that selection if possible
    var existingFipsCode = this.model.get('householdContact').get('countyFipsCode');

    var self = this;
    GeoUtil.loadCountiesForZip(zipCode5Digits).then(function(data) {
      var $options = [];

      if (data.length <= 0) {
        self.$('#residential-address')
          .find('.invalid-zip-error')
            .siblings()
              .addClass('hidden')
            .end()
            .removeClass('hidden')
          .end()
          .find('.zip-field')
            .addClass('has-error')
          .end();
        return;
      }

      self.$('#residential-address')
        .find('.invalid-zip-error')
        .addClass('hidden');

      var $zipField = self.$('#residential-address').find('.zip-field');
      // Only remove the .has-error class if there isn't a zip-code related
      // error message or else the error message will turn gray
      if ($zipField.find('.error-message').text() === '') {
        $zipField.removeClass('has-error');
      }

      if (data.length > 1) {
        $options.push($('<option value="" />').text(content.county));
      }
      $options.push.apply(
        $options,
        _.map(data, function(countyInfo) {
          var $el = $('<option/>')
            .data('fipsCode', countyInfo.fips)
            .val(countyInfo.name)
            .text(countyInfo.name);
          if (countyInfo.fips === existingFipsCode) {
            $el.prop('selected', true);
          }
          return $el;
        }));

      $county.append($options);
      $county.change();
    });
  }

});

return NonFaLastStepView;

});
