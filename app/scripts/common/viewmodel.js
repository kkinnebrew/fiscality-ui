var Class = require('./clementine').Class;

var ViewModel = Class.extend({

  initialize: function() {

    this.fire('refresh');

  }

});

module.exports = ViewModel;