var React = require('react');

var InvestmentsToolbar = React.createClass({

  render: function() {
    return (
      <div className="toolbar">
        <div className="menu-button"></div>
        <h2 className="label">Bank of America Brokerage</h2>
        <div className="trade-button">Trade</div>
        <div className="info">
          <div className="balance">$139,301.23</div>
          <div className="updated">Last Updated May 8, 2015</div>
        </div>
      </div>
    )
  }

});

module.exports = InvestmentsToolbar;