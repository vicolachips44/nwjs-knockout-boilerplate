define(['jquery', 'knockout'], function($, ko) {
  function WelcomeCtrl() {
    this.greeting = ko.observable('Welcome to knockout world!!');
  }

  WelcomeCtrl.prototype = {
    constructor: WelcomeCtrl,

    load: function() {
      console.log('in welcome controller load function');
      var fs = require('fs');
      var $html = fs.readFileSync('templates/welcome.html', 'utf8');
      console.log($html);
      $('#ko_page_content').html($html);
      ko.applyBindings(this);
    }
  };

  return new WelcomeCtrl();


});
