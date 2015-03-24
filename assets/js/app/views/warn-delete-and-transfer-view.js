define([
  'backbone',
  'common/constants',
  'common/util/ffm-util',
  'util/app-context',
  'views/card-view',
  'text!templates/warn-delete-and-transfer.html'
], function(
  Backbone,
  Constants,
  FFMUtil,
  AppContext,
  CardView,
  warnDeleteAndTransferTemplate
) {
var WarnDeleteAndTransferView = CardView.extend({
  templateText: warnDeleteAndTransferTemplate,
  cardName: 'warn-delete-and-transfer',
  events: _.extend({}, CardView.prototype.events, {
    'click .btn-transfer': '_onTransferClick'
  }),
  initialize: function(options) {
    this.appModel = options.appModel;
    // TODO(christian): add MixPanel event
  },
  _onTransferClick: function(e) {
    e.preventDefault();
    $('#loading').removeClass('hidden'); // start spinner
    var self = this;
    var urlToPost = Constants.APP_ROOT + 'data/application/' +
        self.appModel.get('id') + '/delete';

    $.ajax({
      type: 'POST',
      url: urlToPost,
      data: self.appModel.toJSON(),
      success: function(data, response, xhr) { // see what these return
        var locale = AppContext.getLocale();
        var state = self.appModel.get('coverageState');
        var year = self.appModel.get('coverageYear');
        window.location.href = FFMUtil.getApplicationUrl(locale, state, year);
      },
      error: function(xhr, status, error) {
        $('#loading').addClass('hidden'); // end spinner
        $('.transfer-error-message').removeClass('hidden'); // show error message
        console.error(error);
      }
    });
  }
});

return WarnDeleteAndTransferView;
});
