var $ = require('jquery');

function View(template) {

  this.template = template;

  this.$el = null;

}

View.prototype.render = function($el) {

  this.$el = $el;

  var html = typeof this.template === 'function' ? this.template() : this.template;

  this.$el.html(html);

};

View.prototype.destroy = function() {

  this.$el.empty();

  this.$el = null;

};

View.prototype.getSubview = function(name) {

  if (name) {
    return this.$el.find('[ui-view="' + name + '"]');
  } else {
    return this.$el.find('[ui-view]');
  }

};

module.exports = View;