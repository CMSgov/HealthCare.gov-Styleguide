/**
 * A view to render the questions for RIDP.
 */
define([
  'common/constants',
  'views/card-view',
  'util/analytics',
  'util/strings',
  'text!templates/ridp-questions.html'
], function(
  Constants,
  CardView,
  Analytics,
  Strings,
  ridpQuestionsTemplate
) {

var RidpQuestionsView = CardView.extend({
  templateText: ridpQuestionsTemplate,
  className: CardView.prototype.className + ' ridp-questions blue-bg',
  cardName: 'ridp-questions',

  events: {
    'click .btn-submit': '_onSubmitClick'
  },

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
    Analytics.track('MPL RIDP Questions Load');
  },

  _onSubmitClick: function(e) {
    e.preventDefault();

    var answers = _.map(this.$('.question'), function(el, i) {
      var value = $(el).find('input:checked').val();
      if (value) {
        // Answer indices are expected to be 1-indexed.
        return Number(value) + 1;
      }
      return null;
    });

    // If any are null, that means the user hasn't answered it.
    if (!_.all(answers)) {
      var firstWarning = Number.MAX_VALUE;
      _.each(this.$('.question'), function(el, i) {
        var value = $(el).find('input:checked').val();
        $(el).toggleClass('has-error', !value);
        if (!value){
          firstWarning = Math.min(firstWarning, i);
        }
      });
      // Find the first blank to scroll to.
      // If question 0, then show them the title also
      var scrollElement = this.$('.question').get(firstWarning);
      scrollElement = firstWarning === 0 ? this.$el : $(scrollElement);
      $('html, body').animate({scrollTop: scrollElement.offset().top}, 400);
      Analytics.track('MPL RIDP Questions Invalid', {
        message: 'unanswered questions'
      });
      return;
    }

    $(e.currentTarget).text(this.getContent().submitting).prop('disabled', true);

    this.model.set({'ridpAnswers': answers});

    Analytics.track('MPL RIDP Questions Submit');

    var self = this;
    var errorText = self.getContent().genericFfmRidpErrorMessage;
    $.ajax({
      url: Constants.APP_ROOT + 'data/ridp/submit',
      type: 'post',
      data: this.model.toJSON(),
      dataType: 'json',
      success: function(response, status, xhr) {
        if (response.redirect) {
          // RIDP redirect, if we exceeded the number of failed responses.
          if (self.options.onRedirect) {
            self.options.onRedirect(response.redirect);
          }
          return;
        } else if (response.success) {
          // Successful RIDP
          Analytics.track('MPL RIDP Questions Pass');
          if (self.options.onSuccess) { self.options.onSuccess(); }
        } else {
          // Failed RIDP
          Analytics.track('MPL RIDP Questions Fail');
          if (self.options.onError) {
            if (response.errorType && self.getContent().ridpErrorCodes &&
                self.getContent().ridpErrorCodes[response.errorType]) {
              errorText = self.getContent().ridpErrorCodes[response.errorType];
            }
            self.options.onError(errorText);
            if (response.preventResubmit) {
              // TODO(samking): This should use self._preventResubmit(), but
              // self.$ doesn't have access to the ridp-view's btn-submit, so it
              // can't properly disable it. If we refactor the
              // ridp-questions-view to use more code in common with ridp-view,
              // it should be easy to make this change.
              $('.btn-submit').prop('disabled', true);
            }
          }
        }
      },
      error: function(xhr, status) {
        var response = {};
        try {
          response = $.parseJSON(xhr.responseText);
        } catch(err) {}

        Analytics.track('MPL RIDP Questions Error', {
          message: response.message || status
        });

        if (response.errorType === 'LOGGED_OUT' && response.errorData) {
          errorText = self.getContent().loggedOutError;
          errorText = Strings.format(errorText, response.errorData.url);
        }

        if (self.options.onError) {
          self.options.onError(errorText);
        }
      }
    });
  }
});

return RidpQuestionsView;

});


