Presenter = require('../../../common1/presenter.coffee')

class InvestmentsPresenter extends Presenter

  constructor: (params, @investmentsViewModel, @overlayViewModel) ->

    @portfolioId = params.portfolioId || null

    @showOverlay if !@portfolioId

  bind: ->

    @investmentsViewModel.on('choose', @showOverlay)
    @overlayViewModel.on('close', @hideOverlay)
    @overlayViewModel.on('select', @selectPortfolio)

  setPortfolio: (portfolioId) ->

    @investmentsViewModel.setPortfolio(portfolioId)

  selectPortfolio: (portfolioId) ->

    @setPortfolio(portfolioId)
    @hideOverlay()

    @router.replaceParam('portfolioId', portfolioId)

  showOverlay: ->

    @router.renderGlobal('portfolios', @overlayViewModel)

  hideOverlay: ->

    @router.destroyGlobal('portfolios')

module.exports = InvestmentsPresenter