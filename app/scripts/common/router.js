var $ = require('jquery');
var View = require('./view');

function Router($root) {

  /**
   * stores reference to root element of document
   * @type {jQuery}
   */
  this.$root = $root;

  /**
   * stores route registrations
   * @type {Object}
   */
  this.config = {};

  /**
   * caches rendered nodes in the view hierarchy for reuse
   * @type {Array}
   */
  this.queue = [];

  /**
   * stores the state to render if the hash is empty
   * @type {string}
   */
  this.defaultState = null;

}

/**
 * register the state to render if an empty hash is passed
 * @method otherwise
 * @param state
 */
Router.prototype.otherwise = function(state) {

  this.defaultState = state.replace(/(^\/?)|(\/$)/g, '');

};

/**
 * registers a state along with it's configuration values
 * @method register
 * @param state
 * @param config
 */
Router.prototype.register = function(state, config) {

  var parts = state.split('.');
  var last = null;
  var part = null;

  while (parts.length) {

    part = parts.shift();

    if (!last) {
      last = this.config;
    }

    if (parts.length == 0) {

      if (last.hasOwnProperty(part)) {
        console.warn('Overriding existing route ' + state);
      }

      config.params = [];

      if (config.url) {

        config.params = config.url.match(/:(\w+)/g) || [];

      }

      last[part] = {
        config: config,
        children: {}
      };

    } else {

      if (!last.hasOwnProperty(part)) {
        return console.error('Parent route not defined');
      }

      last = last[part].children;

    }

  }

};

/**
 * activates the router to begin listening for hash changes
 * @method listen
 */
Router.prototype.listen = function() {

  $(window).on('hashchange', $.proxy(this.render, this));

  this.render();

};

/**
 * REturns the configuration option for a given state, or null
 * @param state
 * @returns {*}
 */
Router.prototype.getConfig = function(state) {

  var parts = state.split('.');

  var part = null;
  var last = null;

  while (parts.length) {

    part = parts.shift();

    if (!last) {
      last = this.config;
    }

    if (!last.hasOwnProperty(part)) {
      return console.error('State ' + state + ' not defined');
    }

    if (parts.length == 0) {
      return last[part].config;
    } else {
      last = last[part].children;
    }

  }

};

/**
 * renders the overall hash path using cached views when available
 * @method render
 */
Router.prototype.render = function() {

  var parts = location.hash.replace(/(^#\/?)|(\/$)/g, '').split('/');

  if (parts.length === 1 && parts[0] === '' && this.defaultState) {

    // redirect to default state

    console.log('Redirecting to path: ' + this.defaultState);
    return location.hash = '#/' + this.defaultState;

  }

  var part = null;
  var state = null;
  var config = null;
  var params = null;
  var depth = 0;

  while (parts.length) {

    part = parts.shift();

    state = state ? state + '.' + part : part;

    config = this.getConfig(state);

    if (!config) {
      return console.error('Invalid route ' + state);
    }

    if (config.params) {
      params = {};
      for (var i = 0; i < config.params.length; i++) {
        params[config.params[i].replace(':', '')] = parts.shift();
      }
    }

    if (!this.queue[depth] || this.queue[depth].state !== state) {
      this.renderState(state, config, depth, params);
    } else if (this.queue[depth] && this.queue[depth].viewModel) {
      this.queue[depth].viewModel.setValues(params);
    } else if (this.queue[depth] && this.queue[depth].views) {
      var views = this.queue[depth].views;
      for (var view in views) {
        if (views[view].viewModel) {
          views[view].viewModel.setValues(params);
        }
      }
    }


    depth++;

  }

  if (config.redirect) {

    var redirect = config.redirect.replace(/(^#?\/?)|(\/$)/g, '');

    console.log('Redirecting to path: ' + redirect);

    return location.hash = '#/' + redirect;

  }

  if (this.queue.length > depth) {

    for (var j = depth; j < this.queue.length; j++) {

      // destroy existing view

      this._destroyState(j);

    }

    this.queue.splice(depth);

  }


};

/**
 * renders a given state based on it's configuration
 * @param state
 * @param config
 * @param depth
 * @param [params]
 */
Router.prototype.renderState = function(state, config, depth, params) {

  if (config.views) {

    var views = {};

    if (this.queue[depth]) {
      this._destroyState(depth);
    }

    for (var name in config.views) {
      if (!name.match(/@/)) {
        views[name] = this._renderView(config.views[name], depth, name, params);
        console.log('Rendering partial state: ' + state + ':' + name);
      }
    }

    this.queue[depth] = {
      state: state,
      views: views
    };

    for (var name in config.views) {
      if (name.match(/@/)) {
        views[name] = this._renderAbsoluteView(config.views[name], depth, name, params);
        console.log('Rendering absolute state: ' + state + ':' + name);
      }
    }

  } else {

    if (this.queue[depth]) {
      this._destroyState(depth);
    }

    this.queue[depth] = this._renderView(config, depth, undefined, params);
    this.queue[depth].state = state;

    console.log('Rendering state: ' + state);

  }

};


/**
 * @private
 * @param config
 * @param depth
 * @param [name]
 * @param params
 * @returns {{view: View}}
 */
Router.prototype._renderView = function(config, depth, name, params) {

  var view = null;
  var viewModel = null;

  if (config.viewModel) {
    viewModel = new config.viewModel(params);
  }

  if (config.view) {
    view = new config.view(config.template, viewModel || undefined);
  } else {
    view = new View(config.template, viewModel || undefined);
  }

  var $el = null;

  if (depth === 0) {

    $el = this.$root.find(name ? '[ui-view="' + name + '"]' : '[ui-view]');

    view.render($el);

  } else {

    var prior = this.queue[depth-1];

    prior.view.renderSubview(name || undefined, view);

  }

  var node = {
    view: view
  };

  if (viewModel) {
    node.viewModel = viewModel;
  }

  return node;

};

/**
 * renders an absolute view in the router hierarchy
 * @param config
 * @param depth
 * @param name
 * @param params
 * @returns {{view: View}}
 * @private
 */
Router.prototype._renderAbsoluteView = function(config, depth, name, params) {

  var view = null;
  var viewModel = null;

  if (config.viewModel) {
    viewModel = new config.viewModel(params);
  }

  if (config.view) {
    view = new config.view(config.template, viewModel || undefined);
  } else {
    view = new View(config.template, viewModel || undefined);
  }

  var parts = name.split('@');
  var target = parts[0];
  var context = parts[1];

  var queueItem = this.queue[depth];

  if (!queueItem.views.hasOwnProperty(context)) {
    return console.error('Absolute view context "' + context + '" not defined');
  }

  queueItem.views[context].view.renderSubview(target, view);

  var node = {
    view: view
  };

  if (viewModel) {
    node.viewModel = viewModel;
  }

  return node;

};

/**
 * @private
 * @param cacheIndex
 */
Router.prototype._destroyState = function(depth) {

  console.log('Destroying state: ' + this.queue[depth].state);

  // store reference

  var item = this.queue[depth];

  // destroy existing view

  if (item.views) {

    for (var name in item.views) {

      item.views[name].view.destroy();

    }

  } else {

    item.view.destroy();

  }

};

module.exports = Router;