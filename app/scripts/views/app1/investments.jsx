var React = require('react');
var InvestmentsToolbar = require('./investments/toolbar.jsx');
var InvestmentsChart = require('./investments/chart.jsx');
var HoldingsTable = require('./investments/holdings-table.jsx');

var InvestmentsView = React.createClass({

  render: function() {
    return (
      <div id="investments">
        <InvestmentsToolbar />
        <InvestmentsChart />
        <HoldingsTable />
      </div>
    )
  }

});

module.exports = InvestmentsView;