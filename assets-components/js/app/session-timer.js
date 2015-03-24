define([
  'backends/jsessionid-refresher',
  'models/ridp-model',
  'underscore',
  'views/warn-session-timing-out-view'
], function(
  JSessionIdRefresher,
  RidpModel,
  _,
  WarnSessionTimingOutView
) {

/***
 * This class encapsulates all of the session timing and session
 * maintenance functionality
 *
 * It monitors session idle timeouts and logs users out who have forgotten to
 * log out.
 *
 * It also runs a keep alive on the ffm servers to maintain the session and also
 * logs out the user on app2.0 in the case that the user is logged out on ffm.
 *
 * @param router An authenticated router which can logout a user.
 * @param options Defaults to {warnIdleMs: 25*60*1000, timeoutIdleMs: 30*60*1000}
 * @constructor
 */
var SessionTimer = function (router, options) {
  _.bindAll(this);

  this.options = options || {};
  this.router = router;

  this.initSessionRefreshers();
  this.initSessionIdleTimers();
  this.initSessionWarningView();
};

SessionTimer.prototype.initSessionRefreshers = function() {
  var refresherOptions = {
    logoutDetected: this.logoutDetected
  };
  this.marketplaceRefresher =
    JSessionIdRefresher.createMarketplaceRefresher(refresherOptions).keepAlive();
  this.eeRestRefresher =
    JSessionIdRefresher.createEERestRefresher(refresherOptions).keepAlive();
};

SessionTimer.prototype.logoutDetected = function() {
  console.log('Detected that the user logged out or timed out of ffm - logging out');
  this.router.logout();
};

SessionTimer.prototype.initSessionIdleTimers = function(warnIdleMs, timeoutIdleMs) {
  // the element to monitor
  var monitored = $(this.options.elementToMonitorForIdle || document);

  warnIdleMs = warnIdleMs || this.options.warnIdleMs || (25*60*1000);
  console.warn('Setting warnIdleMs=' + warnIdleMs);
  var warn = {
    idle: warnIdleMs, // warn idle time in ms
    onIdle: this.options.idleWarn || this.idleWarn,
    onShow: this.checkLoggedIn
  };
  timeoutIdleMs = timeoutIdleMs || this.options.timeoutIdleMs || (30*60*1000);
  console.warn('Setting timeoutIdle=' + timeoutIdleMs);
  var logout = {
    idle: timeoutIdleMs, // logout idle time in ms
    onIdle: this.options.idleTimeout || this.idleTimeout
  };

  this.warnTimer   = monitored.idle(warn);
  this.logoutTimer = monitored.idle(logout);
};

SessionTimer.prototype.idleWarn = function() {
  console.warn('Warning user that their session is about to time out.' + new Date());
  var warn = $('.warn-timeout');
  if (warn && warn.modal) {
    warn.modal('show');
  }
};

SessionTimer.prototype.idleTimeout = function() {
  console.warn('Session timeout reached - logging out now.' + new Date());
  if (this.router) {
    this.router.logout();
  }
};

SessionTimer.prototype.checkLoggedIn = function() {
  console.warn('Window just became visible - checking if we are logged in.' + new Date());
  if (this.eeRestRefresher) {
    this.eeRestRefresher.keepAlive();
  }
};

SessionTimer.prototype.initSessionWarningView = function() {
  this.warningView = new WarnSessionTimingOutView({
    model:  new RidpModel(),
    router: this.router
  });
  return this.warningView;
};

SessionTimer.prototype.appendSessionWarningView = function() {
  $('#warn-session-timing-out-modal').html(this.warningView.render().el);
  this.warningView.delegateEvents();
  return this.warningView;
};

return SessionTimer;
});
