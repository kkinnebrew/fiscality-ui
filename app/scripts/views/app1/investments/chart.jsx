var React = require('react');

var InvestmentsChart = React.createClass({

  render: function() {
    return (
      <div id="investments-chart">
        <div className="controls">
          <ul className="views">
            <li className="view-option selected">Performance</li>
            <li className="view-option">Return</li>
          </ul>
          <ul className="date-range">
            <li className="date-range-option">1M</li>
            <li className="date-range-option">2M</li>
            <li className="date-range-option selected">3M</li>
            <li className="date-range-option">6M</li>
            <li className="date-range-option">1Y</li>
            <li className="date-range-option">3Y</li>
            <li className="date-range-option">5Y</li>
            <li className="date-range-option">All</li>
          </ul>
        </div>
        <div className="chart"></div>
      </div>
    )
  }

});

module.exports = InvestmentsChart;