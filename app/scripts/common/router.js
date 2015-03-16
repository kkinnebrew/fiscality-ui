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

  this.config[state] = config;

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
 * renders the overall hash path using cached views when available
 * @method render
 */
Router.prototype.render = function() {

  // split into parts

  var parts = location.hash.replace(/(^#\/?)|(\/$)/g, '').split('/');
  var state = '';

  // check if exists

  if (parts.length === 1 && parts[0] === '' && this.defaultState) {

    // redirect to default state

    console.log('Redirecting to path: ' + this.defaultState);
    return location.hash = '#/' + this.defaultState;

  }

  // check if abstract

  var path = parts.join('.');

  if (this.config.hasOwnProperty(path) && this.config[path].abstract) {

    if (this.config[path].redirect) {
      var redirect = this.config[path].redirect.replace(/(^#\/?)|(\/$)/g, '');
      console.log('Redirecting to path: ' + redirect);
      return location.hash = '#/' + redirect;
    } else {
      return console.error('Abstract state ' + path + ' cannot be rendered');
    }

  }

  for (var i = 0; i < parts.length; i++) {

    state = state + (state !== '' ? '.' : '') + parts[i];

    if (!this.queue[i] || (this.queue[i] && this.queue[i].state !== state)) {

      this._renderState(state, i);

    }

  }

  if (this.queue.length > i) {

    for (var j = i; j < this.queue.length; j++) {

      console.log('Purging remaining state: ' + this.queue[j].state);

      // destroy existing view

      this._destroyState(j);

    }

    this.queue.splice(i);

  }

};

/**
 * @private
 * @param state
 * @param cacheIndex
 * @returns {*}
 */
Router.prototype._renderState = function(state, cacheIndex) {

  if (!this.config.hasOwnProperty(state)) return console.error('Invalid: State ' + state + ' not defined');

  var config = this.config[state];

  if (config.url) {

    // process url from hash
    var hash = location.hash.replace(/(^#\/?)|(\/$)/g, '');

    console.log(123, hash, config.url);

  }

  if (config.views) {

    var views = {};

    if (this.queue[cacheIndex]) {

      this._destroyState(cacheIndex);

    }

    for (var name in config.views) {
      if (!name.match(/@/)) {
        views[name] = this._renderView(config.views[name], cacheIndex, name);
        console.log('Rendering partial state: ' + state + ':' + name);
      }
    }

    this.queue[cacheIndex] = {
      state: state,
      views: views
    };

    for (var name in config.views) {
      if (name.match(/@/)) {
        views[name] = this._renderAbsoluteView(config.views[name], cacheIndex, name);
        console.log('Rendering absolute state: ' + state + ':' + name);
      }
    }

  } else {

    this.queue[cacheIndex] = this._renderView(config, cacheIndex);
    this.queue[cacheIndex].state = state;

    console.log('Rendering state: ' + state);


  }

};

/**
 * @private
 * @param config
 * @param cacheIndex
 * @param [name]
 * @param [url]
 * @returns {{view: View}}
 */
Router.prototype._renderView = function(config, cacheIndex, name, url) {

  var view = null;
  var viewModel = null;

  if (config.viewModel) {
    viewModel = new config.viewModel();
  }

  if (config.view) {
    view = new config.view(config.template, viewModel || undefined);
  } else {
    view = new View(config.template, viewModel || undefined);
  }

  var $el = null;

  if (cacheIndex === 0) {

    $el = this.$root.find(name ? '[ui-view="' + name + '"]' : '[ui-view]');

    view.render($el);

  } else {

    var prior = this.queue[cacheIndex-1];

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
 * @param cacheIndex
 * @param name
 * @param [url]
 * @returns {{view: View}}
 * @private
 */
Router.prototype._renderAbsoluteView = function(config, cacheIndex, name, url) {

  var view = null;

  if (config.view) {
    view = new config.view(config.template);
  } else {
    view = new View(config.template);
  }

  var parts = name.split('@');
  var target = parts[0];
  var context = parts[1];

  var cacheItem = this.queue[cacheIndex];

  if (!cacheItem.views.hasOwnProperty(context)) {
    return console.error('Absolute view context "' + context + '" not defined');
  }

  cacheItem.views[context].view.renderSubview(target, view);

  return {
    view: view
  };

};

/**
 * @private
 * @param cacheIndex
 */
Router.prototype._destroyState = function(cacheIndex) {

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

};

module.exports = Router;