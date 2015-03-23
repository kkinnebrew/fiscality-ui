var investmentsAPI = require('../../../services/investments.coffee');
var ViewModel = require('../../../common/viewmodel');
var _ = require('underscore');

var SubNavViewModel = ViewModel.extend({

  initialize: function(params) {

    var that = this;

    this.portfolios = [];
    this.portfolioId = params.portfolioId || null;

    this.fire('prefresh');

    investmentsAPI.portfolios().then(function(data) {
      that.portfolios = data;
      that.refresh();
    }, function() {
      console.log('Error');
    });

  }

});

module.exports = SubNavViewModel;