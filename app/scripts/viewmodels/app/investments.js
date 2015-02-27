var ViewModel = require('../../common/clementine').ViewModel;

var InvestmentsViewModel = ViewModel.extend({

  initialize: function() {

    this._super.apply(this, arguments);

    var route = location.hash;
    var parts = route.split('/');

    if (parts.length > 3) {
      this.state = parts[3];
    } else {
      this.state = null;
    }

    this.isPositions = this.state === 'positions';
    this.isActivity = this.state === 'activity';

  }

});

module.exports = InvestmentsViewModel;