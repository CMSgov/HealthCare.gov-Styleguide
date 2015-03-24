/**
 * A view to gather initial info for remote identity proofing.
 */
define([
  'bootstrap-button',
  'bootstrap-dropdown',
  'common/constants',
  'models/ridp-model',
  'views/card-view',
  'views/ridp-questions-view',
  'views/ridp-redirect-view',
  'util/analytics',
  'util/strings',
  'text!templates/ridp.html'
], function(
  BootstrapButtonUnused,
  BootstrapDropdownUnused,
  Constants,
  RidpModel,
  CardView,
  RidpQuestionsView,
  RidpRedirectView,
  Analytics,
  Strings,
  ridpQuestionsTemplate
) {

var RidpView = CardView.extend({
  templateText: ridpQuestionsTemplate,
  className: CardView.prototype.className + ' ridp',
  cardName: 'ridp',

  events: _.extend({}, CardView.prototype.events, {
    'click .btn-submit': '_onSubmitClick'
  }),

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);
    Analytics.track('MPL RIDP Identity Load');
    this.listenTo(this.model, 'change:ridpQuestions', this._questionsChanged);
    _.bindAll(this, 'onError');
  },

  /** @override */
  render: function() {
    CardView.prototype.render.call(this);
    _.defer(_.bind(this.loadFromModel, this));
    return this;
  },

  renderQuestions: function() {
    this.questionsView = this.renderSubView(RidpQuestionsView, {
      onError: this.onError,
      onRedirect: this.options.onRedirect
    });
    var firstLabel = this.questionsView.$el.find('.radio-label').first();
    _.defer(function() { firstLabel.focus(); });
  },

  // Used when fetching questions and also by RidpQuestionsView when
  // submitting answers
  onError: function(message) {
    this.$('.btn.get-questions')
        .text(this.getContent().resubmit)
        .prop('disabled', false);

    message = message || this.getContent().ridpError;

    this.$('#error').removeClass('hidden');
    this.$('#error .error-message').html(message);

    $('html, body').animate({
      scrollTop: this.$('#error').offset().top
    }, 400);

    if (this.questionsView) {
      this.questionsView.remove();
      this.questionsView = null;
      this.model.set({'ridpQuestions': null, 'ridpAnswers': null});
    }
  },

  _onSubmitClick: function(e) {
    e.preventDefault();

    if (!this.saveToModel()) {
      this._scrollTo($('.has-error').first());
      this.$('.has-error input').first().focus();
      Analytics.track('MPL RIDP Identity Invalid', {
        message: this.$('.has-error :first .error-message').text(),
        invalidFields: this.$('.has-error input').map(
          function() { return $(this).attr('name'); })
      });
      return;
    }

    this._fetchQuestions(e);
  },

  _fetchQuestions: function(e) {
    var $submit = this.$('.btn-submit');
    var content = this.getContent();

    // hide the error alert if we're at the fetching questions stage
    this.$('#error').addClass('hidden');

    // This will cause a sync to the server and fetch the questions...
    $submit
      .text(content.fetchingQuestions)
      .prop('disabled', true);

    Analytics.track('MPL RIDP Identity Submit');
    var self = this;
    var errorText = self.getContent().genericFfmRidpErrorMessage;
    $.ajax({
      type: 'post',
      url: Constants.APP_ROOT + 'data/ridp/fetch-questions',
      data: this.model.toJSON(),
      dataType: 'json',
      success: function(response) {
        if (response.redirect) {
          // RIDP redirect, if we exceeded the number of failed responses.
          if (self.options.onRedirect) {
            self.options.onRedirect(response.redirect);
          }
          return;
        } else if (response.success) {
          // successful RIDP
          self.model.set(self.model.parse(response.ridpModel));
          self.$(e.currentTarget).text(content.questionsFetched);
          Analytics.track('MPL RIDP Identity Success');
        } else {
          // Unsuccessful RIDP but with known error.  Likely an expected RIDP
          // failure.
          Analytics.track('MPL RIDP Identity Fail');
          if (response.errorType && self.getContent().ridpErrorCodes &&
              self.getContent().ridpErrorCodes[response.errorType]) {
            errorText = self.getContent().ridpErrorCodes[response.errorType];
          }
          self.onError(errorText);
          if (response.preventResubmit) {
            self._preventResubmit();
          }
        }
      },
      error: function(xhr, status) {
        var response = {};
        try {
          response = $.parseJSON(xhr.responseText);
        } catch(err) {}

        Analytics.track('MPL RIDP Identity Error', {
          message: response.message || status
        });

        if (response.errorType === 'LOGGED_OUT' && response.errorData) {
          errorText = self.getContent().loggedOutError;
          errorText = Strings.format(errorText, response.errorData.url);
        }

        // Unsuccessful RIDP with an unknown error.  IMAS or FFM might be down,
        // or it could be an error that we don't track.
        self.onError(errorText);
      }
    });
  },

  _questionsChanged: function(e) {
    if (this.model.get('ridpQuestions') !== null){
      this.renderQuestions();
      this.$(this.el).find(':input:not(:disabled)').prop('disabled',true);
      this.$('.btn-submit').text('Done');
    } else {
      this.$(this.el).find(':input:disabled').prop('disabled',false);
    }
  }

});

return RidpView;

});
