var Class = require('./clementine').Class;

var CollectionView = Class.extend({

  initialize: function(template, viewModel) {

    // store properties
    this.template = template;
    this.viewModel = viewModel;

    // states
    this.rendered = false;

    // create container
    this.$el = $('<div></div>');

  },

  render: function($el) {

    if (this.rendered) {
      return;
    }

    // TODO: check for template type -- assuming handlebars


    // parse repeater

    var $template = $(this.template({}));



    var pattern = $template.attr('data-repeat');
    var parts = pattern.match(/([A-Za-z_]+)\sin\s([A-Za-z_]+)/i);

    if (!parts) {
      return console.error('Invalid data-repeat pattern');
    }

    var key = parts[1], item = parts[2], list = this.viewModel[item], instance, data = {};

    if (!list || list.length === 0) {
      return console.error('Model for data-repeat not found');
    }

    for (var i = 0; i < list.length; i++) {
      data[key] = list[i];
      instance = template(data);
      this.$el.append(instance);
    }

    // render into main view

    this.$target = $el;

    this.$el.children().appendTo($el);

    this.rendered = true;

  }

});

module.exports = CollectionView;