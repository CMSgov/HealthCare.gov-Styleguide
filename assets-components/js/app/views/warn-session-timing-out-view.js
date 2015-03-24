define([
  'backbone',
  'views/card-view',
  'text!templates/warn-session-timing-out.html'
], function(
  Backbone,
  CardView,
  warnSessionTimingOutTemplate
) {

var WarnSessionTimingOutView = CardView.extend({
  templateText: warnSessionTimingOutTemplate,
  className: CardView.prototype.className,
  cardName: 'warn-session-timing-out',
  events: _.extend({}, CardView.prototype.events, {
    'click .btn-logout': '_onLogoutClick'
  }),
  _onLogoutClick: function() {
    this.router.logout();
  }
});

return WarnSessionTimingOutView;
});
