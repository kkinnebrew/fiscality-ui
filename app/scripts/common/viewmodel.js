var Class = require('./clementine').Class;

var ViewModel = Class.extend({

  initialize: function() {

    this.refresh();

  },

  /**
   * sets an individual value on the view model and refresh if necessary
   * @param name
   * @param value
   */
  setValue: function(name, value) {

    if (this.hasOwnProperty(name) && this[name] !== value) {

      this[name] = value;

      this.refresh();

    }

  },

  /**
   * sets multiple values on the view model refreshing if necessary after all are set
   * @param values
   */
  setValues: function(values) {

    var changed = false;

    for (var name in values) {

      if (this.hasOwnProperty(name) && this[name] !== values[name]) {

        this[name] = values[name];

        changed = true;

      }

    }

    if (changed) {
      this.refresh();
    }

  },

  refresh: function() {
    this.fire('refresh');
  }

});

module.exports = ViewModel;