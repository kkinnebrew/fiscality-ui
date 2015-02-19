/**
 * @file app.js
 * @author kkinnebrew
 * @date 2.1.2015
 */

var $ = require('jquery');

(function(window) {

  // exit if the browser implements that event
  if ( "onhashchange" in window.document.body ) { return; }

  var location = window.location,
    oldURL = location.href,
    oldHash = location.hash;

  // check the location hash on a 100ms interval
  setInterval(function() {
    var newURL = location.href,
      newHash = location.hash;

    // if the hash has changed and a handler has been bound...
    if ( newHash != oldHash && typeof window.onhashchange === "function" ) {
      // execute the handler
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      });

      oldURL = newURL;
      oldHash = newHash;
    }
  }, 100);

})(window);

(function(window) {

  var states = {
    'home': {
      abstract: true,
      redirect: 'home/login',
      template: require('../templates/home.html')
    },
    'home.login': {
      template: require('../templates/home/login.html')
    },
    'home.register': {
      template: require('../templates/home/register.html')
    },
    'home.forgot': {
      abstract: true,
      redirect: 'home/forgot/form',
      template: require('../templates/home/forgot.html')
    },
    'home.forgot.form': {
      template: require('../templates/home/forgot.form.html')
    },
    'home.forgot.error': {
      template: require('../templates/home/forgot.error.html')
    },
    'home.reset': {
      abstract: true,
      redirect: 'home/reset/form',
      template: require('../templates/home/reset.html')
    },
    'home.reset.form': {
      template: require('../templates/home/reset.form.html')
    },
    'home.reset.error': {
      template: require('../templates/home/reset.error.html')
    },
    'app': {
      abstract: true,
      redirect: 'app/accounts/banking',
      template: require('../templates/app.html')
    },
    'app.accounts': {
      abstract: true,
      redirect: 'app/accounts/banking',
      template: require('../templates/app/accounts.html')
    },
    'app.accounts.banking': {
      template: require('../templates/app/accounts/banking.html')
    },
    'app.accounts.credit': {
      template: require('../templates/app/accounts/credit.html')
    },
    'app.investments': {
      abstract: true,
      redirect: 'app/investments/positions',
      template: require('../templates/app/investments.html')
    },
    'app.investments.positions': {
      template: require('../templates/app/investments/positions.html')
    },
    'app.investments.activity': {
      template: require('../templates/app/investments/activity.html')
    },
    'app.advanced': {
      abstract: true,
      redirect: 'app/advanced/ledger',
      template: require('../templates/app/advanced.html')
    },
    'app.advanced.ledger': {
      template: require('../templates/app/advanced/ledger.html')
    },
    'app.advanced.balance': {
      template: require('../templates/app/advanced/balance.html')
    }

  };

  function redirectToDefault() {
    location.hash = '#/home/login';
  };

  function renderPage(route) {

    var parts = route.replace('#/', '').split('/');

    if (parts[0].length === 0) parts.shift();

    console.log('URL', parts);

    var output, key;

    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === "") continue;
      if (!key) {
        key = parts[i];
      } else {
        key += '.' + parts[i];
      }
      if (!states.hasOwnProperty(key)) {
        redirectToDefault();
      } else {
        var template = states[key].template;
        if (!output) {
          output = $('<div></div>').html(template);
        } else {
          var outlet = $(output).find('[ui-view]');
          outlet.html(template);
          outlet.removeAttr('ui-view');
        }
      }
    }

    
    if (states.hasOwnProperty(key) && states[key].abstract) {
      if (states[key].redirect) {
        location.hash = '#/' + states[key].redirect;
      } else {
        redirectToDefault();
      }
    }

    $('[ui-view]').empty().append(output);

  }

  var route;

  $(window).on('hashchange', function() {

    route = location.hash;

    renderPage(route);

  });

  if (!location.hash) {
    redirectToDefault();
  } else {
    route = location.hash;
    renderPage(route);
  }

})(window);