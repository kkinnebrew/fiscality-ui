var investmentsAPI = require('../../../services/investments');
var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');

var PositionsViewModel = ViewModel.extend({

  initialize: function(params) {

    this.portfolioId = params.portfolioId || null;
    this.positions = [];

    this._super();

  },

  refresh: function() {

    this.fire('prefresh');

    var that = this;

    if (this.portfolioId) {

      investmentsAPI.positions(this.portfolioId).then(function (data) {

        that.positions = data;

        ViewModel.prototype.refresh.call(that);

      }, function () {
        console.log('Error');
      });

    } else {

      this.positions = [];

      ViewModel.prototype.refresh.call(that);

    }

  }

});

module.exports = PositionsViewModel;