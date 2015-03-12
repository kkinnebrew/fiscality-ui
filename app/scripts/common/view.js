var $ = require('jquery');

function View(template, viewModel) {

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

  /**
   * stores the view model if one is defined
   * @type {ViewModel}
   */
  this.viewModel = viewModel || null;

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

  var html = typeof this.template === 'function' ? this.template(this.viewModel || {}) : this.template;

  this.$el.html(html);

  this.rendered = true;

  // bind event handlers TODO: handle all propagating events

  this.$el.find('[ui-view]').on('click', function(e) {
    e.stopPropagation();
  });

  this.bind();

  // bind view model refresh

  if (this.viewModel) {

    this.viewModel.on('refresh', $.proxy(this.refresh, this));

  }

};

View.prototype.refresh = function() {

  if (!this.rendered) {
    return console.warn('Cannot refreshed unrendered view');
  }

  var that = this;

  // unbind event handlers

  this.unbind();

  // remove propagation stops

  this.$el.find('[ui-view]').off('click');

  // store references to subviews

  var $subviews = this.$el.find('[ui-view]');

  // remove views

  this.$el.empty();

  // rerender view

  var html = typeof this.template === 'function' ? this.template(this.viewModel || {}) : this.template;

  this.$el.html(html);

  // bind events

  this.bind();

  // repopulate subviews

  $subviews.each(function() {

    var name = $(this).attr('ui-view');

    that.$el.find('[ui-view="' + name + '"]').replaceWith(this);

  });

  // bind prop stops

  this.$el.find('[ui-view]').on('click', function(e) {
    e.stopPropagation();
  });

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


View.prototype.renderSubview = function(name, view) {

  var $subview = null;

  if (name) {
    $subview = this.$el.find('[ui-view="' + name + '"]');
  } else {
    $subview = this.$el.find('[ui-view]');
  }

  if ($subview.length === 0) {
    console.error('Subview' + (name ? ' with name "' + name  + '"' : '')  + ' not found');
  }

  view.render($subview);

};

module.exports = View;