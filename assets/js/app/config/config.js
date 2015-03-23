require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: '/marketplace/b/app2/js/app',

  // 3rd party script alias names (Easier to type 'jquery' than 'libs/jquery)
  paths: {
    'backends': '../../../common/backends/',
    'data': '../../../common/data/',
    'models': '../../../common/models/',
    'common': '../../../common/',

    // Core Libraries
    // --------------
    'jquery': '../../../common/libs/jquery-shim',
    'underscore': '../../../common/libs/lodash-shim',
    'moment': '../../../common/libs/moment',
    'mailcheck': '../libs/mailcheck.5ff8678cc4b.modified',

    // UI libraries
    'jquery-maskedinput': '../libs/jquery-maskedinput.1.3.modified',
    'jquery-showhide': '../libs/hideShowPassword-1.0.3',
    'jquery-placeholder': '../libs/placeholder-polyfill.jquery.2728b989080.modified',
    'request-animation-frame': '../libs/request-animation-frame',
    'topojson': '../libs/topojson.v0.min',
    'jquery.idle': '../../../common/libs/jquery.idle',

    'bootstrap-tab': '../libs/bootstrap/tab',
    'bootstrap-button': '../libs/bootstrap/button',
    'bootstrap-dropdown': '../libs/bootstrap/dropdown',
    'bootstrap-tooltip': '../libs/bootstrap/tooltip',
    'bootstrap-popover': '../libs/bootstrap/popover',

    // customizing the Bootstrap popover for help text
    'bootstrap-popover-override': '../libs/bootstrap/popover.override',

    'backbone': '../../../common/libs/backbone-shim',
    'backbone-validation': '../../../common/libs/backbone-validation.0.9.0.modified',
    'text': '../../../common/libs/text'
  },

  // Sets the configuration for third party scripts that are not AMD compatible
  shim: {
    // Twitter Bootstrap jQuery plugins
    'bootstrap-button': {
      'deps': ['jquery']
    },

    'bootstrap-dropdown': {
      'deps': ['jquery']
    },

    'bootstrap-tooltip': {
      'deps': ['jquery']
    },

    'bootstrap-popover': {
      'deps': ['jquery', 'bootstrap-tooltip']
    },

    // customizing the Bootstrap popover for help text
    'bootstrap-popover-override': {
      'deps': ['jquery', 'bootstrap-popover']
    },

    // Backbone
    'backbone': {
      // Depends on underscore/lodash and jQuery
      'deps': ['underscore', 'jquery', 'jquery.idle'],
      // Exports the global window.Backbone object
      'exports': 'Backbone'
    },

    'jquery-maskedinput': {
      'deps': ['jquery']
    },

    'jquery.idle': {
      'deps': ['jquery']
    },

    'jquery-placeholder': {
      'deps': ['jquery', 'request-animation-frame']
    },

    'mailcheck': {
      'deps': ['jquery'],
      'exports': 'Kicksend'
    },

    'topojson': {
      'exports': 'topojson'
    }
  }
});


