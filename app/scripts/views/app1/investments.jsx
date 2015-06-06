var React = require('react');

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