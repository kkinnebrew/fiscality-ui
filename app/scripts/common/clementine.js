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

function View(template) {

}

View.prototype.render = function(el) {

};

View.prototype.bind = function() {

};

View.prototype.unbind = function() {

};

module.exports = Application;
module.exports = View;