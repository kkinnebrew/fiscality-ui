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
    'hello': {
      template: require('../templates/hello.html')
    },
    'hello.test': {
      template: require('../templates/hello.test.html')
    },
    'hello.food': {
      template: require('../templates/hello.food.html')
    },
    'hello.food.old': {
      template: require('../templates/hello.food.old.html')
    },
    'goodbye': {
      template: require('../templates/goodbye.html')
    }
  };


  function renderPage(route) {

    var parts = route.replace('#', '').split('/');

    console.log('URL', parts);

    var output, key;

    for (var i = 0; i < parts.length; i++) {
      if (!key) {
        key = parts[i];
      } else {
        key += '.' + parts[i];
      }
      if (!states.hasOwnProperty(key)) {
        console.error('Missing route: ' + key);
      } else {
        var template = states[key].template;
        if (!output) {
          console.log(1);
          output = $('<div></div>').html(template);
        } else {
          var outlet = $(output).find('[data-outlet]');
          outlet.html(template);
          outlet.removeAttr('data-outlet');
        }
      }
    }

    $('#message').empty().append(output);

  }

  var route;

  $(window).on('hashchange', function() {

    route = location.hash;
    console.log(route);

    renderPage(route);

  });

  if (!location.hash) {
    location.hash = '#hello';
  } else {
    route = location.hash;
    renderPage(route);
  }

})(window);