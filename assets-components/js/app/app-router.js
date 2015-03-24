/**
 * Main router for the logged out/landing page.
 */
define([
  'common/constants',
  'common/data/states',
  'backends/eznode-backend',
  'backends/ffm-backend',
  'models/account',
  'models/screener-model',
  'views/animated-map-view',
  'views/lite-account-view',
  'views/lite-screener-view',
  'views/help-collection-view',
  'views/help-collection-income-view',
  'util/ab-util',
  'util/analytics',
  'util/app-context',
  'util/cache',
  'util/input-util'
], function(
  Constants,
  States,
  EZNodeBackend,
  FFMBackend,
  Account,
  ScreenerModel,
  AnimatedMapView,
  LiteAccountView,
  LiteScreenerView,
  HelpCollectionView,
  HelpCollectionIncomeView,
  ABUtil,
  Analytics,
  AppContext,
  LocalCache,
  InputUtil
) {

var AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    options = options || {};

    // To make it easier to debug A/B tests, we export this.
    window.ab = ABUtil;

    this.screenerModel = null;
    this.lastStep = null;
    this.data = options.data;

    // TODO(david): Figure out how to auto-remove view on route change.

    this.standaloneMode = true;

    /**
     * Normally, we use client side navigation to go from the screener
     * to the account creation page. However, for the waiting room and
     * other logic to trigger, the account creation page needs to be done
     * on a full page reload with a dedicated URL, so we use a full page
     * navigation until we can resolve that issue or find other ways to fix it.
     */
    this.useFullPageNavigation = ABUtil.flag(
        'useFullPageNavigationForCreateAccount');

    if (this.standaloneMode) {
      this.backend = new FFMBackend({
        timeout: ABUtil.flag('ffmRestTimeoutMs')
      });
    } else {
      this.backend = new EZNodeBackend(Constants.APP_ROOT + 'data/accounts/new');
    }
  },

  // If you add routes here, you also need to modify _configureHandlers in
  // eznode/main.js in order to have the app serve the route.
  routes: {
    '': 'home',  // only accessible from development
    'state=:state': 'liteScreener',
    'welcome(/)': 'liteScreener',
    'create-account(/)': 'liteAccount',
    'help/income(/)': 'helpCollectionIncome',
    'help(/)': 'helpCollection'
  },

  home: function() {
    this.navigate(
        // Preserve query parameters since it's important for analytics.
        'welcome/' + window.location.search,
        {trigger: true, replace: true});
  },

  maybeInitializeMap: function() {
    if (this.animatedMapView) {
      // Already initialized.
      return;
    }

    if (_.isFunction(Array.prototype.map) && !$('body').hasClass('ie')) {
      // Horrible hack - look away! We want to asynchronously and conditionally
      // load the d3.js for the browsers that support it. Doing that with
      // requirejs is a tad difficult to support with compiled bundles, so
      // we use $.getScript. Unfortunately, d3 tries to detect if requirejs
      // exists and just calls `define(d3)`, preventing it from going into
      // global scope (which AnimatedMapView expects). So we monkey patch out
      // define temporarily.
      if (ABUtil.flag('showMap')) {
        var self = this;
        var origDefine = window.define;
        window.define = undefined;
        $.getScript(Constants.STATIC_ROOT + 'js/libs/d3.v3.min.js', function() {
          window.define = origDefine;
          self.animatedMapView = new AnimatedMapView({
            model: self.screenerModel,
            el: '.animated-map'
          });
          self.animatedMapView.render();
        });
      }
    }
  },

  /**
   * This page is now deprecated by /get-coverage
   */
  liteScreener: function(opt_initialState) {
    window.location = '/get-coverage';
    return;
  },

  navigateToAccountCreation: function() {
    if (this.useFullPageNavigation) {
      this.fullPageNavigateToAccountCreation();
    } else {
      // Client side navigation.
      this.view.remove();
      window.scrollTo(0, 0);
      this.navigate('create-account/', {trigger: true});
    }
  },

  fullPageNavigateToAccountCreation: function() {
    LocalCache.cache.set('timestampedScreener', {
      screener: this.screenerModel.toJSON(),
      timestamp: Number(new Date())
    });
    window.location = Constants.APP_ROOT + 'create-account/';
  },

  navigateToClassicAccountCreation: function() {
    var langTerritory = AppContext.getLocale() === 'es' ? 'es_MX' : 'en_US';
    window.location =
        '/marketplace/global/' + langTerritory +
        '/registration#signUpStepOne';
  },

  clientSideNavigateToScreener: function() {
    this.navigate('welcome/', {trigger: true, replace: true});
  },

  liteAccount: function() {
    // This page should only be visited after successful completion of the
    // initial welcome screener. This can happen on a client-side navigation,
    // or a full-page navigation by way of stuffing data in the LocalCache.
    if (!this.screenerModel) {
      // Try to retrieve it from the cache.
      var cachedData = LocalCache.cache.get('timestampedScreener');
      if (!cachedData) {
        this.clientSideNavigateToScreener();
        return;
      }

      var now = Number(new Date());
      var timestamp = Number(cachedData.timestamp);
      if (isNaN(timestamp) || (now - timestamp) > (10 * 60 * 1000)) {
        // Screener data is too old. Maybe from a previous session on a
        // shared computer or something. Purge it.
        LocalCache.cache.del('timestampedScreener');
        this.clientSideNavigateToScreener();
        return;
      }
      try {
        this.screenerModel = new ScreenerModel(
          _.pick(cachedData.screener, _.keys(ScreenerModel.prototype.defaults)),
          {parse: true}
        );
      } catch(e) {
        this.clientSideNavigateToScreener();
      }

      // If we're here that means we restored successfully from cache and
      // we had navigated to the create account screen directly. Proceed!
      this.maybeInitializeMap();
    }

    var self = this;
    var account = new Account();
    this.view = new LiteAccountView({
      model: account,
      screenerModel: this.screenerModel,
      onSuccess: function() {
        // Success! Purge the screener cache.
        LocalCache.cache.del('timestampedScreener');

        self.view.remove();
        window.location = Constants.AUTHENTICATED_APP_ROOT;
        window.scrollTo(0, 0);
      },
      standaloneMode: self.standaloneMode,
      backend: self.backend
    });
    $('.welcome-card-contents').html(self.view.render().el);
    InputUtil.resetHtml5();
  },

  helpCollectionIncome: function() {
    _.invoke(this.views, 'remove');

    var helpCollectionIncome = new HelpCollectionIncomeView();
    $('#main-body-content').html(helpCollectionIncome.render().el);

    this.views = [helpCollectionIncome];
  },

  helpCollection: function() {
    _.invoke(this.views, 'remove');

    var helpCollection = new HelpCollectionView();
    $('#main-body-content').html(helpCollection.render().el);

    this.views = [helpCollection];
  }
});

return AppRouter;

});
