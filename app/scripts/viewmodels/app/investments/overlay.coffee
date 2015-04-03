ViewModel = require('../../../common/viewmodel.coffee')
investmentsService = require('../../../services/investments.coffee')
Log = require('../../../common/log.coffee')

class OverlayViewModel extends ViewModel

  constructor: (params) ->

    super

    @portfolios = []

    @startLoading()

    # do service calls

    investmentsService.portfolios().then (data) =>
      @stopLoading()
      @portfolios = data
      @update()
    , ->
      @stopLoading()
      Log.error('Error fetching portfolios')

  update: ->

    @fire('refresh')

  setPortfolio: (portfolioId) ->

    @close if @portfolioId == portfolioId

    @portfolioId = portfolioId

    @fire('select', portfolioId)

  setState: (state) ->

    @router.goto('app.investments.' + state, {
      portfolioId: @portfolioId
    })

  close: ->

    @fire('close')

module.exports = OverlayViewModel
