var $ = require('jquery');

function View(template) {

  this.template = template;

  this.$el = null;

  this.rendered = false;

  console.log('Initializing base view');

}

View.prototype.render = function($el) {

  // check if rendered

  if (this.rendered) {
    return console.warn('View is already rendered');
  }

  this.$el = $el;

  var html = typeof this.template === 'function' ? this.template() : this.template;

  this.$el.html(html);

  this.rendered = true;

  this.bind();


};

View.prototype.bind = function() {

};

View.prototype.unbind = function() {

};

View.prototype.destroy = function() {

  if (!this.rendered) {
    return console.warn('Unrendered view cannot be destroyed');
  }

  this.unbind();

  this.$el.empty();

  this.$el = null;

};

View.prototype.getSubview = function(name) {

  var subview = null;

  if (name) {
    subview = this.$el.find('[ui-view="' + name + '"]');
  } else {
    subview = this.$el.find('[ui-view]');
  }

  if (subview.length === 0) {
    console.error('Subview' + (name ? ' with name "' + name  + '"' : '')  + ' not found');
  }

  return subview;

};

module.exports = View;