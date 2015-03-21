var View = require('../../../common/view');
var $ = require('jquery');

function ChartView() {

  View.prototype.constructor.apply(this, arguments);

  this.viewModel.on('prefresh', $.proxy(this.startLoading, this));

  this.viewModel.on('refresh', $.proxy(this.stopLoading, this));

}

ChartView.prototype = new View();

ChartView.prototype.constructor = ChartView;

ChartView.prototype.bind = function() {

  var that = this;

  this.$el.on('click', '.range-picker-item', function() {
    that.$el.find('.range-picker-item').removeClass('active');
    $(this).addClass('active');
  });


};

ChartView.prototype.render = function() {

  View.prototype.render.apply(this, arguments);

  this.startLoading();

};

ChartView.prototype.startLoading = function() {

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

ChartView.prototype.stopLoading = function() {

  if (!this.loading) return;

  this.$el.find('.progress').hide();

  this.loading = false;

};


module.exports = ChartView;

