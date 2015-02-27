var View = require('../common/view');

var AppView = View.extend({

  initialize: function() {

    this._super.apply(this, arguments);

    console.log('Initialize: AppView');

  },



});

module.exports = AppView;