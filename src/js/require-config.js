requirejs.config({
  paths: {
    "jquery": "../vendor/jquery/dist/jquery",
    "knockout": "../vendor/knockout/dist/knockout.debug",
    "underscore": "../vendor/underscore/underscore",
    "app": "app",
    "welcome": "controller/welcome",
  },
  shim: {
    "jquery": {
      exports: '$'
    },
    "underscore": {
      exports: "_"
    },
    "knockout": {
      deps: ['jquery'],
      exports: "ko"
    }
  }
});

// controllers must be passed has dependencies since the optimizer will not see them has required source
// when building the distrib folder.
requirejs([
    'app',
    'welcome'
], function(app) {
  app.boot();
});
