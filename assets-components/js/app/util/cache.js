/**
 * An abstraction over a local cache.
 *
 * This attempts to use sessionStorage, but will fallback to using a cookie
 * when sessionStorage is not available.
 *
 * This should not store any PII whatsoever and should only be used for very
 * small bits of semi-transient state.
 */
define([
  'common/constants'
], function(
  Constants
) {

/**
 * Simple abstraction over sessionStorage.
 */
var SessionStorageCache = {
  _key: function(name) {
    return 'mpl-' + name;
  },

  get: function(name) {
    var data = window.sessionStorage[this._key(name)];
    if (data) {
      try {
        return JSON.parse(data);
      } catch(e) {
        return null;
      }
    }
    return null;
  },

  set: function(name, value) {
    window.sessionStorage[this._key(name)] = JSON.stringify(value);
  },

  del: function(name) {
    var key = this._key(name);
    if (key in window.sessionStorage) {
      delete window.sessionStorage[key];
    }
  }
};


/**
 * A store based on a cookie value.
 *
 * This stores cached key/value pairs in an in-memory "store" object, also
 * periodically flushing it to a serialized form as a cookie.
 */
var CookieCache = {
  cookieName: 'mpl-cookie-cache',

  /**
   * We cache the contents of the single cookie here.
   */
  store: null,

  /**
   * Attempt to retrieve the entire set of key-value pairs from the cookie.
   */
  _inflateCookie: function() {
    if (this.store) {
      return this.store;
    }

    var morsels = (document.cookie || '').split('; ');
    var prefix = this.cookieName + '=';
    var matchingPair = _.find(morsels, function(pair) {
      return pair.indexOf(prefix) === 0;
    });

    if (!matchingPair) {
      this.store = {};
    } else {
      try {
        var decoded = decodeURIComponent(matchingPair.split('=')[1]);
        this.store = JSON.parse(decoded);
      } catch(e) {
        this.store = {};
      }
    }

    return this.store;
  },

  /**
   * Serialize this.store into cookie form.
   * If there's nothing level in the store, nuke the cookie.
   */
  _persistCookie: function() {
    if (!this.store || _.isEmpty(this.store)) {
      document.cookie =
          this.cookieName + '=; Max-Age=0; path=' + Constants.APP_ROOT + ';';
    } else {
      var value = encodeURIComponent(JSON.stringify(this.store));
      document.cookie =
          this.cookieName + '=' + value + ';' +
          ' path=' + Constants.APP_ROOT + ';';
    }
  },

  get: function(name) {
    return this._inflateCookie()[name] || null;
  },

  set: function(name, value) {
    this._inflateCookie()[name] = value;
    this._persistCookie();
  },

  del: function(name) {
    delete this._inflateCookie()[name];
    this._persistCookie();
  }
};


var supportsSessionStorage = function() {
  try {
    // All the tier 1 browsers we support has sessionStorage. However,
    // Safari in "private browsing" (including on iOS), will throw a
    // DOMException when you attempt to write to sessionStorage.
    window.sessionStorage['__mpltest__'] = '42';
    var valid = window.sessionStorage['__mpltest__'] === '42';
    delete window.sessionStorage['__mpltest__'];
    return valid;
  } catch (e) {
    return false;
  }
};

return {
  'cache': (supportsSessionStorage() ? SessionStorageCache : CookieCache),
  '_cookieCache': CookieCache,
  '_sessionStorageCache': SessionStorageCache,
  '_supportsSessionStorage': supportsSessionStorage
};

});
