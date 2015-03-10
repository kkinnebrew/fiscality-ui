var $ = require('jquery');

function View(template) {

  this.template = template;

  this.$el = null;

}

View.prototype.render = function($el) {

  this.$el = $el;

  console.log(this.$el);

  var html = typeof this.template === 'function' ? this.template() : this.template;

  this.$el.html(html);

};

View.prototype.destroy = function() {

  console.log(this.$el);

  this.$el.empty();

  this.$el = null;

};

View.prototype.getSubview = function() {

  return this.$el.find('[ui-view]');

};

function Router() {

  this.config = {};

  this.queue = [];

}

Router.prototype.register = function(state, config) {

  this.config[state] = config;

};

Router.prototype.listen = function() {

  $(window).on('hashchange', $.proxy(this.render, this));

  this.render();

};

Router.prototype.render = function() {

  // split into parts

  var parts = location.hash.replace(/(^#\/?)|(\/$)/g, '').split('/');
  var state = '';

  console.log(parts);

  // render first level



  for (var i = 0; i < parts.length; i++) {

    state = state + (state !== '' ? '.' : '') + parts[i];

    console.log(state);

    if (!this.queue[i] || (this.queue[i] && this.queue[i].state !== state)) {

      this.renderState(state, i);

    }

  }

  console.log(this.queue.length, i);

  if (this.queue.length > i) {

    for (var j = i; j < this.queue.length; j++) {

      console.log('destroy');

      // destroy existing view

      this.queue[j].view.destroy();

      this.queue[j] = null;

    }

  }



};

Router.prototype.renderState = function(state, cacheIndex) {

  console.log(1);

  if (this.config.hasOwnProperty(state)) {

    console.log(2);

    var config = this.config[state];

    var view = new View(config.template);

    if (cacheIndex === 0) {

      var $el = $('body').find('[ui-view]');

      console.log(config, view, $el);

      if (this.queue[cacheIndex]) {

        console.log('destroy');

        // destroy existing view

        this.queue[cacheIndex].view.destroy();

      }

      console.log('render');

      view.render($el);

      this.queue[cacheIndex] = {
        state: state,
        view: view
      };

    } else {

      var prior = this.queue[cacheIndex-1];

      var view = new View(config.template);

      var $el = prior.view.getSubview();

      console.log($el);

      if (this.queue[cacheIndex]) {

        console.log('destroy');

        // destroy existing view

        this.queue[cacheIndex].view.destroy();

      }

      console.log('render');

      view.render($el);

      this.queue[cacheIndex] = {
        state: state,
        view: view
      };

    }

  }

};

module.exports = Router;