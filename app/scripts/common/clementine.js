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

  this.$el = $('<div></div>');

  if (typeof template === 'string') {
    this.$el.html(template);
  }

  this.$subview = this.$el.find('[ui-view]');

}

View.prototype.render = function($el) {

  this.$el.children().appendTo($el);


};

View.prototype.bind = function() {

};

View.prototype.unbind = function() {

};

View.prototype.getSubview = function() {

  return this.$subview;

};

module.exports.Application = Application;
module.exports.View = View;