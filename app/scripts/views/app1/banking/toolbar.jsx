var React = require('react');

var BankingToolbar = React.createClass({

  render: function() {
    return (
      <div className="toolbar">
        <div className="menu-button"></div>
        <h2 className="label">Bank of America Checking</h2>
        <div className="add-transaction-button">Add Transaction</div>
        <div className="info">
          <div className="balance">$22,129.09</div>
          <div className="updated">Last Updated May 8, 2015</div>
        </div>
      </div>
    )
  }

});

module.exports = BankingToolbar;