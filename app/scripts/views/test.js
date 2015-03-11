var View = require('../common/view1');
var $ = require('jquery');

function TestView() {

  View.prototype.constructor.apply(this, arguments);

}

TestView.prototype = new View();

TestView.prototype.constructor = TestView;

TestView.prototype.bind = function() {

  this.$el.on('click', '[data-link]', function() {

    console.log('ARGGGG');

  });

};

module.exports = TestView;

