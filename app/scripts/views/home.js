var View = require('../common/clementine').View;

var HomeView = View.extend({

  initialize: function() {

    this._super.apply(this, arguments);

    console.log('Initialize: HomeView');

  },

  renderSubview: function(view) {

    var that = this;

    console.log('Rendering subview');

    this.$subview.addClass('hidden');

    this._super(view);

    setTimeout(function() {
      that.$subview.removeClass('hidden');
    }, 0);

  }

});

module.exports = HomeView;