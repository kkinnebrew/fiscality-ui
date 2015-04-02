Presenter = require('../../../common1/presenter.coffee')

class InvestmentsPresenter extends Presenter

  constructor: (params, @portfoliosViewModel, @overlayViewModel) ->

    @portfolioId = params.portfolioId || null

  load: ->

    @showOverlay() if !@portfolioId

  update: ->

    @showOverlay() if !@portfolioId

  bind: ->

    @portfoliosViewModel.on('choose', @showOverlay)
    @overlayViewModel.on('close', @hideOverlay)
    @overlayViewModel.on('select', @selectPortfolio)

  setPortfolio: (portfolioId) ->

    @portfoliosViewModel.setPortfolio(portfolioId)

  selectPortfolio: (portfolioId) ->

    @setPortfolio(portfolioId)
    @hideOverlay()

    @router.replaceParam('portfolioId', portfolioId)

  showOverlay: ->

    @router.renderGlobal('portfolios')

  hideOverlay: ->

    @router.destroyGlobal('portfolios')

module.exports = InvestmentsPresenter