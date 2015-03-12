var View = require('../../../common/view');
var $ = require('jquery');

function AccountsView() {

  View.prototype.constructor.apply(this, arguments);

  this.code = 'accounts';

}

AccountsView.prototype = new View();

AccountsView.prototype.constructor = AccountsView;

module.exports = AccountsView;

