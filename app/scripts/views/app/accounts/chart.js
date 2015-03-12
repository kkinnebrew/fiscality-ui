var View = require('../../../common/view');
var $ = require('jquery');

function ChartView() {

  View.prototype.constructor.apply(this, arguments);

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

module.exports = ChartView;

