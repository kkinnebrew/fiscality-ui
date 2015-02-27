var View = require('../../../common/view');
var $ = require('jquery');

var LedgerView = View.extend({

  bind: function() {

    var that = this;

    this._super();

    this.$target.on('click', function(e) {
      e.stopPropagation();
      that.$target.find('.focused').removeClass('focused');
    });

    this.$target.on('click', '.text-field', function(e) {
      e.stopPropagation();
      console.log('123');
      var cell = $(this).closest('.table-cell');
      that.$target.find('.focused').removeClass('focused');
      cell.addClass('focused');
    });

  },

  unbind: function() {

    this._super();



  }

});

module.exports = LedgerView;