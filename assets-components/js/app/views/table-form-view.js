define([
  'views/card-view',
  'text!templates/table-form.html'
], function (
  CardView,
  tableFormTemplate
) {

/**
 * A view to show a table of items let the user add/remove
 * items individually. User of this class needs to customize
 * how the table renders the headers and rows.
 */
var TableFormView = CardView.extend({
  templateText: tableFormTemplate, // Passed in from options
  className: 'table-form',
  cardName: 'table-form',

  events: _.extend({}, CardView.prototype.events, {
    'click .edit': 'editItem',
    'click .save': 'saveItem',
    'click .cancel': 'cancelEditingItem',
    'click .remove': 'removeItem',
    'click .add': 'addNewItem'
  }),

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);

    this.options = _.defaults(options, {
      collection: null,
      addItemText: 'Add Item',
      tendonPrefix: 'tendon:',
      onAddItem: null,
      onEditItem: null,
      onSaveItem: null,
      onRemoveItem: null,
      onCancelEditingItem: null
    });

    this.collection = options.collection;

    this.itemModel = this.collection.model;

    this.collection.each(function(item, i) {
      this.bindValidationEvents(item, this.options.tendonPrefix + '[' + i + '].');
    }, this);

    // A map from the index of the deduction to whether it's editable
    // (and therefore should display as a form rather than text)
    this.editable = _.object(_.range(this.collection.length));

    // A map from the index of the deduction to whether it's a new
    // deduction that has not yet been saved. If it is new and the
    // use clicks cancel, then we should remove the deduction.
    this.isNew = _.object(_.range(this.collection.length));
  },

  getRenderData: function() {
    return _.extend(
        CardView.prototype.getRenderData.call(this), {
          collection: this.options.collection,
          editable: this.editable,
          addItemText: this.options.addItemText,
          renderHeaders: this.options.renderHeaders,
          renderItem: this.options.renderItem,
          renderItemFields: this.options.renderItemFields
        });
  },

  postRenderHooks: function() {
    CardView.prototype.postRenderHooks.apply(this, arguments);

    this.loadFromModel();
  },

  editItem: function(e) {
    var i = parseInt($(e.currentTarget).data('index'), 10);
    this.editable[i] = true;
    this.render();

    if (this.options.onEditItem) {
      this.options.onEditItem(this.collection.at(i), i);
    }
  },

  saveItem: function(e) {
    if (!this.saveToModel()) {
      this._scrollTo($('.has-error').first());
      $('.has-error input').first().focus();
      return;
    }

    // Now that we have saved the fields to the model,
    // mark all models as not new anymore.
    this.isNew = _.object(_.range(this.collection.length));

    var i = parseInt($(e.currentTarget).data('index'), 10);
    this.editable[i] = false;
    this.render();

    if (this.options.onSaveItem) {
      this.options.onSaveItem(this.collection.at(i), i);
    }
  },

  cancelEditingItem: function(e) {
    var i = parseInt($(e.currentTarget).data('index'), 10);
    this.editable[i] = false;
    if (this.isNew[i]) {
      this.collection.remove(this.collection.at(i));
    }
    this.render();

    if (this.options.onCancelEditingItem) {
      this.options.onCancelEditingItem(this.collection.at(i), i);
    }
  },

  addNewItem: function() {
    var i = this.collection.length;
    var item = new this.itemModel();
    this.collection.add(item);
    this.editable[i] = true;
    this.isNew[i] = true;
    this.bindValidationEvents(item, this.options.tendonPrefix + '[' + i + '].');
    this.render();

    var firstEditable = this.$('input, select').first();
    _.defer(function() { firstEditable.focus(); });

    if (this.options.onAddItem) {
      this.options.onAddItem(item, i);
    }
  },

  removeItem: function(e) {
    var i = parseInt($(e.currentTarget).data('index'), 10);
    var item = this.collection.at(i);

    delete this.editable[i];
    delete this.isNew[i];

    this.collection.remove(item);
    this.render();

    if (this.options.onRemoveItem) {
      this.options.onRemoveItem(item, i);
    }
  },

  clearItems: function() {
    this.collection.reset();
    this.render();
  }
});

return TableFormView;

});
