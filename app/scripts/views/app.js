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

    that.$el.find('[data-link]').removeClass('active');
    var link = $(this).attr('data-link');
    $(this).addClass('active');
    location.hash = link;

  });

};

AppView.prototype.renderSubview = function(name, view) {

  View.prototype.renderSubview.call(this, name, view);

  if (view.code) {

    if (view.code === 'investments') {
      this.$el.addClass('investments').removeClass('accounts');
    } else if (view.code === 'accounts') {
      this.$el.addClass('accounts').removeClass('investments');
    }

  }

};

module.exports = AppView;

