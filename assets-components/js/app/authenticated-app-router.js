/**
 * Main router for logged in pages.
 */
define([
  'common/constants',
  'common/util/ffm-util',
  'util/input-util',
  'util/app-context',
  'models/account',
  'models/app-model',
  'session-timer',
  'views/additional-questions-view',
  'views/application-summary-view',
  'views/household-income-view',
  'views/basic-info-screener-view',
  'views/non-fa-last-step-view',
  'views/non-fa-sep-view',
  'views/privacy-policy-view',
  'views/special-cases-screener-view'
], function(
  Constants,
  FFMUtil,
  InputUtil,
  AppContext,
  Account,
  AppModel,
  SessionTimer,
  AdditionalQuestionsView,
  ApplicationSummaryView,
  HouseholdIncomeView,
  BasicInfoScreenerView,
  NonFaLastStepView,
  NonFaSepView,
  PrivacyPolicyView,
  SpecialCasesScreenerView
) {

var AuthenticatedAppRouter = Backbone.Router.extend({
  initialize: function(options) {
    options = options || {};

    this.lastStep = null;
    this.data = options.data;

    this.views = [];

    this.sessionTimer = new SessionTimer(this);
    this.sessionTimer.appendSessionWarningView();

    // TODO(benkomalo): export temporarily for easy debugging. remove later.
    window.appModel = this.getAppModel();
    window.sessionTimer = this.sessionTimer;
  },

  // If you add routes here, you also need to modify _configureHandlers in
  // eznode/main.js in order to have the app serve the route.
  routes: {
    '(/)': 'liteApp',
    'additional-questions(/)': 'showAdditionalQuestions',
    'non-fa-sep(/)': 'showNonFaSep',
    'income(/)': 'showIncomePage',
    'privacy-policy(/)': 'showPrivacyPolicy',
    'summary(/)': 'showSummaryPage'
  },

  liteApp: function() {
    this.destroyViews();

    var appModel = this.getAppModel();
    var self = this;

    if (!appModel.get('id')) {
      this.navigate('privacy-policy', {trigger: true});
      return;
    }

    var lastStepView = new NonFaLastStepView({
      model: appModel,
      account: this.getUser(),
      csr: this.data.csr,
      // User can change their coverage state from `NonFaLastStepView`, in
      // which case we need to re-initialize the current page to show them the
      // coverage state selector.
      onChangeCoverageState: function() { self.liteApp(); },
      onSuccess: function() {
        if (appModel.get('requireFinancialInfo')) {
          self.navigate('income', {trigger: true});
        } else {
          self.navigate('non-fa-sep', {trigger: true});
        }
      }
    });

    var basicInfoScreenerView = new BasicInfoScreenerView({
      model: appModel,
      onSuccess: function() {
        if (!AppContext.faFlowEnabled() &&
            appModel.isMaybeEligibleForSubsidy()) {
          // The user isn't eligible for a non-FA workflow, and the FA
          // workflow is not yet enabled - take them to FFM.
          var locale = AppContext.getLocale();
          var state = this.getAppModel().get('coverageState');
          var year = this.getAppModel().get('coverageYear');
          window.location.href = FFMUtil.getApplicationUrl(
            locale, state, year);
        } else {
          // Remove the later steps if they have already been rendered previous since
          // Changes in the basic screener might change the later steps
          specialCasesScreenerView.remove();
          lastStepView.remove();
          self.views = _.without(
              self.views, specialCasesScreenerView, lastStepView);

          self._renderAndAppend(specialCasesScreenerView);
        }
      }
    });

    var specialCasesScreenerView = new SpecialCasesScreenerView({
      model: appModel,
      onSuccess: _.bind(function() {
        appModel.save(null, {
          success: function() {
            lastStepView.remove();
            self.views = _.without(self.views, lastStepView);
            self._renderAndAppend(lastStepView);
          }
        });
      }, this)
    });

    self._clearAndRender(basicInfoScreenerView);

    if (appModel.isBasicInfoValid() &&
        (!appModel.isMaybeEligibleForSubsidy() ||
        AppContext.faFlowEnabled())) {

      self._renderAndAppend(specialCasesScreenerView);

      // TODO(david): Redirect to FFM if failed special-cases screener.
      if (appModel.get('specialCasesStatus') ===
          AppModel.SPECIAL_CASES_STATUS.PASSED) {
        this._renderAndAppend(lastStepView);
      }
    }

    InputUtil.resetHtml5();
  },

  _scrollTo: function($el) {
    $('html, body').animate({scrollTop: $el.offset().top}, 400);
  },

  _clearAndRender: function(view) {
    this.destroyViews();

    $('#main-body-content').html(view.render().el);
    this.views = [view];

    // See comment in _renderAndAppend
    view.delegateEvents();
  },

  _renderAndAppend: function(view) {
    $('#main-body-content').append(view.render().el);
    this.views.push(view);
    this._scrollTo(view.$el);

    // TODO(benkomalo): even though delegateEvents is idempotent, this feels
    //    odd. Why do we need to do this? We must be using Backbone wrong.
    // Re-run delegateEvents, since this may be a "re-render" of a view that
    // was removed from the DOM. Note that Backbone.View's "remove()" method
    // causes the View to stop listening on events, so if we re-render
    // and re-enter the document, we need to re-listen.
    view.delegateEvents();
  },

  showIncomePage: function() {
    this.destroyViews();

    if (!this.getAppModel().get('id')) {
      this.navigate('privacy-policy', {trigger: true});
      return;
    }

    var self = this;
    var incomeView = new HouseholdIncomeView({
      model: this.getAppModel(),
      onSuccess: function() {
        self.navigate('additional-questions', {trigger: true});
      }
    });
    this.views.push(incomeView);
    $('#main-body-content').append(incomeView.render().el);
  },

  showNonFaSep: function() {
    this.destroyViews();

    if (!this.getAppModel().get('id')) {
      this.navigate('privacy-policy', {trigger: true});
      return;
    }

    var self = this;
    var nonFaSepView = new NonFaSepView({
      model: this.getAppModel(),
      onSuccess: function() {
        self.navigate('summary', {trigger: true});
      }
    });
    this._clearAndRender(nonFaSepView);
  },

  showAdditionalQuestions: function() {
    this.destroyViews();

    if (!this.getAppModel().get('id')) {
      this.navigate('privacy-policy', {trigger: true});
      return;
    }

    var self = this;
    var additionalQuestionsView = new AdditionalQuestionsView({
      model: this.getAppModel(),
      onSuccess: function() {
        self.navigate('summary', {trigger: true});
      }
    });
    this._clearAndRender(additionalQuestionsView);
  },

  /**
   * Show the privacy policy to the user before allowing them
   * to start the application. The application logic in other views
   * checks if the user has already started the application by seeing
   * if the application exists in the db (appModel has an id). If the
   * user has not started the application yet then we show the privacy
   * policy. On clicking continue on the privacy policy page we save
   * the appModel to the db and the application has officially "started".
   */
  showPrivacyPolicy: function() {
    this.destroyViews();

    var self = this;
    var view = new PrivacyPolicyView({
      model: this.getAppModel(),
      csr: this.data.csr,
      onSuccess: function() {
        self.navigate('', {trigger: true});
      }
    });
    this._clearAndRender(view);

    InputUtil.resetHtml5();
  },

  showSummaryPage: function() {
    this.destroyViews();

    if (!this.getAppModel().get('id')) {
      this.navigate('privacy-policy', {trigger: true});
      return;
    }

    var view = new ApplicationSummaryView({
      model: this.getAppModel(),
      router: this
    });
    $('#main-body-content').html(view.render().el);
    this.views.push(view);
  },

  getUser: function() {
    this.user = this.user || new Account(this.data.user, {parse: true});
    return this.user;
  },

  getAppModel: function() {
    this.appModel = this.appModel || new AppModel(this.data.appModelJson, {parse: true});
    return this.appModel;
  },

  destroyViews: function() {
    _.invoke(this.views, 'remove');
    this.views = [];
    window.scrollTo(0, 0);
  },

  logout: function() {
    // this server endpoint clears the auth cookies for the user
    // it will redirect them on to the main logout location
    window.location = Constants.LOGOUT_URL;
  }
});

return AuthenticatedAppRouter;

});
