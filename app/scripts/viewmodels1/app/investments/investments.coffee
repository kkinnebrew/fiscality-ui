ViewModel = require('../../../common1/viewmodel.coffee')

class InvestmentsViewModel extends ViewModel

  constructor: (params) ->

    super

    @portfolioId = params.portfolioId || null

    @portfolio = null

  update: ->

    @startLoading()

    # do service calls

    @stopLoading()

    @fire('refresh')

  setPortfolio: (portfolioId) ->

    @portfolioId = portfolioId

    @update()

  setState: (state) ->

    @router.goto('app.investments.' + state, {
      portfolioId: @portfolioId
    })

module.exports = InvestmentsViewModel
