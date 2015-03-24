define([
  'common/util/ffm-util',
  'util/analytics',
  'util/app-context',
  'util/strings'
], function(
  FfmUtil,
  Analytics,
  AppContext,
  Strings
){

var AsyncSubmissionUtil = {

  /**
   * When a view polls, wait this many milliseconds before polling again.
   */
  _POLL_DELAY: 1000,

  /**
   * Repeatedly polls actionStatus to see the progress and whether or not the
   * submission has succeeded or errored out.
   */
  _pollSubmitStatus: function(
      view, totalPollDuration, analyticsDescriptor, onSuccess) {
    var self = this;
    var localizedErrors = view.getContent().submissionError || {};

    // If you've been polling for a long time, something probably went wrong
    // This is essentially the timeout for the polling.
    if (totalPollDuration > 10 * 60 * 1000) {
      view.errorSubmitting(localizedErrors.TIMEOUT);
      return;
    }

    $.ajax(view.model.url() + '/status', {
      success: function(response, status, xhr) {
        // This block currently doesn't have test coverage.  To test it, we
        // would need dependency injection for setting the location.
        if (response.location) {
          view.finishSubmitting(analyticsDescriptor, function() {
            window.location = response.location;
          }, 500);
          return;
        }
        if (response.status && response.status.submission === 'success' &&
            onSuccess && response.ffmId) {
          view.finishSubmitting(analyticsDescriptor, function() {
            view.model.set('ffmId', response.ffmId);
            onSuccess();
          }, 500);
          return;
        }

        var error = response.error;
        if (error) {
          Analytics.track(analyticsDescriptor + ' Error', {
            message: error.errorType || status
          });

          contentKey = error.errorType || status;
          var errorText = localizedErrors[contentKey] ||
                          localizedErrors.defaultError;
          var options = {};
          // TODO: refactor DELAYED_RESPONSE to use new format
          if (contentKey === 'DELAYED_RESPONSE') {
            options.preventResubmit = true;
            var locale = AppContext.getLocale();
            errorText = Strings.format(
                errorText, FfmUtil.getManageApplicationsUrl(locale));
          } else if (contentKey === 'LOGGED_OUT') {
            // preventResubmit and the url will be set via errorData.
            errorText = view.getContent().loggedOutInfoSavedError;
          }
          if (error.errorData) {
            options.preventResubmit = error.errorData.preventResubmit;
            errorText = Strings.format(errorText, error.errorData.url);
          }
          view.errorSubmitting(errorText, options);
          return;
        }

        if (response.progressDescription &&
            _.isNumber(response.progressAmountDone)) {
          view.updateProgress(
              response.progressDescription, response.progressAmountDone);
        }

        _.delay(function() {
          self._pollSubmitStatus(
              view, totalPollDuration + self._POLL_DELAY, analyticsDescriptor,
              onSuccess);
        }, self._POLL_DELAY);
      },
      error: function(xhr, status, error) {
        var errorType;
        try {
          var errorResponse = JSON.parse(xhr.responseText);
          errorType = errorResponse.errorType;
        } catch (e) { }
        // If we send back valid JSON, use that. If not, status code.
        errorType = errorType || xhr.status;
        var errorText = localizedErrors[errorType] ||
                        localizedErrors.defaultError;
        view.errorSubmitting(errorText);
      }
    });
  },

  /**
   * Starts a submission at startUrl and then polls until it's done.
   *
   * @param {CardView} view A CardView.
   * @param {string} analyticsDescriptor A description of what is happening (eg,
   *    MPL App Completion) to be used for analytics events on start, error, and
   *    success.
   * @param {string} startUrl The URL to start the submission.
   * @param {function} onSuccess if provided, this function will be called when
   *    polling discovers the submit has succeeded.
   */
  startSubmitThenPoll: function(view, analyticsDescriptor, startUrl, onSuccess) {
    var self = this;
    // Default localizedErrors to an empty object so that we will get undefined
    // rather than erroring out when we try to reference inside of it.  This is
    // to support ffm contact info submissions, which use the global default
    // error, as well as the application submit, which uses custom errors.
    var localizedErrors = view.getContent().submissionError || {};
    Analytics.track(analyticsDescriptor + ' Submit');
    view.beginSubmitting();
    $.ajax(startUrl, {
      type: 'post',
      contentType: 'application/json',
      processData: false,
      success: function(response, status, xhr) {
        Analytics.track(analyticsDescriptor + ' Started');
        self._pollSubmitStatus(
            view, 0, analyticsDescriptor, onSuccess);
      },
      error: function(xhr, status, error) {
        Analytics.track(analyticsDescriptor + ' Error', {
          message: status
        });
        var errorText = localizedErrors[xhr.status] || localizedErrors.defaultError;
        view.errorSubmitting(errorText);
      }
    });
  }
};

return AsyncSubmissionUtil;

});
