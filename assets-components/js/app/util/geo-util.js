define([
  'common/constants'
], function(
  Constants
) {

var GeoUtil = {};

/**
 * Asynchronously load a list of counties for a given zipcode
 * @param {string} zipCode A 5-digit string.
 *     Note: Zip+4 (9-digit zips) are supported, but there aren't
 *     any zip+4-to-county mappings yet in our USPS db, so zip+4s will error
 * @return {jQuery.Promise} A promise that's resolved when the data is ready,
 *     or rejected if the data can't be retrieved.
 */
GeoUtil.loadCountiesForZip = function(zipCode) {
  var url = Constants.APP_ROOT +
            'data/zipinfo/' +
            zipCode;
  var d = new $.Deferred();
  $.getJSON(url, function(data) {
    d.resolve(data['counties']);
  }).fail(function() {
    d.reject();
  });

  return d.promise();
};

GeoUtil.scrubAddress = function(address) {
  var url = Constants.APP_ROOT + 'data/scrubbed-address';
  var d = new $.Deferred();
  // TODO(lorenyu) use Adrian's "safeAjax" once that is merged in
  $.post(url, address, function(data) {
    d.resolve(data);
  }).fail(function() {
    d.reject();
  });

  return d.promise();
};

return GeoUtil;

});
