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

HandlebarsCompiler.registerHelper 'select', (value, options) ->
  $el = $('<select />').html(options.fn(this))
  $el.find('[value="' + value + '"]').attr({'selected': 'selected'})
  return $el.html()

HandlebarsCompiler.registerHelper 'ifCond', (v1, v2, options) ->
  if v1 == v2
    return options.fn(this)
  return options.inverse(this)

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
      name: 'navigation'
      react: true
      view: require('./views/app1/navigation.jsx')
})

router.register('app.accounts', {
  params: ['accountId']
  views:
    'content':
      name: 'banking'
      react: true
      view: require('./views/app1/banking.jsx')
})

router.register('app.investments', {
  params: ['portfolioId']
  views:
    'content':
      name: 'investments'
      react: true
      view: require('./views/app1/investments.jsx')
})

router.register('app.settings', {
  views:
    'content':
      template: require('../templates/app/settings.hbs')
})

# run

$(document).ready(-> router.listen())