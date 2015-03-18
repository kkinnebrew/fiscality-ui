var View = require('../common/view');
var $ = require('jquery');

function AppView() {

  View.prototype.constructor.apply(this, arguments);

}

AppView.prototype = new View();

AppView.prototype.constructor = AppView;

AppView.prototype.bind = function() {

  var that = this;

  this.$el.on('click', '[data-link]', function() {

    var link = $(this).attr('data-link');
    location.hash = link;

  });

};

AppView.prototype.renderSubview = function(name, view) {

  View.prototype.renderSubview.call(this, name, view);

  if (view.code) {

    this.$el.find('[data-link]').removeClass('active');

    if (view.code === 'investments') {
      this.$el.addClass('investments').removeClass('accounts');
      this.$el.find('.investments').addClass('active');
    } else if (view.code === 'accounts') {
      this.$el.addClass('accounts').removeClass('investments');
      this.$el.find('.accounts').addClass('active');
    }

  }

};

module.exports = AppView;

