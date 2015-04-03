ViewModel = require('../../../common1/viewmodel.coffee')
investmentsService = require('../../../services/investments.coffee')
Log = require('../../../common1/log.coffee')

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
      console.log(portfolio)
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
