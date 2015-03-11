/**
 * @file app.js
 * @author kkinnebrew
 * @date 2.1.2015
 */

var $ = require('jquery');
var Router = require('./common/router1');

var router = new Router($('body'));

//router.registerDefault('/app/accounts');
//
//router.register404({
//  template: require('../templates/404.hbs')
//});

router.otherwise('/home/login');

router.register('home', {
  abstract: true,
  redirect: 'home/login',
  template: require('../templates/home.hbs')
});

router.register('home.login', {
  template: require('../templates/home/login.html')
});

router.register('app', {
  abstract: true,
  redirect: 'app/accounts',
  template: require('../templates/app.hbs'),
  view: require('./views/app.js')
});

router.register('app.accounts', {
  views: {
    'subnav': {
      template: require('../templates/app/accounts/subnav.hbs')
    },
    'content': {
      template: require('../templates/app/accounts/content.hbs')
    }
    //'chart@content': {
    //  template: require('../templates/app/accounts/chart.hbs'),
    //  view: require('./views/app/accounts/chart')
    //},
    //'transactions@content': {
    //  template: require('../templates/app/accounts/transactions.hbs'),
    //  view: require('./views/app/accounts/transactions')
    //}
  }
});

router.register('app.investments', {
  views: {
    'subnav': {
      template: require('../templates/app/investments/subnav.hbs')
    },
    'content': {
      template: require('../templates/app/investments/content.hbs')
    }
  }
});

//router.register('app', {
//  abstract: true,
//  url: '/app',
//  redirect: 'app/accounts',
//  template: require('../templates/app.hbs'),
//  view: require('./views/app')
//});
//
//router.register('app.accounts', {
//  url: '/app/accounts/:accountId',
//  views: {
//    'subnav': {
//      template: require('../templates/app/accounts/subnav.hbs')
//    },
//    'content': {
//      template: require('../templates/app/accounts/content.hbs')
//    },
//    'chart@content': {
//      template: require('../templates/app/accounts/chart.hbs'),
//      view: require('./views/app/accounts/chart')
//      //viewModel: function(accountId) {
//      //  var ViewModel = require('viewmodels/app/accounts/chart');
//      //  return new ViewModel(accountId);
//      //}
//    },
//    'transactions@content': {
//      template: require('../templates/app/accounts/transactions.hbs'),
//      view: require('./views/app/accounts/transactions')
//      //viewModel: function(accountId) {
//      //  var ViewModel = require('viewmodels/app/accounts/transactions');
//      //  return new ViewModel(accountId);
//      //}
//    }
//  }
//});
//



$(document).ready(function() {
  router.listen();
});

//var View = require('./common/view');
//var ViewModel = require('./common/clementine').ViewModel;
//var Controller = require('./common/clementine').Controller;
//
//(function(window) {
//
//  // exit if the browser implements that event
//  if ( "onhashchange" in window.document.body ) { return; }
//
//  var location = window.location,
//    oldURL = location.href,
//    oldHash = location.hash;
//
//  // check the location hash on a 100ms interval
//  setInterval(function() {
//    var newURL = location.href,
//      newHash = location.hash;
//
//    // if the hash has changed and a handler has been bound...
//    if ( newHash != oldHash && typeof window.onhashchange === "function" ) {
//      // execute the handler
//      window.onhashchange({
//        type: "hashchange",
//        oldURL: oldURL,
//        newURL: newURL
//      });
//
//      oldURL = newURL;
//      oldHash = newHash;
//    }
//  }, 100);
//
//})(window);
//
//(function(window) {
//
//  var states = {
//    'home': {
//      abstract: true,
//      redirect: 'home/login',
//      template: require('../templates/home.html'),
//      view: require('./views/home')
//    },
//    'home.login': {
//      template: require('../templates/home/login.html'),
//      viewModel: require('./viewmodels/home/login')
//    },
//    'home.register': {
//      template: require('../templates/home/register.html'),
//      viewModel: require('./viewmodels/home/register')
//    },
//    'home.forgot': {
//      template: require('../templates/home/forgot.html'),
//      viewModel: require('./viewmodels/home/forgot')
//    },
//    'home.reset': {
//      template: require('../templates/home/reset.html'),
//      viewModel: require('./viewmodels/home/reset')
//    },
//    'app': {
//      abstract: true,
//      redirect: 'app/accounts',
//      template: require('../templates/app.hbs')
//    },
//    'app.accounts': {
//      views: {
//        subnav: {
//          template: require('../templates/app.hbs')
//        }
//      }
//    }
//  };
//
//  function redirectToDefault() {
//    location.hash = '#/home/login';
//  }
//
//  function renderPage(route) {
//
//    var parts = route.replace('#/', '').split('/');
//
//    if (parts[0].length === 0) parts.shift();
//
//    console.log('URL', parts);
//
//    var rootView, parent = null, vm = null, vw = null, key;
//
//    for (var i = 0; i < parts.length; i++) {
//      if (parts[i] === "") continue;
//      if (!key) {
//        key = parts[i];
//      } else {
//        key += '.' + parts[i];
//      }
//      if (!states.hasOwnProperty(key)) {
//        redirectToDefault();
//      } else {
//        var template = states[key].template;
//        var view = states[key].view || View;
//        var viewModel = states[key].viewModel;
//        if (!parent) {
//          if (viewModel) {
//            vm = new viewModel();
//          }
//          rootView = parent = new view(template, vm);
//          if (viewModel) {
//            new Controller(vm, parent);
//          }
//        } else {
//          if (viewModel) {
//            vm = new viewModel();
//          }
//          vw = new view(template, vm);
//          if (viewModel) {
//            new Controller(vm, vw);
//          }
//          parent.registerSubview(vw);
//          parent = vw;
//        }
//      }
//    }
//
//
//    if (states.hasOwnProperty(key) && states[key].abstract) {
//      if (states[key].redirect) {
//        location.hash = '#/' + states[key].redirect;
//      } else {
//        redirectToDefault();
//      }
//    }
//    $('#app').empty();
//    rootView.render($('#app'));
//
//  }
//
//  var route;
//
//  $(window).on('hashchange', function() {
//
//    route = location.hash;
//
//    renderPage(route);
//
//  });
//
//  if (!location.hash) {
//    redirectToDefault();
//  } else {
//    route = location.hash;
//    renderPage(route);
//  }
//
//})(window);