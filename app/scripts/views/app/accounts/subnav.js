var View = require('../../../common/view');
var $ = require('jquery');

function SubNavView() {

  this.code = 'accounts';

  View.prototype.constructor.apply(this, arguments);

  this.viewModel.on('prefresh', $.proxy(this.startLoading, this));

  this.viewModel.on('refresh', $.proxy(this.stopLoading, this));

}

SubNavView.prototype = new View();

SubNavView.prototype.constructor = SubNavView;

SubNavView.prototype.render = function() {

  View.prototype.render.apply(this, arguments);

  this.startLoading();

};

SubNavView.prototype.startLoading = function() {

  if (this.loading) return;

  this.loading = true;

  this.$el.find('.progress').show().circleProgress({
    value: 1,
    size: 24,
    thickness: 3,
    fill: {
      color: 'rgba(255, 255, 255, 0.5)'
    }
  });

};

SubNavView.prototype.stopLoading = function() {

  if (!this.loading) return;

  this.$el.find('.progress').hide();

  this.loading = false;

};


module.exports = SubNavView;

