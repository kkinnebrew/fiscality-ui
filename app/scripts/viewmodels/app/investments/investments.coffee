ViewModel = require('../../../common/viewmodel.coffee')
investmentsService = require('../../../services/investments.coffee')
Log = require('../../../common/log.coffee')

class InvestmentsViewModel extends ViewModel

  constructor: (params) ->

    super

    @portfolioId = params.portfolioId || null

    @portfolio = null

    @update()

  update: ->

    return if !@portfolioId

    investmentsService.portfolio(@portfolioId).then (portfolio) =>
      @portfolio = portfolio
      @fire('refresh')
    , ->
      Log.error('Error loading portfolio')

  setPortfolio: (portfolioId) ->

    @portfolioId = portfolioId

    @fire('select', portfolioId)

  setState: (state) ->

    @router.goto('app.investments.' + state, {
      portfolioId: @portfolioId
    })

  choose: ->

    @fire('choose')

module.exports = InvestmentsViewModel

#
#var investmentsAPI = require('../../../services/investments.coffee');
#var ViewModel = require('../../../common/viewmodel');
#var _ = require('underscore');
#var $ = require('jquery');
#
#var HoldingsViewModel = ViewModel.extend({
#
#    initialize: function(params) {
#
#      this.portfolioId = params.portfolioId || null;
#  this.portfolio = null;
#  this.balance = null;
#  this.holdings = [];
#
#  this._super();
#
#},
#
#refresh: function() {
#
#  this.fire('prefresh');
#
#var that = this;
#
#if (this.portfolioId) {
#
#var portfolioRequest = investmentsAPI.portfolio(this.portfolioId);
#
#  var balanceRequest = investmentsAPI.balance(this.portfolioId);
#
#  var holdingsRequest = investmentsAPI.holdings(this.portfolioId);
#
#  $.when(portfolioRequest, balanceRequest, holdingsRequest).then(function (portfolio, balance, data) {
#
#  that.portfolio = portfolio;
#
#  that.balance = _.reduce(data, function(memo, item) {
#  return memo + item.marketValue;
#  }, 0);
#
#  that.holdings = _.sortBy(_.filter(data, function(holding) {
#  return holding.marketValue !== 0 && holding.marketValue;
#  }), function(holding) {
#  return holding.security.symbol;
#
#  });
#
#  ViewModel.prototype.refresh.call(that);
#
#  }, function () {
#  console.log('Error');
#  });
#
#} else {
#
#this.holdings = [];
#
#ViewModel.prototype.refresh.call(that);
#
#}
#
#}
#
#});
#
#module.exports = HoldingsViewModel;