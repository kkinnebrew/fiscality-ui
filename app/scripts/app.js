/**
 * @file app.js
 * @author kkinnebrew
 * @date 2.1.2015
 */

var $ = require('jquery');
var Router = require('./common/router');

var router = new Router($('body'));

router.otherwise('/app/accounts');

router.register('home', {
  redirect: '/home/login',
  template: require('../templates/home.hbs')
});

router.register('home.login', {
  template: require('../templates/home/login.html')
});

router.register('app', {
  redirect: '/app/accounts',
  template: require('../templates/app.hbs'),
  view: require('./views/app.js')
});

router.register('app.accounts', {
  url: '/app/accounts/:accountId',
  views: {
    'subnav': {
      template: require('../templates/app/accounts/subnav.hbs'),
      view: require('./views/app/accounts/subnav'),
      viewModel: require('./viewmodels/app/accounts/subnav')
    },
    'content': {
      template: require('../templates/app/accounts/content.hbs')
    },
    'chart@content': {
      template: require('../templates/app/accounts/chart.hbs'),
      view: require('./views/app/accounts/chart'),
      viewModel: require('./viewmodels/app/accounts/chart')
    },
    'transactions@content': {
      template: require('../templates/app/accounts/transactions.hbs')
      //view: require('./views/app/accounts/transactions')
    }
  }
});

router.register('app.investments', {
  views: {
    'subnav': {
      template: require('../templates/app/investments/subnav.hbs'),
      view: require('./views/app/investments/subnav')
    },
    'content': {
      template: require('../templates/app/investments/content.hbs')
    }
  }
});

$(document).ready(function() {
  router.listen();
});