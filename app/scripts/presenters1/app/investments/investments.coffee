Presenter = require('../../../common1/presenter.coffee')

class InvestmentsPresenter extends Presenter

  constructor: (params) ->

    console.log(123)

    @investmentsViewModel = null
    @portfoliosViewModel = null

    @portfolioId = params.portfolioId || null

  load: ->

    @showFullOverlay() if !@portfolioId

    @investmentsViewModel.on('choose', @showOverlay)
    @portfoliosViewModel.on('close', @hideOverlay)
    @portfoliosViewModel.on('select', @selectPortfolio)

  update: ->

    @showFullOverlay() if !@portfolioId

  bind: ->

  setPortfolio: (portfolioId) ->

    @investmentsViewModel.setPortfolio(portfolioId)
    @portfoliosViewModel.setPortfolio(portfolioId)

  selectPortfolio: (portfolioId) ->

    @setPortfolio(portfolioId)
    @hideOverlay()

    @router.replaceParam('portfolioId', portfolioId)

  showOverlay: =>

    console.log('arg')

    @portfoliosViewModel.overlayed = true
    @router.renderGlobal('portfolios')

  showFullOverlay: =>

    console.log('arg1')

    @portfoliosViewModel.overlayed = false
    @router.renderGlobal('portfolios')

  hideOverlay: =>

    @router.destroyGlobal('portfolios')

module.exports = InvestmentsPresenter