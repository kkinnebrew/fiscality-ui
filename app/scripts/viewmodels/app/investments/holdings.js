var investmentsAPI = require('../../../services/investments.coffee');
var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');
var $ = require('jquery');

var HoldingsViewModel = ViewModel.extend({

  initialize: function(params) {

    this.portfolioId = params.portfolioId || null;
    this.portfolio = null;
    this.holdings = [];

    this._super();

  },

  refresh: function() {

    this.fire('prefresh');

    var that = this;

    if (this.portfolioId) {

      var portfolioRequest = investmentsAPI.portfolio(this.portfolioId);

      var holdingsRequest = investmentsAPI.holdings(this.portfolioId);

      $.when(portfolioRequest, holdingsRequest).then(function (portfolio, data) {

        that.portfolio = portfolio;

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