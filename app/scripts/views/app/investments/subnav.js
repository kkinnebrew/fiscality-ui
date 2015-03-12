var View = require('../../../common/view');
var $ = require('jquery');

function InvestmentsView() {

  View.prototype.constructor.apply(this, arguments);

  this.code = 'investments';

}

InvestmentsView.prototype = new View();

InvestmentsView.prototype.constructor = InvestmentsView;

module.exports = InvestmentsView;

