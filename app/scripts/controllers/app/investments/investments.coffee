Controller = require('../../../common/controller.coffee')

class InvestmentsController extends Controller

  constructor: (params) ->

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

  setPortfolio: (portfolioId) ->

    @investmentsViewModel.setPortfolio(portfolioId)
    @portfoliosViewModel.setPortfolio(portfolioId)

  selectPortfolio: (portfolioId) =>

    @investmentsViewModel.setPortfolio(portfolioId)
    @hideOverlay()

    @router.goto('app.investments.positions', {
      portfolioId: portfolioId
    })

  showOverlay: =>

    @portfoliosViewModel.overlayed = true
    @router.renderGlobal('portfolios')

  showFullOverlay: =>

    @portfoliosViewModel.overlayed = false
    @router.renderGlobal('portfolios')

  hideOverlay: =>

    @router.destroyGlobal('portfolios')

module.exports = InvestmentsController