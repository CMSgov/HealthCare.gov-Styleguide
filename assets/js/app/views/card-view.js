define([
  'backbone-validation',
  'jquery-maskedinput',
  'jquery-placeholder',
  'bootstrap-tooltip',
  'bootstrap-popover',
  // customizing the Bootstrap popover for help text
  'bootstrap-popover-override',
  'common/constants',
  'util/analytics',
  'util/app-context',
  'util/grammar',
  'util/strings',
  'util/partials',
  'text!templates/card-container.html'
], function(
  BackboneValidation,
  jQueryMaskUnused,
  jQueryPlaceholderUnused,
  BootstrapTooltipUnused,
  BootstrapPopoverUnused,
  BootstrapPopoverOverrideUnused,
  Constants,
  Analytics,
  AppContext,
  Grammar,
  Strings,
  Partials,
  cardContainerTemplate
) {

var supportsNativePlaceholder = _.memoize(function() {
  var input = $('<input>')[0];
  return input.placeholder !== undefined;
});


/**
 * Base class for a 'card' in our application flow.
 *
 * The name "card" is historical (the UI used to look like a series of
 * cards), but there's still a separation of the app into views that each
 * contain a logical set of questions and determines whether or not the set of
 * data it contains is valid using the model.
 *
 * The default implementation of saveToModel uses a special "tendon:" syntax
 * to automatically bind a form field to a particular field of the model,
 * specified as a period-delimited sequence of property names.
 *
 * For example, let's say your HTML template specifies this:
 *
 *   <input name='tendon:incomeSources[4].type' .../>
 *
 * Then, whenever the saveToModel() is called -- typically, when the user clicks
 * the 'Save and Continue' button -- CardView will take the contents of this
 * form element, save it to the model by running the equivalent of:
 *
 *   this.model.get('incomeSources').at(4).set('type', value)
 *
 * and, if there are validation errors, will show them to the user around the
 * appropriate field.
 */
var CardView = Backbone.View.extend({
  /**
   * The raw, uncompiled text of the template to be used in render().
   */
  templateText: null,

  /**
   * Used to get localization strings
   */
  cardName: '',

  /**
   * Used to update the progress bar.
   */
  submissionProgressAmountDone: 0.0,

  /**
   * classNames in addition to .lite-card and .[cardName]
   */
  className: 'lite-card',

  events: {
    'click a': 'onLinkClick',
    'click .dropdown-menu a': 'onDropdownMenuItemClick'
  },

  partials: Partials,

  initialize: function(options) {
    this.options = options || {};
    this.cardName = this.options.cardName || this.cardName;
    this.router = this.options.router;
    if (this.model) {
      this.bindValidationEvents(this.model);
    }
    this.subViews = [];
  },

  /**
   * Binds validation events from the model to controls created by the view.
   * This ensures that when a field in the model fails to validate, error
   * messages appear near that control within the control-group and controls
   * divs.
   *
   * For collections, there will be multiple copies of each control, so
   * subclasses should call bindValidationEvents with a unique prefix that
   * matches the name of the field specified in the template, e.g.,
   * bindValidationEvents(incomeSource, 'tendon:incomeSources[2].');
   *
   * TODO(brandon): this API is expressive but still messy. Find a better way.
   */
  bindValidationEvents: function(model, prefix) {
    if (!prefix) {
      prefix = 'tendon:';
    }
    this.listenTo(model, 'invalid', function(e, errors) {
      this.renderInvalidMarkers(prefix, errors);
    }, this);
    this.listenTo(model, 'valid', function(e, attributes) {
      this.clearInvalidMarkers(prefix, attributes);
    }, this);

    // Bind validation events on submodels and arrays of submodels
    _.each(model.attributes, function(value, key) {
      if (value && _.isFunction(value.initialize)) {
        this.bindValidationEvents(value, prefix + key + '.');
      }

      if (value && _.isArray(value)) {
        _.each(value, function(item, i) {
          if (item && _.isFunction(item.initialize)) {
            this.bindValidationEvents(item, prefix + key + '[' + i + '].');
          }
        }, this);
      }

      // TODO(lorenyu): support Models containing Collections
    }, this);
  },

  /**
   * Scrolls to a particular element
   */
  _scrollTo: function($el) {
    if ($el && $el.length > 0) {
      $('html, body').animate({scrollTop: $el.offset().top}, 400);
    }
  },

  /**
   * Given a checkbox and its $el.val() result, return the "normalized value".
   */
  _normalizeCheckboxVal: function(value) {
    // For a standard <input type="checkbox"> with no explicitly set value,
    // the .val() method will return "on" if it's checked. These typically
    // represent single toggles, like "I accept" checkbox, or "send me email"
    // checkboxes, so coerce 'on' to true as well.
    if (value === 'true' || value === 'on') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return value;
  },

  /**
   * Extract and group form values that can get mapped to Model values.
   *
   * This abstracts away some of the oddities in form elements that we support,
   * including some of the bootstrap widgets that don't use vanilla HTML form.
   * elements.
   * @return {Object} The inputs as jQuery element lists grouped as:
   *     $regular - normal text and select inputs
   *     $radio - radio buttons
   *     $checkbox - checkboxes
   */
  _gatherFormInputs: function(visibleOnly) {
    var result = {
      '$regular': [],
      '$radio': [],
      '$checkbox': [],
      '$bootstrapDropdown': []
    };

    var $inputs;
    if (visibleOnly) {
      $inputs = this.$('input:visible,select:visible,select.lite-dropdown');
    } else {
      $inputs = this.$('input,select,select.lite-dropdown');
    }

    var byType = _.each($inputs, function(el) {
      if (el.type === 'checkbox') {
        result.$checkbox.push(el);
      } else if (el.type === 'radio') {
        result.$radio.push(el);
      } else {
        result.$regular.push(el);
      }
    });

    // Convert to a jQuery set.
    _.each(result, function(group, type) {result[type] = $(group);});

    // Extend the checkboxes with bootstrap style checkboxes. These are
    // slightly different since the checkbox itself isn't visible in the DOM.
    var $bootstrapCheckboxes;
    if (visibleOnly) {
      $bootstrapCheckboxes = this.$('.btn:visible')
        .children('input[type=checkbox]');
    } else {
      $bootstrapCheckboxes = this.$('.btn')
        .children('input[type=checkbox]');
    }

    result.$checkbox = result.$checkbox.add($bootstrapCheckboxes);

    // Same thing with radio buttons - do some extra work for bootstrap.
    var $bootstrapRadios;
    if (visibleOnly) {
      $bootstrapRadios = this.$('.btn:visible')
        .children('input[type=radio]');
    } else {
      $bootstrapRadios = this.$('.btn')
        .children('input[type=radio]');
    }

    result.$radio = result.$radio.add($bootstrapRadios);

    if (visibleOnly) {
      result.$bootstrapDropdown = result.$bootstrapDropdown.add(
        this.$('[data-toggle="dropdown"]:visible')
      );
    } else {
      result.$bootstrapDropdown = result.$bootstrapDropdown.add(
        this.$('[data-toggle="dropdown"]')
      );
    }

    return result;
  },

  /**
   * Extract the data from the Form contents contained in this card.
   *
   * This is a protected method that subclasses can override to specialize the
   * way the data is extracted and transformed from the form.
   * @return {Object} A raw object of the serialized form fields.
   */
  getFormData: function() {
    var self = this;
    var inputs = this._gatherFormInputs(true);

    var result = {};
    inputs.$regular.each(function(i, el) {
      var name = $(this).attr('name');
      var value = !_.isNull($(this).val()) ? $(this).val().trim() : null;
      var type = $(this).data('type');

      // remove commas from numbers
      if (value === '') { // set empty fields to null instead of casting them to a zero
        value = null;
      } else if (type === 'number') { // html data-type="number"
        value = Number(value.replace(/,/g, ''));
      }

      if (name in result) {
        // A repeated field was detected. Convert to an array and push.
        if (!_.isArray(result[name])) {
          result[name] = [result[name]];
        }
        result[name].push(value);
      } else {
        result[name] = value;
      }
    });

    var checkboxGroups = _.groupBy(inputs.$checkbox, 'name');

    _.each(checkboxGroups, function(els, name) {
      // There are two kinds of checkbox groups: "groups" with a single item
      // in which case it acts like a toggle (e.g. an "I agree" checkbox) or
      // a group with multiple items, in which case the value becomes an
      // array selected items (e.g. "check all that apply").
      var singleItem = els.length === 1;
      var selected = _.filter(
          els, function(el) {return $(el).is(':checked');});

      if (singleItem) {
        if (selected.length === 1) {
          result[name] = self._normalizeCheckboxVal($(selected[0]).val());
        } else {
          // If a single item is unchecked, we set it to false, since in
          // the common case it's some kind of 'acceptance' type checkbox.
          result[name] = false;
        }
      } else {
        result[name] = [];
        _.each(selected, function(el) {
          result[name].push(self._normalizeCheckboxVal($(el).val()));
        });
      }
    });

    var radioGroups = _.groupBy(inputs.$radio, 'name');

    _.each(radioGroups, function(els, name) {
      var selected = _.find(
          els, function(el) {return $(el).is(':checked');});

      // Normalize values for radio fields that are true/false.
      var value;
      if (!selected) {
        value = undefined;
      } else {
        value = $(selected).val();

        // Normalize values.
        if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
      }

      result[name] = value;

    });

    _.each(inputs.$bootstrapDropdown, function(el) {
      var $el = $(el);
      var name = $el.attr('name');

      if (!name) {
        return;
      }

      // find element in dropdown menu that has matching text,
      // and get the data-value
      var value = $el.siblings('.dropdown-menu').find('a').filter(function() {
        return $(this).text().trim() === $el.text().trim();
      }).first().data('value');
      result[name] = value;
    });

    return result;
  },

  getContent: function(group) {
    return _.extend(
      Strings.getGroup('common'),
      Strings.getGroup(group || this.cardName)
    );
  },

  /**
   * Convenience function to retrieve and render a template.
   *
   * Most views have a single template to power their view, along with a
   * "content" file that holds the localizable strings for that template.
   * @param {string} templateText The contents of the uncompiled template.
   * @param {Object=} options Context object passed in to the template. This
   *     is always overriden with a 'content' field that contains localized
   *     strings.
   */
  renderTemplate: function(templateText, options) {
    var content = this.getContent();
    options = _.extend({
      content: content,

      // allows templates to have optional parameters.
      // all templates will have access to an options dictionary and clients
      // of the template can override this dictionary with actual values.
      options: {},

      // convenience function for templates to render a value if it is
      // non-empty and otherwise render a default value
      defaultValue: function(value, defaultValue) {
        return !_.isUndefined(value) && !_.isNull(value) ? value : defaultValue;
      }
    }, options || {});
    return _.template(templateText, options);
  },

  getRenderData: function() {
    var partials = this.partials || {};
    var self = this;

    return {
      AppContext: AppContext,
      Grammar: Grammar,
      Strings: Strings,
      model: this.model,
      partial: function(templateName, data) {
        return self.renderTemplate(
            partials[templateName],
            _.extend(self.getRenderData(), data));
      }
    };
  },

  render: function() {
    this.$el.html(this.renderTemplate(
        this.templateText, this.getRenderData()));

    this.postRenderHooks();
    return this;
  },

  /**
   * Given a list of errors in the underlying model, render errors on the form.
   * @param {Object} errors A mapping of attribute name on the model that
   *     failed validation to an error message we can use to render.
   */
  renderInvalidMarkers: function(prefix, errors) {
    // TODO(benkomalo): bail if we're not the active card?
    _.each(errors, function(error, attr) {
      this.renderInvalidMarker(prefix + attr, error);
    }, this);
  },

  /**
   * Creates error message help block if needed (idempotent).
   * Returns target element if you need to do fancy stuff to it.
   * Displays error to immediate right if a filter-question/toggle-button,
   * and below otherwise
   */
  renderAnnotation: function($group, opt_message, opt_safe) {
    var message = opt_message || '';
    if ($group.find('.help-block').length === 0) {
      if ($group.is('.filter-question')) {
        $group.children('.toggle-buttons')
          .after('<span class=\'help-block error-message\'></span>');
      } else {
        $group.append('<p class=\'help-block error-message\'></p>');
      }
    }
    var target = $group.find('.help-block');
    target.attr('aria-live', 'polite');
    if (opt_safe) {
      target.html(message);
    } else {
      target.text(message);
    }
    return target;
  },

  _getControl: function(nameOrEl) {
    if (_.isString(nameOrEl)) {
      // Escape symbols used in CSS selectors
      nameOrEl = nameOrEl.replace(/(:|\.|\[|\])/g, '\\$1');
      return this.$('[name="' + nameOrEl + '"]');
    } else {
      return nameOrEl;
    }
  },

  renderInvalidMarker: function(nameOrEl, error, opt_safe) {
    var control = this._getControl(nameOrEl);
    var group = control.closest('.form-group');
    control.attr('aria-invalid', 'true');
    group.addClass('has-error');

    if (control.data('error-style') === 'tooltip') {
      var position = control.data('tooltip-position') || 'right';
      control.tooltip({
        placement: position,
        trigger: 'manual',
        title: error
      });
      control.tooltip('show');
    } else {
      this.renderAnnotation(group, error, opt_safe);
    }

    // Update OK or Error Glyphicons if they're present
    group.find('.icon-ok').addClass('hidden');
    group.find('.icon-error').removeClass('hidden');
  },

  /**
   * Clear error markers that have been rendered due to renderInvalidMarkers.
   *
   * @param {Object} attributes A map of attribute name to the validated value
   *     that passed validation.
   */
  clearInvalidMarkers: function(prefix, attributes) {
    _.each(attributes, function(attrValue, attrName) {
      this.clearInvalidMarker(prefix + attrName);
    }, this);
  },

  clearInvalidMarker: function(nameOrEl, opt_showCheck) {
    var control = this._getControl(nameOrEl);
    var group = control.closest('.form-group');
    control.attr('aria-invalid', 'false');
    group.removeClass('has-error');

    if (control.data('error-style') === 'tooltip') {
      // CAUTION: calling tooltip('hide') on an uninitialized tooltip
      // causes bootstraps tooltips to crash somehow...
      if (control.data('tooltip')) {
        control.tooltip('hide');
      }
    } else if (control.data('error-style') === 'inline') {
      group.find('.help-inline.error-message').remove();
    } else {
      var errorChild = group.find('.help-block.error-message');
      if (!errorChild.closest('.form-group').hasClass('has-error')) {
        errorChild.text('');
      }
    }

    // Update OK or Error Glyphicons if they're present
    // The "checkmark" will get shown by default, unless clients don't want
    // to show it for some reason.
    if (opt_showCheck === undefined || opt_showCheck) {
      group.find('.icon-ok').removeClass('hidden');
    }

    group.find('.icon-error').addClass('hidden');
  },

  /**
   * Gets a value in this card's Backbone model, given a path expression, which
   * is a period-delimited sequence of field names or field names with array
   * subscripts.
   *
   * For example, path could be:
   *   'firstName' => equivalent to this.model.get('firstName')
   *   'incomeSources[4].amount'
   *     => equivalent to this.model.get('incomeSources').at(4).get('amount')
   *
   * This function is typically used to bind form fields to model fields using
   * the 'tendon:' syntax, explained in the class comment for CardView.
   */
  getModelField: function(path) {
    return this._getOrSetModelField(this.model, path);
  },

  /**
   * Sets a model field given a path. @see getModelField.
   * @return whether validation succeeded after setting the fields.
   */
  setModelFields: function(path, valueMap) {
    return this._getOrSetModelField(this.model, path, valueMap);
  },

  /**
   * @see getModelField.
   */
  _getOrSetModelField: function(model, path, valueMap) {
    var field = model;
    var parts = path === '' ? [] : path.split('.');
    var token = null;

    // Whether we're setting the form value from the model field.
    var setting = (arguments.length === 3);

    for (var i = 0; i < parts.length; i++) {
      if (!field) {
        return;
      }

      // First, test whether the field we're dealing with is an array expression.
      var arrayRegexMatch = parts[i].match(/([A-z]+)\[(\d+)\]/);
      var partIsArray = (arrayRegexMatch !== null);
      // The "token" is the portion of the part before the array subscripts
      token = partIsArray ? arrayRegexMatch[1] : parts[i];

      var fieldIsCollection = field.get(token) &&
          _.isFunction(field.get(token).at);
      var fieldIsArray = _.isArray(field.get(token));
      var isLastPart = (i === parts.length - 1);

      // Common error cases: trying to get/set an undefined field, mismatched
      // field types, and passing an array as the last element of path.
      if (!_.has(field.attributes, token)) {
        throw new Error('Tried to fetch path ' + path +
              ' of object ' + JSON.stringify(model) +
              ', but "' + token + '" does not exist.');
      } else if (partIsArray && !(fieldIsArray || fieldIsCollection)) {
        throw new Error('Tried to fetch path ' + path +
              ' of object ' + JSON.stringify(model) +
              ', but "' + token + '" is not an array.');
      } else if (partIsArray && isLastPart && !setting) {
        throw new Error('Tried to fetch path ' + path +
              ' of object ' + JSON.stringify(model) +
              ', but the last part of the path cannot be an array reference.');
      } else if (partIsArray) {
        var index = parseInt(arrayRegexMatch[2], 10);
        if (fieldIsCollection) {
          field = field.get(token).at(index);
        } else if (fieldIsArray) {
          field = field.get(token)[index];
        }
      } else {
        // Continue traversing the submodels, stopping at the second last one
        // if we're reading from the models. (e.g. 'foo.bar.joe' means that
        // the terminal token joe is a property, and bar is the deepest Model
        // object that we want to get a reference to).
        if (setting || !isLastPart) {
          field = field.get(parts[i]);
        }
      }
    }

    if (!field) {
      throw new Error('Unable to find field ' + path);
    }

    // Actually get or set the model's value
    if (setting) {
      results = field.set(valueMap, {validate: _.keys(valueMap)});
      return results !== false;
    } else {
      return field.get(token);
    }
  },

  /**
   * Render a class as a subview
   * It intializes it with the current model, renders, and scrolls down
   * If you call remove on this, the subviews will disappear as well
   */
  renderSubView: function(SubViewClass, options) {
    var subView = new SubViewClass(_.extend({
      model: this.model,
      onSuccess: this.options.onSuccess,
      superView: this
    }, options || {}));
    // TODO (LDC): This is really more like a sibling then a subview
    // Kind of awkward but css styles (really just blue-bg) interfere
    // with doing a subview
    subView.render().$el.insertAfter(this.$el);

    // Longer than usual animation because we're skipping an entire card
    $('html, body').animate({scrollTop: subView.$el.offset().top}, 800);
    this.subViews.push(subView);
    return subView;
  },


  /**
   * Override remove to so that we also remove all subviews rendered with renderSubView
   */
  remove: function() {
    _.each(this.subViews, function(view) { view.remove(); });

    return Backbone.View.prototype.remove.call(this);
  },

  /**
   * Attempts to sync the data in the card UI to the underlying models.
   *
   * @param {string=} The property in the model to save. Uses tendon name
   *     syntax, such as 'isMailingAddress' or 'people[0].firstName'
   * @return {boolean} Whether or not the data was complete and valid.
   */
  saveToModel: function(name) {
    var self = this;
    var formData = this.getFormData();

    if (name) {
      formData = _.pick(formData, 'tendon:' + name);
    }

    // with tendon: syntax, all fields of a model are set simultaneously so
    // that the model can be validated as a whole. tendons maps each model
    // name (e.g., 'incomeSources[0]') to a map of values to set (e.g.,
    // {amount: 10, type: "JOB", frequency: "PER_HOUR"}).
    var tendons = {};

    _.each(formData, function(value, key) {
      // For tendons, automatically map the name of a field in the form to the
      // the corresponding field of the model and add it to the map of fields
      // to be saved.
      if (key.indexOf('tendon:') === 0) {
        key = key.substring('tendon:'.length, key.length);
        // prefix might be empty. that's technically valid.
        var prefix = (key.lastIndexOf('.') >= 0) ? key.substring(0, key.lastIndexOf('.')) : '';
        var fieldName = _.last(key.split('.'));
        if (!_.has(tendons, prefix)) {
          tendons[prefix] = {};
        }
        tendons[prefix][fieldName] = value;
      }
    });

    var valid = true;
    _.each(tendons, function(valueMap, key) {
      valid &= self.setModelFields(key, valueMap);
    });
    return valid;
  },

  /**
   * Prevalidate one form field, displaying error messages in the UI if it's
   * invalid or clearing them if it is valid.
   *
   * @param {string} name the name attribute of the form element to validate.
   * @return {boolean} Whether or not validation succeeded.
   */
  preValidate: function(name) {
    var formData = this.getFormData();
    var attr = name.substring('tendon:'.length, name.length);

    var attrs = {};
    attrs[attr] = formData[name];

    /* This 'if' is here because Password needs email in order to validate.
     * We also no longer pass in validation options to this.model.validate
     * which would have strip excess data (that we need).
     * Hence, everytime you validate password, we validate email as well
     * just so we can get the data.
     * */
    if (attr === 'password'){
      attrs['email'] = formData['tendon:email'];
    }
    var error = this.model.validate(attrs, {'validate':[attr]});

    if (error && error[attr]) {
      this.renderInvalidMarker(name, error[attr]);
      return false;
    } else {
      this.clearInvalidMarker(name);
      return true;
    }
  },

  /**
   * Populate the form elements in this view based on Model data.
   */
  loadFromModel: function() {
    var inputs = this._gatherFormInputs(false);

    var polyfilledPlaceholders = [];
    // First, populate the "regular" inputs that can just be set with .val().
    _.each(inputs.$regular, function(field) {
      var name = field['name'];
      // We only populate based on the 'tendon:' syntax right now.
      if (name.indexOf('tendon:') !== 0) {
        return;
      }

      var value = this.getModelField(name.slice('tendon:'.length));

      if (_.isNull(value)) {
        return;
      }

      var $field = $(field);
      // Keep track of the inputs we programmatically fill that had a
      // placeholder. The placeholder polyfill doesn't properly clear
      // the placeholder on a programmatic change to the value, so we
      // need to manually force it.
      if (!supportsNativePlaceholder() && $field.data('placeholder')) {
        polyfilledPlaceholders.push(field);
      }
      $field.val(value);
    }, this);

    // Manually force the placeholder polyfill detect changes in value.
    $(polyfilledPlaceholders).trigger('focusout');

    // Next, handle restoring the checkbox values.
    var checkboxGroups = _(inputs.$checkbox)
        .filter(function(el) {return el.name.indexOf('tendon:') === 0;})
        .groupBy('name')
        .value();

    _.each(checkboxGroups, function(els, name) {
      // Match the logic in getFormData(), where we support two kinds of
      // checkboxes (the single "toggle" kind, and the "pick all that apply"
      // kind)
      var singleItem = els.length === 1;

      var value = this.getModelField(name.slice('tendon:'.length));
      if (singleItem) {
        $(els).prop('checked', !!value);
        // handle bootstrap buttons
        $(els).closest('.btn').toggleClass('active', !!value);
      } else {
        var valueMap = {};
        _.each(value, function(val) {valueMap[val] = 1;});
        _.each(els, function(el) {
          var $el = $(el);
          var checked = !!valueMap[$el.val()];
          $el.prop('checked', checked);
          // handle bootstrap buttons
          $el.closest('.btn').toggleClass('active', checked);
        });
      }
    }, this);

    // Next, handle restoring radio boxes.
    var radioGroups = _(inputs.$radio)
        .filter(function(el) {return el.name.indexOf('tendon:') === 0;})
        .groupBy('name')
        .value();

    _.each(radioGroups, function(els, name) {
      var value = String(this.getModelField(name.slice('tendon:'.length)));
      _.each(els, function(el) {
        var $el = $(el);
        var checked = $el.val() === value;
        $el.prop('checked', checked);
        // handle bootstrap buttons
        $el.closest('.btn').toggleClass('active', checked);
      });
    }, this);

    _.each(inputs.$bootstrapDropdown, function(el) {
      var $el = $(el);
      var name = $el.attr('name');

      // We only populate based on the 'tendon:' syntax right now.
      if (!name || name.indexOf('tendon:') !== 0) {
        return;
      }

      var value = this.getModelField(name.slice('tendon:'.length));

      // find element in dropdown menu that has matching value,
      // and get the text
      var matchingMenuItem = $el.siblings('.dropdown-menu').find('a').filter(function() {
        return $(this).data('value') === value;
      }).first();

      if (matchingMenuItem.length <= 0) {
        return;
      }

      $el.find('.dropdown-name').text(matchingMenuItem.text());
    }, this);
  },

  /**
   * Perform actions that need to be done after render.
   *
   * This typically means applying polyfills, or applying other effects on
   * DOM elements
   */
  postRenderHooks: function() {
    var self = this;

    if (!supportsNativePlaceholder()) {
      var config = {
        visibleToScreenreaders: true,
        hideOnFocus: false
      };

      // The placeholder polyfill requires measuring dimensions of the
      // decorated input, which requires us to defer it until the DOM has
      // settled after the render.
      _.defer(function() {
        self.$('input[placeholder],textarea[placeholder]').placeHolder(config);
      });
    }

    this.$('input[data-mask]').each(function(i, el) {
      var $el = $(el);
      $el.mask($el.data('mask'), {placeholder: ' '});
    });

    this.postPopoverRender();
  },

  postPopoverRender: function() {
    // Custom Bootstrap popovers for help content (see popover.override.js)
    this.$('.help-popover').popover({
      trigger: 'click hover manual',
      placement: 'auto',
      delay: { show: 300, hide: 500 },
    }).keydown(function(event) {
      // Make popovers accessible by pressing spacebar (32) or enter (13)
      if (event.which === 32 || event.which === 13) {
        event.preventDefault();
        $(this).popover('show');
      }
    });

    // Hide popovers if any input is focused (this is made necessary
    // because we have a manual keydown trigger for hovers-- can't rely
    // on a .blur above because user may tab from popover anchor link to a link
    // in the popover content, which would then inconveniently hide the popover)
    this.$('input, a, select').focus(function(event) {
      self.$('.help-popover').popover('hide');
    });
  },

  onLinkClick: function(e) {
    var route = $(e.target).data('route');
    if (!route || !this.router) {
      return;
    }

    e.preventDefault();

    this.router.navigate(route, {trigger: true});
  },

  onDropdownMenuItemClick: function(e) {
    var $currentTarget = $(e.currentTarget);
    var text = $currentTarget.text();
    var value = $currentTarget.data('value');

    var $dropdownToggle = $currentTarget
      .closest('.dropdown-menu')
      .siblings('[data-toggle="dropdown"]');

    $dropdownToggle
      .find('.dropdown-name')
      .text(text);

    this.saveToModel($dropdownToggle.attr('name').slice('tendon:'.length));

    // if a user selects the dropdown menuitem using their keyboard, by default
    // the tab ordering is lost, so we manually focus back on the dropdown-toggle
    // element so that the user can continue to tab to the next element
    $dropdownToggle.focus();
  },

  /**
   * Updates the UI to reflect updated progress on an asynchronous submission.
   */
  updateProgress: function(descriptionKey, amountDone) {
    var localizedProgressBar = this.getContent('progress-bar').
        progressBarMessages;
    var description = localizedProgressBar[descriptionKey];
    if (amountDone > this.submissionProgressAmountDone) {
      this.submissionProgressAmountDone = amountDone;
    }
    this.$('.submit-progress-message').text(description);
    // Starting at 5 to show a little bit of progress when initialized
    var percent = 5 + this.submissionProgressAmountDone * 95;
    this.$('.progress-bar').width(percent + '%').attr('aria-valuenow', percent);
  },

  /**
   * Updates the UI to reflect that a submission has started.
   */
  beginSubmitting: function() {
    this._disableForm();
    this.$('.submit-button-container').addClass('hidden');
    this.$('.submitting-button-container').removeClass('hidden');
    this.$('.submit-error-message').addClass('hidden');
    this.$('.submit-progress-message').removeClass('hidden');
    // Initialize the progress bar state
    this.updateProgress('', 0);
    this.$('.progress-bar').addClass('submitting');
  },

  finishSubmitting: function(analyticsDescriptor, postSubmit, redirectDelay) {
    Analytics.track(analyticsDescriptor + ' Success');
    // Finish animating progress bar
    this.updateProgress('', 1);
    this.$('.progress-bar').removeClass('submitting');
    // Using the .visible class to fade out progress bar information
    this.$('.progress-information').removeClass('visible');
    // Using the .visible class to fade in progress bar success glyphicon
    this.$('.progress-success').addClass('visible');
    // Update the progress bar text to show the app has been submitted
    this.$('.progress-text').text(this.getContent().submittedButton);
    // Add a slight delay before redirecting to avoid being jarring
    _.delay(postSubmit, redirectDelay);
  },

  /**
   * Updates the UI to reflect that a submission has errored out.
   */
  errorSubmitting: function(text, options) {
    options = options || {};
    if (!text) {
      var localizedContent = this.getContent();
      var submissionError = localizedContent.submissionError || {};
      text = submissionError.defaultError || localizedContent.loadingError;
    }
    if (options.preventResubmit) {
      this._preventResubmit();
    } else {
      this._enableForm();
    }
    this.$('.submitting-button-container').addClass('hidden');
    this.$('.submit-progress-message').addClass('hidden');
    this.$('.submit-button-container').removeClass('hidden');
    this.$('.submit-error-message').removeClass('hidden').html(text);
    this.$('.progress-bar').removeClass('submitting');
  },

  _disableForm: function() {
    this.$('.click-cover').removeClass('hidden');
    this.$('.btn-submit').prop('disabled', true);
    this.$('.summary-information').css({opacity: 0.5});
  },

  _enableForm: function() {
    this.$('.click-cover').addClass('hidden');
    this.$('.btn-submit').prop('disabled', false);
    this.$('.summary-information').css({opacity: 1.0});
  },

  _preventResubmit: function() {
    this.$('.click-cover').addClass('hidden');
    this.$('.btn-submit').prop('disabled', true);
    this.$('.summary-information').css({opacity: 1.0});
    this.$('.submit-button-container').css({opacity: 0.5});
  }
});

return CardView;

});
