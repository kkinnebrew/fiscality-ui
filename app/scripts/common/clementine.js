var $ = require('jquery');
var _ = require('underscore');

function Application(config) {
  this.config = config;
}

Application.prototype.render = function(el) {
  var root = $('[ui-view]');
  if (el !== undefined) {
    this.$el = el;
  } else if (root.length === 1) {
    this.$el = root;
  } else {
    console.error('No root view found');
  }
};

module.exports = Application;