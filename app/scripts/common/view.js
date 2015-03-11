var $ = require('jquery');

function View(template) {

  /**
   * stores a copy of the template provided to the view
   * @param {Function|string}
   */
  this.template = template;

  /**
   * holds a reference to where the view is rendered into the DOM
   * @type {jQuery}
   */
  this.$el = null;

  /**
   * whether or not the view has been rendered
   * @type {boolean}
   */
  this.rendered = false;

}

/**
 * renders the view directly into a given element
 * @method render
 * @param $el
 */
View.prototype.render = function($el) {

  // check if rendered

  if (this.rendered) {
    return console.warn('View is already rendered');
  }

  // store reference to DOM

  this.$el = $el;

  // render the template

  var html = typeof this.template === 'function' ? this.template() : this.template;

  this.$el.html(html);

  this.rendered = true;

  // bind event handlers TODO: handle all propagating events

  this.$el.find('[ui-view]').on('click', function(e) {
    e.stopPropagation();
  });

  this.bind();

};

/**
 * method called after rendering when events should be bound
 * @method bind
 */
View.prototype.bind = function() {

};

/**
 * method called prior to destroying all DOM references, when events should be unbound
 * @method unbind
 */
View.prototype.unbind = function() {

};

/**
 * destroys the currently rendered view and returns it to its unrendered state
 * @method destroy
 */
View.prototype.destroy = function() {

  if (!this.rendered) {
    return console.warn('Unrendered view cannot be destroyed');
  }

  this.$el.find('[ui-view]').off('click');

  this.unbind();

  this.$el.empty();

  this.$el = null;

};

/**
 * returns a view reference to a subview
 * @method getSubview
 * @param name
 * @returns {*}
 */
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