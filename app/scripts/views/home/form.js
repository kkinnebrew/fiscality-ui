var Binding = require('../../common/binding');
var $ = require('jquery');

var SubmitBinding = Binding.extend({

  handle: function(e, event, message, args) {

    e.preventDefault();

    this.send('submit', message, args);

  }

});


module.exports = SubmitBinding;