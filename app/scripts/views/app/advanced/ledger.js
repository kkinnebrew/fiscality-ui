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

    this.$target.on('keydown', '.text-field', function(e) {
      var code = e.keyCode || e.which;
      var isShift = e.shiftKey ? true : false;
      if (code === 9) {
        e.preventDefault();
        that.$target.find('.focused').removeClass('focused');
        var cell = $(this).closest('.table-cell');
        var next = isShift ? cell.prev('.table-cell') : cell.next('.table-cell');
        if (next.length && next.find('.text-field').length) {
          next.addClass('focused');
          next.find('.text-field').focus();
        } else {
          var line = isShift ? $(this).closest('.table-row').prev() : $(this).closest('.table-row').next();
          var first = null;
          if (!line.length) {
            var transaction = isShift ? $(this).closest('.transaction').prev() : $(this).closest('.transaction').next();
            if (!transaction.length) return;
            first = isShift ? transaction.find('.text-field:last') : transaction.find('.text-field:first');
            first.closest('.table-cell').addClass('focused');
            first.focus();
          } else {
            if (line.hasClass('transaction-line') || line.hasClass('transaction-header')) {
              first = isShift ? line.find('.text-field:last') : line.find('.text-field:first');
              first.closest('.table-cell').addClass('focused');
              first.focus();
            }
          }
        }
      }
    });

  },

  unbind: function() {

    this._super();

    this.$target.on('click').off();

  }

});

module.exports = LedgerView;