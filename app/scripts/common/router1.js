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

      if (this.queue[j].views) {

        for (var viewNew in this.queue[j].views) {

          this.queue[j].views[viewNew].view.destroy();

        }

      } else {

        this.queue[j].view.destroy();

      }

    }

    this.queue.splice(i);

  }

};

Router.prototype.renderState = function(state, cacheIndex) {

  if (!this.config.hasOwnProperty(state)) return console.error('Invalid: State ' + state + ' not defined');

  var config = this.config[state];

  if (config.views) {

    var views = {};

    for (var viewName in config.views) {

      var conf = config.views[viewName];

      var view = new View(conf.template);

      if (cacheIndex === 0) {

        var $el = $('body').find('[ui-view="' + viewName + '"]');

      } else {

        var prior = this.queue[cacheIndex-1];

        var $el = prior.view.getSubview(viewName);

      }

      if (this.queue[cacheIndex]) {

        console.log('Destroying state: ' + this.queue[cacheIndex].state);

        // destroy existing view

        if (this.queue[cacheIndex].views) {

          for (var viewNew in this.queue[cacheIndex].views) {

            this.queue[cacheIndex].views[viewNew].view.destroy();

          }

        } else {

          this.queue[cacheIndex].view.destroy();

        }

      }

      console.log('Rendering partial state: ' + state + ':' + viewName);

      view.render($el);

      views[viewName] = {
        view: view
      };

    }

    this.queue[cacheIndex] = {
      state: state,
      views: views
    };

  } else {

    var view = new View(config.template);

    if (cacheIndex === 0) {

      var $el = $('body').find('[ui-view]');

    } else {

      var prior = this.queue[cacheIndex-1];

      var $el = prior.view.getSubview();

    }

    if (this.queue[cacheIndex]) {

      console.log('Destroying state: ' + this.queue[cacheIndex].state);

      // destroy existing view

      if (this.queue[cacheIndex].views) {

        for (var viewNew in this.queue[cacheIndex].views) {

          this.queue[cacheIndex].views[viewNew].view.destroy();

        }

      } else {

        this.queue[cacheIndex].view.destroy();

      }

    }

    console.log('Rendering state: ' + state);

    view.render($el);

    this.queue[cacheIndex] = {
      state: state,
      view: view
    };

  }

};

module.exports = Router;