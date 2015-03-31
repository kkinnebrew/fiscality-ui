/**
 * @file app.js
 * @author kkinnebrew
 * @date 2.1.2015
 */

var $ = require('jquery');
var Router = require('./common/router');
var cache = require('./common/cache');
var HandlebarsCompiler = require('hbsfy/runtime');
window.jQuery = $;
require('jquery-circle-progress');
require('datejs');

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

HandlebarsCompiler.registerHelper('currency', function(d, sign) {
  sign = typeof sign === 'string' ? sign : '';
  if (d === undefined || d === null) return '';
  return d >= 0 ? (sign + numberWithCommas(d.toFixed(2))) : ('-' + sign + numberWithCommas(Math.abs(d).toFixed(2)));
});

HandlebarsCompiler.registerHelper('percentage', function(d) {
  if (d === undefined || d === null) return '';
  return (d >= 0 ? (numberWithCommas(d.toFixed(2))) : ('-' + numberWithCommas(Math.abs(d).toFixed(2)))) + '%';
});

HandlebarsCompiler.registerHelper('dateFormat', function(d, f) {
  if (d === undefined || d === null) return '';
  return Date.parse(d).toString(f);
});


var router = new Router($('body'));

router.otherwise('/home/login');

router.register('home', {
  redirect: '/home/login',
  template: require('../templates/home.hbs')
});

router.register('home.login', {
  template: require('../templates/home/login.html'),
  viewModel: require('./viewmodels/home/login')
});

router.register('home.register', {
  template: require('../templates/home/register.html'),
  viewModel: require('./viewmodels/home/register')
});

router.register('home.forgot', {
  template: require('../templates/home/forgot.html'),
  viewModel: require('./viewmodels/home/forgot')
});

router.register('home.reset', {
  template: require('../templates/home/reset.html'),
  viewModel: require('./viewmodels/home/reset')
});

router.register('app', {
  redirect: '/app/accounts',
  template: require('../templates/app.hbs'),
  view: require('./views/app.coffee'),
  viewModel: require('./viewmodels/app')
});

router.register('app.accounts', {
  template: require('../templates/app/accounts/accounts.hbs'),
  viewModel: require('./viewmodels/app/accounts/accounts')
});

router.register('app.account', {
  url: '/app/account/:accountId',
  defaultParams: function() {
    var accountId = cache.getPersistentItem('accountId');
    if (accountId) {
      return {
        'accountId': accountId
      }
    } else {
      return null;
    }
  },
  views: {
    'content': {
      template: require('../templates/app/accounts/content.hbs')
    },
    'chart@content': {
      template: require('../templates/app/accounts/chart.hbs'),
      view: require('./views/app/accounts/chart.coffee'),
      viewModel: require('./viewmodels/app/accounts/chart')
    },
    'transactions@content': {
      template: require('../templates/app/accounts/transactions.hbs'),
      view: require('./views/app/accounts/transactions.coffee'),
      viewModel: require('./viewmodels/app/accounts/transactions')
    }
  }
});

router.register('app.investments', {
  url: '/app/investments/:portfolioId',
  defaultParams: function() {
    var portfolioId = cache.getPersistentItem('portfolioId');
    if (portfolioId) {
      return {
        'portfolioId': portfolioId
      }
    } else {
      return null;
    }
  },
  views: {
    'content': {
      template: require('../templates/app/investments/content.hbs'),
      viewModel: require('./viewmodels/app/investments/holdings')
    }
  }
});

$(document).ready(function() {
  router.listen();
});

window.App = router;