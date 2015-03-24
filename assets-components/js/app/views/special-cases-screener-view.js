define([
  'views/card-view',
  'models/app-model',
  'text!templates/special-cases-screener.html',
  'util/app-context',
  'common/util/ffm-util',
  'common/data/states',
  'util/analytics',
  'util/strings',
  'util/screener',
  'views/warn-delete-and-transfer-view'
], function(
  CardView,
  AppModel,
  specialCasesScreenerTemplate,
  AppContext,
  FFMUtil,
  States,
  Analytics,
  Strings,
  ScreenerUtil,
  WarnDeleteAndTransferView
) {

/**
 * A set of screening questions to filter out special cases, like
 * Alaskan Natives or incarcerated applicants.
 *
 * This is a secondary screening process that happens after the initial
 * ad-lib based screener (LiteScreenerView) and post-account creation>
 */
var SpecialCasesScreenerView = CardView.extend({
  templateText: specialCasesScreenerTemplate,
  className: CardView.prototype.className + ' special-cases-screener blue-bg',
  cardName: 'special-cases-screener',

  events: {
    'change input': '_onInputChanged',
    'click .btn-submit': '_onSubmitClicked',
    'submit .btn-submit': '_onSubmitClicked',
    'submit form.form': '_onSubmitClicked'
  },

  // This list corresponds to the screener questions. User responses ("yes" for
  // true and "no" for false) must match these answers to proceed.
  requiredAnswers: AppModel.REQUIRED_SPECIAL_CASES_ANSWERS,

  initialize: function(options) {
    CardView.prototype.initialize.call(this, options);

    this.answers = {};

    if (this.model.get('specialCasesStatus') ===
        AppModel.SPECIAL_CASES_STATUS.PASSED) {

      var sections = ScreenerUtil.getSectionedScreenerQuestions(this.model);
      _.each(sections, function(section) {
        _.each(section.questions, function(questionName) {
          this.answers[questionName] = this.requiredAnswers[questionName];
        }, this);
      }, this);
    }

    /**
     * Callback for what should happen when the screener is passed.
     * @type {Function}
     */
    this.onSuccess = options.onSuccess;
  },

  getRenderData: function() {
    var results = CardView.prototype.getRenderData.call(this);

    return _.extend(results, {
      getScreenerQuestionText: ScreenerUtil.getScreenerQuestionText,
      getScreenerQuestionHelp: ScreenerUtil.getScreenerQuestionHelp,
      sectionedQuestions: ScreenerUtil.getSectionedScreenerQuestions(
        this.model),
      answers: this.answers
    });
  },

  postRenderHooks: function() {
    CardView.prototype.postRenderHooks.call(this);
    Analytics.track('MPL Screener Qs Load');
    _.defer(_.bind(this.updateVisibleSections, this));
  },

  _getCheckedInputs: function() {
    return this.$('.question-section')
        .filter(':visible')
        .find('input:checked');
  },

  _onInputChanged: function(e) {
    var $checked = this._getCheckedInputs();
    $('.non-fa-last-step').addClass('hidden');

    _.each($checked, function(el) {
      var questionName = $(el).prop('name');
      var answer = $(el).val() === 'true';
      this.answers[questionName] = answer;
    }, this);

    this.updateVisibleSections();
  },

  updateVisibleSections: function() {

    // If they have selected yes or no on everyone-26+ toggle,
    // update presence of under-26 questions section
    var $isEveryone26Plus = this.$('.is-everyone-26-or-older input:checked');
    if ($isEveryone26Plus.length) {
      if ($isEveryone26Plus.val() === 'false') {
        this.$('.child').addClass('visible').removeClass('hidden');
      }
      else {
        // As long as under-26/.child is the last section, we know there's no reason
        // to continue if they've told us no one is under 26.
        this.$('.child').addClass('hidden').removeClass('visible');
        this.$('.success-container').removeClass('hidden');
        return;
      }
    }

    // Not all visible answers are answered. Make sure they can't proceed.
    var $els = this.$('form .filter-question');
    if ($els.find(':checked').length < $els.filter(':visible').length) {
      this.$('.success-container').addClass('hidden');
      return;
    }

    // If all visible answers are answered but we already
    // know they have a "failure", just stop them so we can send them to FFM.
    if (!this._doCurrentAnswersPass()) {
      this.$('.success-container').removeClass('hidden');
      return;
    }

    // If we get here, then they're passing so far. Check if there are
    // more sections to show.
    var resultsKnown = true;
    var $next = this.$('form .question-section').filter(':hidden').first();
    if (!$next.length) {
      // No hidden sections left, and everything's answered. We're good!
      this.$('.success-container').removeClass('hidden');
      return;
    }

    // There's a hidden section yet to be shown. Show it.
    $next.removeClass('hidden');
    _.defer(function() {
      $next.addClass('visible');
    });
    this.$('.success-container').addClass('hidden');

    // Recurse in case the section we just made visible is already complete
    _.defer(_.bind(this.updateVisibleSections, this));
  },

  _onSubmitClicked: function(e) {
    e.preventDefault();

    Analytics.track('MPL Screener Qs Submit');

    // for keyboard 'return' keypresses, which can submit even if this field is
    // invisible
    if (this.$('.success-container').hasClass('hidden')) { return; }

    if (this._doCurrentAnswersPass()) {
      this.model.set(
          'specialCasesStatus', AppModel.SPECIAL_CASES_STATUS.PASSED);
      $('.non-fa-last-step').removeClass('hidden');

      Analytics.track('MPL Screener Qs Sent to App 2.0');

      // We passed! Continue the MPL flow.
      this.onSuccess();
    } else if (this.model.get('ffmId')) {
      /* The user should only hit this case if they progress beyond the contact
       * information page (which creates an app in FFM), then come back to change
       * their screener questions to a state that cannot be handled by App2.0.
       */
      var warnDeleteAndTransferView = new WarnDeleteAndTransferView({
        appModel: this.model
      });
      $('#warn-delete-and-transfer-modal').html(warnDeleteAndTransferView.render().el);
      $('.warn-delete').modal('show');
    } else {
      // MPL doesn't handle people who fall into this situation yet, redirect to
      // FFM. User is already logged in at this point and their coverage state
      // is set in FFM, so we can take them directly to the start application screen
      Analytics.track('MPL Screener Qs Sent to FFM');

      // Delay going to FFM to give the mixpanel event enough time to launch.
      var locale = AppContext.getLocale();
      var state = this.model.get('coverageState');
      var year = this.model.get('coverageYear');
      _.delay(function() {
        window.location.href = FFMUtil.getApplicationUrl(locale, state, year);
      });
    }
  },

  _doCurrentAnswersPass: function() {
    // Make sure user yes/no answers match those in requiredAnswers
    var $checked = this._getCheckedInputs();

    return _.all($checked, function(el) {
      var answerName = $(el).prop('name');
      var userAnswer = $(el).val() === 'true';

      if (answerName in this.requiredAnswers) {
        return userAnswer === this.requiredAnswers[answerName];
      } else {
        // If answer name isn't in requiredAnswers, assume it's not required
        // and either yes or no are acceptable
        return true;
      }

    }, this);
  }
});

return SpecialCasesScreenerView;

});

