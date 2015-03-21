var View = require('../../../common/view');
var $ = require('jquery');

function TransactionsView() {

  View.prototype.constructor.apply(this, arguments);

  this.viewModel.on('prefresh', $.proxy(this.startLoading, this));

  this.viewModel.on('refresh', $.proxy(this.stopLoading, this));

}

TransactionsView.prototype = new View();

TransactionsView.prototype.constructor = TransactionsView;


TransactionsView.prototype.render = function() {

  View.prototype.render.apply(this, arguments);

  this.startLoading();

};

TransactionsView.prototype.startLoading = function() {

  if (this.loading) return;

  this.loading = true;

  this.$el.css('opacity', 0.5);

};

TransactionsView.prototype.stopLoading = function() {

  if (!this.loading) return;

  this.$el.css('opacity', 1);

  this.loading = false;

};


module.exports = TransactionsView;

