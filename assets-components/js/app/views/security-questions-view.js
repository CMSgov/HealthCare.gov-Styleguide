define([
  'views/card-view',
  'util/browser-utils',
  'text!templates/lite-security-questions.html'
], function(
  CardView,
  BrowserUtils,
  securityQuestionsTemplate
) {

/**
 * A view that allows the user to pick three security questions and answers.
 * These are saved for the user for password recovery purposes.
 */
var SecurityQuestionsView = CardView.extend({
  templateText: securityQuestionsTemplate,
  cardName: 'lite-security-questions',

  // Since this is a subview of the LiteAccountView, we don't need the normal
  // card class names.
  className: '',

  events: {
    'change .security-question': '_onQuestionChanged',
    'change .answer-input': '_onAnswerChanged'
  },

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);

    /**
     * A mapping of question index (0-2), and which question they've picked
     * (i.e. the value of the select dropdown pointing to which question
     * in the list of possible questions).
     */
    this.selectedQuestions = {};

    this.listenTo(this.model, 'invalid', this._onModelFieldError);
    this.listenTo(this.model, 'valid', this._onModelFieldValid);

    this.securityQuestions = this.getContent().eidmQuestions;
  },

  getRenderData: function() {
    var result = CardView.prototype.getRenderData.call(this);
    result.questions = this.securityQuestions;
    return result;
  },

  /** @override */
  postRenderHooks: function() {
    CardView.prototype.postRenderHooks.call(this);

    /**
     * Check if we are using a mobile device, because then we want to
     * append an empty optgroup element to the security question selects.
     * The empty optgroup allows the security questions to flow to multiple
     * lines on iOS and Android, without us having to use non-native selects.
     * (We are checking to only add on mobile because it adds an empty line
     * on web, which looks broken.)
     *
     * Info from: http://stackoverflow.com/questions/19398154/how-to-fix-truncated-text-on-select-element-on-ios7
     *
     */
    if (BrowserUtils.needHackyOptgroupSelect(window.navigator.userAgent)) {
      this.$('.security-question').append('<optgroup></optgroup>');
    }

    if (BrowserUtils.needHackySelectStyling(window.navigator.userAgent)) {
      this.$('select').addClass('hacky-windows-select');
    }
  },

  _onModelFieldError: function(e, errors) {
    // All the individual field errors should be tracked by tendon or other
    // bindings. We only care about special casing things that don't belong
    // to a specific field, which in this case is aggregate errors on
    // security answers.
    var error = errors['securityAnswers'];
    if (!error) {
      return;
    }

    // Kind of hacky - we assume it's always the "you need different answers"
    // error, so iterate and find which ones are colliding.
    var $answers = this.$('.answer-input');
    var values = _.map($answers, function(el) {return $(el).val();});
    var $lastColliding = null;

    // Since we only have 3 answers, and we know 2 of them collide, the last
    // item to be in the colliding set is either the $answers[2] or
    // $answers[1] - it can't be $answers[0].
    if (values[2] === values[1] || values[2] === values[0]) {
      $lastColliding = $($answers[2]);
    } else {
      $lastColliding = $($answers[1]);
    }
    this.renderInvalidMarker($lastColliding, error);
  },

  _onModelFieldValid: function(e, attrs) {
    // See _onModelFieldError to see why we special case this.
    if (_.contains(attrs, 'securityAnswers')) {
      return;
    }
    this.clearInvalidMarker('.answer-input');
  },

  /**
   * Update a "select question" dropdown after another one's value was updated.
   */
  _updateOptions: function($select, valueToRemove, valueToAdd) {
    var index = $select.data('index');
    var $toInsert = null;

    if (valueToAdd !== undefined) {
      $toInsert = $('<option />')
          .attr('value', valueToAdd)
          .text(this.securityQuestions[valueToAdd]);
    }

    _.each(_.rest($select.children('option')), function(option, i) {
      var $option = $(option);

      if ($option.val() === valueToRemove) {
        $option.remove();
      // Iterate until we find the spot in which the valueToAdd question should
      // naturally occur (the question values are in ascending order)
      } else if ($toInsert && $option.val() > valueToAdd) {
        $toInsert.insertBefore($option);
        $toInsert = null;
      }
    });
  },

  _onQuestionChanged: function(e) {
    var $target = $(e.currentTarget);
    var value = $target.val();
    var index = $target.data('index');

    var oldValue = this.selectedQuestions[index];
    this.selectedQuestions[index] = value;
    $target.toggleClass('unselected', value === '__unselected__');

    _.each(this.$('.security-question'), function(select) {
      var $select = $(select);
      if ($select.is($target)) {
        return;
      }

      // Since we should only allow each question to be selected once, we want
      // to make sure to remove it from all the other selects when something
      // gets picked.
      this._updateOptions($select, value, oldValue);
    }, this);

    // When the question changes, we want to make sure to validate the question
    // but allow an empty answer for now (since the natural progression is
    // for the user to first pick the question, at which point the answer is
    // blank).
    var $answer = this.$('[name="securityAnswers[' + index + ']"]');
    var requireAnswer = false;
    this._checkQuestionAnswerValid($target, $answer, requireAnswer);
  },

  _onAnswerChanged: function(e) {
    var $target = $(e.currentTarget);
    var index = $target.data('index');

    var $question = this.$('[name="securityQuestions[' + index + ']"]');

    // If the answer value just changed, then we expect that it's non-empty.
    // Make sure we validate that and show an error otherwise.
    var requireAnswer = true;
    this._checkQuestionAnswerValid($question, $target, requireAnswer);
  },

  /**
   * Validate a question/answer pair.
   *
   * @param {jQuery} $question The select dropdown for the question.
   * @param {jQuery} $answer The input for the corresponding answer.
   * @param {boolean=} opt_requireAnswer Optionally specify whether or not
   *     the answer is strictly necessary (i.e. whether or not we allow an
   *     empty answer box). This is useful because sometimes an empty answer
   *     just means the user hasn't gotten around to filling it out, so it
   *     would be jarring to show an error message on that answer then.
   */
  _checkQuestionAnswerValid: function(
      $question, $answer, opt_requireAnswer) {
    if (!$question.val() || $question.val() === '__unselected__') {
      this.renderInvalidMarker(
          $question, this.getContent().pickSecurityQuestion);
      return false;
    }

    if (!$answer.val() && !opt_requireAnswer) {
      this.clearInvalidMarker($answer, false);
      return true;
    }

    var error = this.model.validateSecurityAnswer($answer.val());
    if (error) {
      this.renderInvalidMarker($answer, error);
      return false;
    } else {
      this.clearInvalidMarker($answer);
      return true;
    }
  },

  /**
   * Extract the security question selections and save to the account model.
   *
   * This is overriden since we don't use normal "tendon syntax" to bind form
   * values to the model automatically, since both the tendon and validation
   * framework doesn't play well with repeated elements/fields.
   *
   * @override
   */
  saveToModel: function() {
    var self = this;
    var anyErrors = false;
    var questions = [];
    var answers = [];
    _.times(3, function(i) {
      var $question = self.$('[name="securityQuestions[' + i + ']"]');
      var $answer = self.$('[name="securityAnswers[' + i + ']"]');
      anyErrors =
          !self._checkQuestionAnswerValid($question, $answer, true) ||
          anyErrors;

      // Note the "value" in the <select> is the numerical index to the
      // actual list of question texts.
      questions.push(self.securityQuestions[$question.val()]);
      answers.push($.trim($answer.val()));
    });

    if (anyErrors) {
      return false;
    }

    return !!this.model.set({
      'securityQuestions': questions,
      'securityAnswers': answers
    }, {validate: ['securityQuestions', 'securityAnswers']});
  }
});

return SecurityQuestionsView;

});


