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

  var path = parts.join('.');

  if (this.config.hasOwnProperty(path) && this.config[path].abstract) {

    if (this.config[path].redirect) {
      var redirect = this.config[path].redirect.replace(/(^#\/?)|(\/$)/g, '');
      console.log('Redirecting to path: ' + redirect);
      location.hash = '#/' + redirect;
    } else {
      return console.error('Abstract state ' + path + ' cannot be rendered');
    }

  }

  for (var i = 0; i < parts.length; i++) {

    state = state + (state !== '' ? '.' : '') + parts[i];

    if (!this.queue[i] || (this.queue[i] && this.queue[i].state !== state)) {

      this.renderState(state, i);

    }

  }

  if (this.queue.length > i) {

    for (var j = i; j < this.queue.length; j++) {

      console.log('Purging remaining state: ' + this.queue[j].state);

      // destroy existing view

      this.destroyState(j);

    }

    this.queue.splice(i);

  }

};

Router.prototype.renderState = function(state, cacheIndex) {

  if (!this.config.hasOwnProperty(state)) return console.error('Invalid: State ' + state + ' not defined');

  var config = this.config[state];

  if (config.views) {

    var views = {};

    if (this.queue[cacheIndex]) {

      this.destroyState(cacheIndex);

    }

    for (var name in config.views) {
      views[name] = this.renderView(config.views[name], cacheIndex, name);
      console.log('Rendering partial state: ' + state + ':' + name);

    }

    this.queue[cacheIndex] = {
      state: state,
      views: views
    };

  } else {

    this.queue[cacheIndex] = this.renderView(config, cacheIndex);
    this.queue[cacheIndex].state = state;

    console.log('Rendering state: ' + state);


  }

};

Router.prototype.renderView = function(config, cacheIndex, name) {

  var view = new View(config.template);

  var $el = null;

  if (cacheIndex === 0) {

    $el = $('body').find(name ? '[ui-view="' + name + '"]' : '[ui-view]');

  } else {

    var prior = this.queue[cacheIndex-1];

    $el = prior.view.getSubview(name || undefined);

  }

  view.render($el);

  return {
    view: view
  };

};

Router.prototype.destroyState = function(cacheIndex) {

  console.log('Destroying state: ' + this.queue[cacheIndex].state);

  // store reference

  var item = this.queue[cacheIndex];

  // destroy existing view

  if (item.views) {

    for (var name in item.views) {

      item.views[name].view.destroy();

    }

  } else {

    item.view.destroy();

  }

}

module.exports = Router;