# globals

$ = window.jQuery = require('jquery')

# preloads

require('jquery-circle-progress')
require('datejs')

# imports

Router = require('./common/router.coffee')
cache = require('./common/cache')
HandlebarsCompiler = require('hbsfy/runtime')

# helpers

numberWithCommas = (x) ->
  parts = x.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")

HandlebarsCompiler.registerHelper 'currency', (d, sign) ->
  sign = if typeof sign == 'string' then sign else ''
  return '' if d == undefined or d == null
  return if d >= 0 then (sign + numberWithCommas(d.toFixed(2))) else ('-' + sign + numberWithCommas(Math.abs(d).toFixed(2)))

HandlebarsCompiler.registerHelper 'percentage', (d) ->
  return '' if d == undefined or d == null
  return if d >= 0 then (numberWithCommas(d.toFixed(2))) else '-' + numberWithCommas(Math.abs(d).toFixed(2)) + '%'

HandlebarsCompiler.registerHelper 'dateFormat', (d, f) ->
  return '' if d == undefined or d == null
  return Date.parse(d).toString(f)

# setup router

router = new Router($('body'))
window.App = router

# registrations

router.otherwise('/home/login')

router.register('home', {
  redirect: '/home/login',
  template: require('../templates/home.hbs')
})

router.register('home.login', {
  template: require('../templates/home/login.hbs')
  viewmodel: require('./viewmodels/home/login.coffee')
})

router.register('home.register', {
  template: require('../templates/home/register.hbs')
  viewmodel: require('./viewmodels/home/register.coffee')
})

router.register('home.forgot', {
  template: require('../templates/home/forgot.hbs')
  viewmodel: require('./viewmodels/home/forgot.coffee')
})

router.register('home.reset', {
  template: require('../templates/home/reset.hbs')
  viewmodel: require('./viewmodels/home/reset.coffee')
})

router.register('app', {
  redirect: '/app/accounts',
  views:
    'default':
      primary: true
      template: require('../templates/app.hbs')
    'menu@default':
      template: require('../templates/app/menu.hbs')
      view: require('./views/app/menu.coffee')
      viewmodel: require('./viewmodels/app/menu.coffee')
})

router.register('app.accounts', {
  presenter: require('./presenters/app/accounts/accounts.coffee')
  params: ['accountId']
  views:
    'content':
      template: require('../templates/app/accounts.hbs')
    'chart@content':
      present: 'chart'
      template: require('../templates/app/accounts/chart.hbs')
      view: require('./views/app/accounts/chart.coffee')
      viewmodel: require('./viewmodels/app/accounts/chart.coffee')
    'transactions@content':
      present: 'transactions'
      template: require('../templates/app/accounts/transactions.hbs')
      view: require('./views/app/accounts/transactions.coffee')
      viewmodel: require('./viewmodels/app/accounts/transactions.coffee')
    'accounts@global':
      present: 'accounts'
      template: require('../templates/app/accounts/overlay.hbs')
      view: require('./views/app/accounts/overlay.coffee')
      viewmodel: require('./viewmodels/app/accounts/overlay.coffee')
})

router.register('app.investments', {
  presenter: require('./presenters/app/investments/investments.coffee')
  params: ['portfolioId']
  views:
    'content':
      primary: true
      present: 'investments'
      template: require('../templates/app/investments.hbs')
      viewmodel: require('./viewmodels/app/investments/investments.coffee')
    'portfolios@global':
      present: 'portfolios'
      template: require('../templates/app/investments/overlay.hbs')
      view: require('./views/app/investments/overlay.coffee')
      viewmodel: require('./viewmodels/app/investments/overlay.coffee')
})

router.register('app.investments.positions', {
  views:
    'investments':
      template: require('../templates/app/investments/positions.hbs')
    'chart@investments':
      template: require('../templates/app/investments/positions/chart.hbs')
      viewmodel: require('./viewmodels/app/investments/positions/chart.coffee')
    'positions@investments':
      template: require('../templates/app/investments/positions/positions.hbs')
      viewmodel: require('./viewmodels/app/investments/positions/positions.coffee')
})


router.register('app.investments.activity', {
  views:
    'investments':
      template: require('../templates/app/investments/activity.hbs')
})

router.register('app.investments.performance', {
  views:
    'investments':
      template: require('../templates/app/investments/performance.hbs')
})

router.register('app.investments.allocation', {
  views:
    'investments':
      template: require('../templates/app/investments/allocation.hbs')
})

router.register('app.settings', {
  views:
    'content':
      template: require('../templates/app/settings.hbs')
})

# run

$(document).ready(-> router.listen())