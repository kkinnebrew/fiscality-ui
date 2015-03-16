var Class = require('./clementine').Class;

var ViewModel = Class.extend({

  initialize: function() {

    this.fire('refresh');

  },

  setValue: function(name, value) {

    if (!this[name] || this[name] !== value) {

      this[name] = value;

      this.fire('refresh');

    }

  },

  setValues: function(values) {

    var changed = false;

    for (var name in values) {

      if (!this[name] || this[name] !== values[name]) {

        this[name] = values[name];

        changed = true;

      }

    }

    if (changed) {
      this.fire('refresh');
    }
    
  }

});

module.exports = ViewModel;