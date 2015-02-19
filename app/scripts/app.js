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

  console.log('binding');

  var states = {
    'home': {
      abstract: true,
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
      template: require('../templates/app.html')
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
          console.log(1);
          output = $('<div></div>').html(template);
        } else {
          var outlet = $(output).find('[ui-view]');
          outlet.html(template);
          outlet.removeAttr('ui-view');
        }
      }
    }

    if (states.hasOwnProperty(key) && states[key].abstract) {
      redirectToDefault();
    }

    $('[ui-view]').empty().append(output);

  }

  var route;

  $(window).on('hashchange', function() {

    route = location.hash;
    console.log(route);

    renderPage(route);

  });

  if (!location.hash) {
    redirectToDefault();
  } else {
    route = location.hash;
    renderPage(route);
  }

})(window);