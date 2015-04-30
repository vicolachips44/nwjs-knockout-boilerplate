define(['jquery', 'knockout', 'underscore'], function($, ko, _) {

  return {
    boot: function() {

      console.log("booting application...");
      console.log("using jquery version " + $.fn.jquery);
      console.log("using knockout version " + ko.version);
      console.log("using underscore version " + _.VERSION);

      // we load the actual controller definition from the ko_active_controller div
      $ctrl = $('#ko_active_controller').data('value');
      console.log('active controller to load is ' + $ctrl);

      // we try to call it's load method
      requirejs([$ctrl], function(ctl) {
        if ('undefined' !== typeof $ctrl) {
          // controller exists we clear bindings
          $binding = $('#ko_page_content')[0];
          ko.cleanNode($binding);

          // we call the controller load method
          ctl.load();
        }
      });
    }
  };

});
