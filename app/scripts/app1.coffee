# globals

$ = window.jQuery = require('jquery')

# preloads

require('jquery-circle-progress')
require('datejs')

# imports

Router = require('./common1/router.coffee')
cache = require('./common/cache')
HandlebarsCompiler = require('hbsfy/runtime')

# setup router

router = new Router($('body'))
window.App = router

# registrations

router.register('home', {
  redirect: '/home/login',
  template: require('../templates1/home.hbs')
})

router.register('home.login', {
  template: require('../templates1/home/login.hbs')
  viewmodel: require('./viewmodels1/home/login.coffee')
})

router.register('home.register', {
  template: require('../templates1/home/register.hbs')
  viewmodel: require('./viewmodels1/home/register.coffee')
})

router.register('home.forgot', {
  template: require('../templates1/home/forgot.hbs')
  viewmodel: require('./viewmodels1/home/forgot.coffee')
})

router.register('home.reset', {
  template: require('../templates1/home/reset.hbs')
  viewmodel: require('./viewmodels1/home/reset.coffee')
})

router.register('app', {
  redirect: '/app/accounts',
  views:
    'default':
      primary: true
      template: require('../templates1/app.hbs')
    'menu@default':
      template: require('../templates1/app/menu.hbs')
      view: require('./views1/app/menu.coffee')
      viewmodel: require('./viewmodels1/app/menu.coffee')
})

router.register('app.accounts', {
  presenter: require('./presenters1/app/accounts/accounts.coffee')
  params: ['accountId']
  views:
    'content':
      template: require('../templates1/app/accounts.hbs')
    'chart@content':
      present: 'chart'
      template: require('../templates1/app/accounts/chart.hbs')
      viewmodel: require('./viewmodels1/app/accounts/chart.coffee')
    'transactions@content':
      present: 'transactions'
      template: require('../templates1/app/accounts/transactions.hbs')
      viewmodel: require('./viewmodels1/app/accounts/transactions.coffee')
    'overlay@global':
      present: 'overlay'
      template: require('../templates1/app/accounts/overlay.hbs')
      view: require('./views1/app/accounts/overlay.coffee')
      viewmodel: require('./viewmodels1/app/accounts/overlay.coffee')
})

router.register('app.investments', {
  redirect: '/app/investments/portfolioId/positions'
  presenter: require('./presenters1/app/investments/investments.coffee')
  params: ['portfolioId']
  views:
    'content':
      primary: true
      present: 'investments'
      template: require('../templates1/app/investments.hbs')
      viewmodel: require('./viewmodels1/app/investments/investments.coffee')
    'overlay@global':
      present: 'overlay'
      template: require('../templates1/app/investments/overlay.hbs')
      viewmodel: require('./viewmodels1/app/investments/overlay.coffee')
})

router.register('app.investments.positions', {
  views:
    'investments':
      template: require('../templates1/app/investments/positions.hbs')
    'chart@investments':
      template: require('../templates1/app/investments/positions/chart.hbs')
      viewmodel: require('./viewmodels1/app/investments/positions/chart.coffee')
    'positions@investments':
      template: require('../templates1/app/investments/positions/positions.hbs')
      viewmodel: require('./viewmodels1/app/investments/positions/positions.coffee')
})


router.register('app.investments.activity', {
  views:
    'investments':
      template: require('../templates1/app/investments/activity.hbs')
})

router.register('app.investments.performance', {
  views:
    'investments':
      template: require('../templates1/app/investments/performance.hbs')
})

router.register('app.investments.allocation', {
  views:
    'investments':
      template: require('../templates1/app/investments/allocation.hbs')
})

# router.register('app.investments.activity')

# router.register('app.investments.realized')

# router.register('app.investments.allocation')

# router.register('app.settings')

# run

$(document).ready(-> router.listen())