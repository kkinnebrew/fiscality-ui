var Class = require('./clementine').Class;
var $ = require('jquery');

var View = Class.extend({

  initialize: function(template, viewModel) {

    // store properties

    this.template = template;
    this.viewModel = viewModel;

    // states

    this.rendered = false;

    // create dom references

    this.$el = null;
    this.$target = null;
    this.$subviews = {};
    this.$registrations = {};

    // prepare template

    this.prepare();

  },

  prepare: function() {

    var that = this;

    // parse template

    if (typeof this.template === 'string') {
      this.$el = $('<div></div>').html(this.template);
    } else {
      this.$el = $('<div></div>').html(this.template(this.viewModel));
    }

    // parse subviews

    this.$subviews = {};

    var subviews = this.$el.find('[ui-view]');

    if (subviews.length === 1) {
      that.$subviews['default'] = subviews;
    } else {
      this.$el.find('[ui-view]').each(function() {
        var name = this.attr('ui-view');
        if (name === 'default') return;
        that.$subviews[name] = $(this);
      });
    }

  },

  render: function($el) {

    if (this.rendered) {
      return;
    }

    // render into main view

    this.$target = $el;

    this.$el.children().appendTo(this.$target);

    this.bind();

    this.renderSubviews();

    this.rendered = true;

  },

  refresh: function($target) {

    //console.log('refresh received', this.viewModel.transactions);

    if (!this.rendered) {
      return;
    }

    this.unbind();

    this.prepare();

    this.$target.empty();

    if ($target) {
      this.$target = $target;
    }

    this.$el.children().appendTo(this.$target);

    this.bind();

    this.refreshSubviews(); // wut?

  },

  renderSubviews: function() {

    for (var name in this.$registrations) {

      var view = this.$registrations[name];

      if (this.$subviews.hasOwnProperty(name)) {
        view.render(this.$subviews[name]);
      }

    }

  },

  refreshSubviews: function() {

    for (var name in this.$registrations) {

      var view = this.$registrations[name];

      if (this.$subviews.hasOwnProperty(name)) {
        view.refresh(this.$subviews[name]);
      }

    }

  },

  registerSubview: function(view, name) {

    if (!name) {
      name = 'default';
    }

    this.$registrations[name] = view;

  },

  bind: function() {

    var that = this;

    // find all event bindings

    this.$target.find('[data-bind]').each(function() {

      // parse binding

      var pattern = $(this).attr('data-bind');

      try {

        var event = pattern.match(/([^:]+)/)[1];
        var message = pattern.match(/:(.+)\(/)[1];
        var argumentsString = pattern.match(/\((.+)\)/);
        var arguments = argumentsString ? argumentsString[1].replace(' ', '').split(',') : [];

        $(this).on(event, function() {
          that.fire('message', {
            message: message,
            arguments: arguments
          });
        });

      } catch(e) {
        console.error('Invalid [data-bind] pattern', pattern, e);
      }

    });

    // find live model bindings

    this.$target.find('[data-model]').each(function() {

      var model = $(this).attr('data-model');
      var tag = $(this).prop('tagName');

      switch (tag.toLowerCase()) {
        case 'input':
          $(this).on('keyup', function(e) {
            if (e.which <= 90 && e.which >= 48) {
              that.fire('change', {
                key: model,
                value: $(this).val()
              });
            }

          });
          break;
        case 'select':
          $(this).on('change', function() {
            that.fire('change', {
              key: model,
              value: $(this).val()
            });
          });
          break;
      }

    });

  },

  unbind: function() {

    // remove all event bindings

    this.$target.find('[data-bind]').each(function() {

      // parse binding

      var pattern = $(this).attr('data-bind');

      try {
        var event = pattern.match(/([^:]+)/)[1];
      } catch(e) {
        console.error('Invalid [data-bind] pattern', pattern);
      }

      $(this).off(event);

    });

    // remove live model bindings

    this.$target.find('[data-model]').each(function() {

      var tag = $(this).prop('tagName');

      switch (tag.toLowerCase()) {
        case 'input':
          $(this).off('keyup');
          break;
        case 'select':
          $(this).off('change');
          break;
      }

    });

  }

});

module.exports = View;