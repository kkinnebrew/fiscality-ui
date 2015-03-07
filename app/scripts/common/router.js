var Class = require('./clementine').Class;
var View = require('./view');
var $ = require('jquery');

var Router = Class.extend({

  initialize: function() {

    // initialize vars

    this.defaultState = null;
    this.notFoundState = null;

    // store render tree config
    this.states = {};

    // store render tree objects
    this.cache = {};

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
    this.defaultState = state.replace(/^\//, '');
  },

  register404: function(config) {
    this.notFoundState = config;
  },

  onHashChange: function() {
    this.render()
  },

  render: function() {

    var hash = location.hash.replace(/(^#\/?)|(\/$)/g, '');

    // handle empty hashes

    if (!hash || hash === '') {
      hash = this.defaultState || this.notFoundState;
    }

    // handle lack of default hashes

    if (!hash) {
      console.error('State for 404 route not defined');
    }

    var parts = hash.split('/');
    var state = null;
    var config = null;
    var current = null;
    var last = null;

    console.log(parts);

    for (var i = 0; i < parts.length; i++) {

      state = (state ? state + '.' : '') + parts[i];

      if (!this.states.hasOwnProperty(state)) {
        console.error('State ' + state + ' is not defined');
      }

      config = this.states[state];

      if (config.views) {

        current = {
          state: state,
          views: {}
        };

        for (var view in config.views) {

          //if (!view.match(/@/)) {

            var conf = config.views[view];

            console.log(view, typeof conf.template);

            current.views[view] = {
              view: conf.view ? new conf.view(conf.template) : new View(conf.template)
            };

          //}

        }

        if (last) {

          // append to prior view
          for (var view in current.views) {
            if (!view.match(/@/)) {
              last.view.registerSubview(current.views[view].view, view);
            } else {
              var absparts = view.split('@');
              var name = absparts[0];
              var context = absparts[1];
              if (current.views.hasOwnProperty(context)) {
                current.views[context].view.registerSubview(current.views[view].view, name);
              }
            }
          }

        }

        this.cache[state] = current;

        last = current;

      } else {

        current = {
          state: state,
          view: config.view ? new config.view(config.template) : new View(config.template)
        };

        if (!this.root) {

          // store root reference
          this.root = current;

        } else {

          // append to prior view
          last.registerSubview(current.view);

        }

        this.cache[state] = current;

        last = current;

      }

    }

    // check if abstract

    var lastConf = this.states[last.state];

    if (lastConf.abstract) {

      if (lastConf.redirect) {
        location.hash = '#/' + lastConf.redirect.replace(/(^#\/?)|(\/$)/g, '');
      } else if (this.notFoundState) {
        // handle state
        console.error('Route not defined - TODO');
      } else {
        console.error('Route not defined');
      }

    }

    // append root view

    var $el = null;

    if (this.root.view) {

      // get reference

      $el = $('body').find('[ui-view]');

      // render into document

      this.root.view.render($el);

    } else if (this.root.views) {

      for (var view in this.root.views) {

        // get reference

        $el = $('body').find('[ui-view="' + view + '"]');

        // render into document

        this.root.views[view].view.render($el);

      }

    }

  }

});

module.exports = Router;