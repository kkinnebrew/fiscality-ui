ViewModel = require('../../common/viewmodel.coffee')
investmentsService = require('../../services/investments.coffee')
Log = require('../../common/log.coffee')
$ = require('jquery')
_ = require('underscore')

numberWithCommas = (x) ->
  parts = x.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  parts.join(".")

class InvestmentsViewModel extends ViewModel

  constructor: (params) ->

    super

    @portfolioId = params.portfolioId || null
    @portfolios = []
    @portfolio = null
    @balance = 0
    @holdings = []

    # make service calls

    if !@portfolioId
      @getPortfolios().then () =>
        if @portfolios && @portfolios.length > 0
          @portfolioId = @portfolios[0].portfolioId
          @update()
    else
      @update()

  update: () ->

    portfolioRequest = investmentsService.portfolio(@portfolioId)
    balanceRequest = investmentsService.balance(@portfolioId)

    $.when(portfolioRequest, balanceRequest).then((portfolio, balance) =>
      @portfolio = portfolio
      @balance = balance
      @fire('refresh', { portfolio: portfolio, balance: numberWithCommas(balance) })
    )

    holdingsRequest = investmentsService.holdings(@portfolioId)

    map = (holding) =>
      symbol: if holding.security then holding.security.symbol else ''
      name: if holding.security then holding.security.name else ''
      price: holding.price
      priceChange: holding.dayValueChange
      priceChangePercentage: holding.dayPercentageChange
      quantity: 0
      marketValue: holding.marketValue
      marketChange: holding.marketValueChange
      marketChangePercentage: holding.dayPercentageChange
      gainLoss: holding.unrealizedGainLoss
      gainLossPercentage: 0

    filter = (holding) =>
      return holding.marketValue > 0

    $.when(holdingsRequest).then (holdings) =>
      @holdings = _.sortBy(_.map(_.filter(holdings, filter), map), 'symbol')
      @fire('refresh', holdings: @holdings)
    , () ->
      console.log('Error fetching holdings')

  getPortfolios: () ->

    return investmentsService.portfolios().then (data) =>
      @portfolios = data
      @fire('refresh', { portfolios: data })
    , ->
      Log.error('Error fetching accounts')

  setPortfolio: (portfolioId) ->

    @router.goto('app.investments', {
      portfolioId: portfolioId
    })

module.exports = InvestmentsViewModel