var investmentsAPI = require('../../../services/investments.coffee');
var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');

var HoldingsViewModel = ViewModel.extend({

  initialize: function(params) {

    this.portfolioId = params.portfolioId || null;
    this.holdings = [];

    this._super();

  },

  refresh: function() {

    this.fire('prefresh');

    var that = this;

    if (this.portfolioId) {

      investmentsAPI.holdings(this.portfolioId).then(function (data) {

        that.holdings = _.sortBy(_.filter(data, function(holding) {
          return holding.marketValue !== 0 && holding.marketValue;
        }), function(holding) {
          return holding.security.symbol;

        });

        ViewModel.prototype.refresh.call(that);

      }, function () {
        console.log('Error');
      });

    } else {

      this.holdings = [];

      ViewModel.prototype.refresh.call(that);

    }

  }

});

module.exports = HoldingsViewModel;