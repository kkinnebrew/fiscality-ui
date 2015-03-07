var Class = require('./clementine').Class;
var View = require('./view');
var $ = require('jquery');

var Router = Class.extend({

  initialize: function() {

    // initialize vars

    this.defaultState = null;
    this.notFound = null;

    // store render tree config
    this.states = {};

    // route element
    this.root = null;

  },

  listen: function() {

    // bind hash change

    $(window).on('hashchange', $.proxy(this.onHashChange, this));

    // force first render
    this.render();

  },

  register: function(state, config) {

    if (!this.states.hasOwnProperty(state)) {
      this.states[state] = config;
    } else {
      console.error('State ' + state + ' has already been defined');
    }

  },

  registerDefault: function(state) {
    this.defaultState = state.replace(/(^\/)|(\/$)/, '');
  },

  register404: function(config) {
    this.notFound = config;
  },

  onHashChange: function() {
    this.render()
  },

  render404: function() {

    // setup view

    this.root = {
      view: new View(this.notFound.template)
    };

    var $el = $('body').find('[ui-view]');

    $el.empty();

    // render into document

    this.root.view.render($el);

  },

  render: function() {

    var hash = location.hash.replace(/(^#\/?)|(\/$)/g, '');

    // handle empty hashes

    if (!hash || hash === '') {

      if (this.defaultState) {
        return location.hash = '#/' + this.defaultState;
      } else if (this.notFound) {
        return this.render404();
      }

    }

    // handle lack of default hashes

    if (!hash) {
      console.error('State for 404 route not defined');
    }

    function RouterNode(obj) {
      this.view = obj instanceof View ? obj : null;
      this.views = obj instanceof View ? null : obj;
    }

    RouterNode.prototype.registerSubview = function(view, name) {
      if (this.view) {
        this.view.registerSubview(view, name);
      } else {
        throw new Error('Cannot register subview for multipart view parent. Use absolute instead.');
      }
    };

    RouterNode.prototype.render = function($el) {
      if (this.view) {
        this.view.render($el.find('[ui-view]'));
      } else {
        for (var view in this.views) {
          var $view = $el.find('[ui-view="' + view + '"]');
          this.views[view].view.render($view);
        }
      }
    };

    function setupView(config, last, name) {
      var view = new View(config.template);
      if (last && last instanceof RouterNode) {
        last.registerSubview(view, name || undefined);
      }
      return new RouterNode(view);
    }

    function setupViews(config, last) {
      var views = {};
      for (var name in config.views) {
        if (!name.match(/@/)) {
          views[name] = setupView(config.views[name], last, name);
        }
      }
      for (var name in config.views) {
        if (name.match(/@/)) {
          var parts = name.split('@');
          var target = parts[0];
          var context = parts[1];
          if (views.hasOwnProperty(context)) {
            views[name] = setupView(config.views[name], views[context], target);
          }
        }
      }
      return new RouterNode(views);
    }

    var parts = hash.split('/');
    var state = null;
    var last = null;
    var config = null;

    console.log('Rendering', parts);

    for (var i = 0; i < parts.length; i++) {

      state = (state ? state + '.' : '') + parts[i];

      if (!this.states.hasOwnProperty(state)) {
        console.error('State ' + state + ' is not defined');
        return this.render404();
      } else {
        config = this.states[state];
        if (!last) {
          this.root = last = !config.views ? setupView(config) : setupViews(config);
        } else {
          last = !config.views ? setupView(config, last) : setupViews(config, last);
        }
      }
      if (i === parts.length - 1 && config.abstract) {
        if (config.redirect) {
          location.hash = '#/' + config.redirect.replace(/(^#\/?)|(\/$)/g, '');
        } else {
          console.error('No redirect for abstract state ' + state + ' defined');
          return this.render404();
        }
      }
    }

    // render into body

    $('body').find('[ui-view]').empty();
    this.root.render($('body'));

  }

});

module.exports = Router;