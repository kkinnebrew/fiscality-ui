var View = require('../common/view');

var HomeView = View.extend({

  initialize: function() {

    this._super.apply(this, arguments);

    console.log('Initialize: HomeView');

  },

  renderSubviews: function() {

    for (var name in this.$registrations) {

      var view = this.$registrations[name];

      if (this.$subviews.hasOwnProperty(name)) {

        this.$subviews[name].addClass('hidden');

        view.render(this.$subviews[name]);

        setTimeout(function() {
          this.$subviews[name].removeClass('hidden');
        }, 0);

      }

    }

  }

});

module.exports = HomeView;