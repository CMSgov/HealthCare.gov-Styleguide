/**
 * Main router for RIDP pages.
 */
define([
  'common/constants',
  'util/input-util',
  'backends/jsessionid-refresher',
  'models/account',
  'models/ridp-model',
  'views/ridp-view',
  'views/ridp-redirect-view',
  'session-timer'
], function(
  Constants,
  InputUtil,
  JSessionIdRefresher,
  Account,
  RidpModel,
  RidpView,
  RidpRedirectView,
  SessionTimer
) {

var RidpRouter = Backbone.Router.extend({
  initialize: function(options) {
    options = options || {};

    this.lastStep = null;
    this.data = options.data;

    this.sessionTimer = new SessionTimer(this);
    this.sessionTimer.appendSessionWarningView();

    // TODO(adrian): export temporarily for easy debugging. remove later.
    window.sessionTimer = this.sessionTimer;

    this.views = [];
  },

  // If you add routes here, you also need to modify _configureHandlers in
  // eznode/main.js in order to have the app serve the route.
  routes: {
    '(/)': 'showRidpPage',
    'assistance(/)': 'showRidpAssitancePage'
  },

  _scrollTo: function($el) {
    $('html, body').animate({scrollTop: $el.offset().top}, 400);
  },

  _clearAndRender: function(view) {
    this.destroyViews();

    $('#main-body-content').html(view.render().el);
    this.views = [view];

    // TODO(benkomalo): even though delegateEvents is idempotent, this feels
    //    odd. Why do we need to do this? We must be using Backbone wrong.
    // Re-run delegateEvents, since this may be a "re-render" of a view that
    // was removed from the DOM. Note that Backbone.View's "remove()" method
    // causes the View to stop listening on events, so if we re-render
    // and re-enter the document, we need to re-listen.
    view.delegateEvents();
  },

  showRidpPage: function() {
    this.destroyViews();

    var user = this.getUser();
    var authInfo = this.data.authInfo;
    var ridpSession = RidpModel.fromAccount(user, authInfo);

    var self = this;
    var view = new RidpView({
      model: ridpSession,
      onSuccess: function() {
        // Redirect to /app on success because at this point
        // this.data.appModelJson is empty. The server needs to create the
        // AppModel and bootstrap it with data from the user's Account. That
        // is done in the application controller.
        window.location = Constants.APP_ROOT + 'app/';
      },
      onRedirect: function(redirect) {
        if(redirect) {
          self.navigate(redirect, {trigger: true, replace: true});
        }
      }
    });
    this._clearAndRender(view);

    InputUtil.resetHtml5();
  },

  showRidpAssitancePage: function() {
    this.destroyViews();

    var view = new RidpRedirectView();
    this._clearAndRender(view);

    InputUtil.resetHtml5();
  },

  getUser: function() {
    this.user = this.user || new Account(this.data.user, {parse: true});
    return this.user;
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

return RidpRouter;

});
