var $ = require('jquery');

function Router() {

  this.config = {};

}

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

  console.log(parts);

  var part = null;
  var state = null;
  var config = config;
  var params = null;

  while (parts.length) {

    part = parts.shift();

    state = state ? state + '.' + part : part;

    config = this.getConfig(state);

    if (!config) {
      return console.error('Invalid route ' + state);
    }

    if (config.params) {
      params = [];
      for (var i = 0; i < config.params.length; i++) {
        params[config.params[i].replace(':', '')] = parts.shift();
      }
    }

    this.renderState(state, config, params);

  }


};

/**
 * renders a given state based on it's configuration
 * @param state
 * @param config
 * @param [params]
 */
Router.prototype.renderState = function(state, config, params) {

};

module.exports = Router;