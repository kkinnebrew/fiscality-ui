var ReactMixin = {

  on: function(event, callback) {

    if (!this.events) {
      this.events = {};
    }

    if (this.events.hasOwnProperty(event)) {
      this.events[event].push(callback);
    } else {
      this.events[event] = [callback];
    }

  },

  fire: function() {

    var args = Array.prototype.slice.call(arguments);
    var event = args.shift();

    if (this.events && this.events.hasOwnProperty(event)) {
      for (var i = 0; i < this.events[event].length; i++) {
        this.events[event][i].call(this, args);
      }
    }

  },

  detach: function(event) {

    if (this.events && this.events.hasOwnProperty(event)) {
      delete this.events[event];
    }

  }

};

module.exports = ReactMixin;