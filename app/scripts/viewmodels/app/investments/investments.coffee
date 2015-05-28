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

    @startLoading()

    investmentsService.portfolio(@portfolioId).then (portfolio) =>
      @portfolio = portfolio
      @stopLoading()
      @fire('refresh')
    , =>
      @stopLoading
      Log.error('Error loading portfolio')

  setPortfolio: (portfolioId) ->

    @portfolioId = portfolioId

    @update()

  setState: (state) ->

    # TODO: handle this
    @router.goto('app.investments.' + state, {
      portfolioId: @portfolioId
    })

  choose: ->

    @fire('choose')

module.exports = InvestmentsViewModel